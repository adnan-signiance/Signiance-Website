import { describe, expect, it } from "vitest";
import {
  buildPostDocuments,
  decodeText,
  htmlToPortable,
  plainExcerpt,
  youtubeId,
} from "../studio/scripts/wpToPortable.mjs";

type Node = Record<string, any>;
const convert = (html: string, opts?: { rewriteHref?: (h: string) => string }) => htmlToPortable(html, opts);
const text = (b: Node) => b.children.map((c: Node) => c.text).join("");

describe("htmlToPortable: text", () => {
  it("keeps bold, italic and links as marks on spans", () => {
    const { body } = convert('<p>One <strong>two</strong> <em>three</em> <a href="https://example.com/x">four</a>.</p>');
    const block = body[0] as Node;
    expect(block.style).toBe("normal");
    expect(text(block)).toBe("One two three four.");
    const bold = block.children.find((c: Node) => c.text === "two");
    expect(bold.marks).toEqual(["strong"]);
    const link = block.children.find((c: Node) => c.text === "four");
    expect(block.markDefs).toEqual([{ _key: link.marks[0], _type: "link", href: "https://example.com/x" }]);
  });

  it("collapses the whitespace HTML ignores, and turns <br> into a line break", () => {
    const { body } = convert("<p>  a \n   b<br>c  </p>");
    expect(text(body[0] as Node)).toBe("a b\nc");
  });

  it("decodes entities", () => {
    expect(text(convert("<p>Fish &amp; chips &#8211; &lt;ok&gt;</p>").body[0] as Node)).toBe("Fish & chips – <ok>");
  });

  it("drops empty paragraphs, and scripts with a note that it did", () => {
    const { body, warnings } = convert("<p> </p><script>alert(1)</script><p>kept</p>");
    expect(body).toHaveLength(1);
    expect(text(body[0] as Node)).toBe("kept");
    expect(warnings).toEqual(["skipped <script>"]);
  });

  it("only keeps the link definitions a span actually uses", () => {
    const { body } = convert('<p>plain <a href="">empty href</a></p>');
    expect((body[0] as Node).markDefs).toEqual([]);
  });
});

describe("htmlToPortable: structure", () => {
  it("maps headings, demoting h1 and merging h5/h6, and drops the bold WordPress wraps them in", () => {
    const { body } = convert("<h1><strong>A</strong></h1><h2>B</h2><h3>C</h3><h5>D</h5>");
    expect(body.map((b: Node) => b.style)).toEqual(["h2", "h2", "h3", "h4"]);
    expect((body[0] as Node).children[0].marks).toEqual([]);
  });

  it("turns nested lists into flat list blocks with a level", () => {
    const { body } = convert("<ul><li>a<ul><li>a1</li><li>a2</li></ul></li><li>b</li></ul><ol><li>one</li></ol>");
    expect(body.map((b: Node) => [text(b), b.listItem, b.level])).toEqual([
      ["a", "bullet", 1],
      ["a1", "bullet", 2],
      ["a2", "bullet", 2],
      ["b", "bullet", 1],
      ["one", "number", 1],
    ]);
  });

  it("reads text inside list-item paragraphs", () => {
    const { body } = convert("<ul><li><p>wrapped</p></li></ul>");
    expect(text(body[0] as Node)).toBe("wrapped");
    expect((body[0] as Node).listItem).toBe("bullet");
  });

  it("maps a blockquote", () => {
    expect((convert("<blockquote><p>Quote</p></blockquote>").body[0] as Node).style).toBe("blockquote");
  });

  it("maps a table, bare or inside a figure, dropping empty rows", () => {
    const html =
      '<figure class="wp-block-table"><table><thead><tr><th>Aspect</th><th>Tool</th></tr></thead>' +
      "<tbody><tr><td>State</td><td><strong>Remote</strong> backend</td></tr><tr><td></td><td> </td></tr></tbody></table></figure>";
    const [table] = convert(html).body as Node[];
    expect(table._type).toBe("table");
    expect(table.rows.map((r: Node) => r.cells)).toEqual([["Aspect", "Tool"], ["State", "Remote backend"]]);
    expect(convert("<table><tr><td>x</td></tr></table>").body[0]._type).toBe("table");
  });

  it("keeps the line breaks of a WordPress code block, which are <br> tags rather than newlines", () => {
    const [code] = convert("<pre class=\"wp-block-preformatted\">&lt;html&gt;<br>    &lt;body&gt;<br>&lt;/html&gt;</pre>").body as Node[];
    expect(code.code).toBe("<html>\n    <body>\n</html>");
  });

  it("maps a code block and finds its language", () => {
    const [code] = convert('<pre><code class="language-bash">aws sso login\n</code></pre>').body as Node[];
    expect(code).toMatchObject({ _type: "code", code: "aws sso login", language: "bash" });
  });
});

describe("htmlToPortable: images and video", () => {
  it("takes the largest image in srcset, with its alt text and caption", () => {
    const html =
      '<figure><img src="https://x.test/a-300x158.webp" alt=" A chart " ' +
      'srcset="https://x.test/a-300x158.webp 300w, https://x.test/a.webp 1730w, https://x.test/a-768x404.webp 768w">' +
      "<figcaption>Figure 1</figcaption></figure>";
    const [image] = convert(html).body as Node[];
    expect(image).toMatchObject({ _type: "image", _sanityAsset: "image@https://x.test/a.webp", alt: "A chart", caption: "Figure 1" });
  });

  it("ignores inline data images", () => {
    expect(convert('<img src="data:image/gif;base64,AAAA">').body).toHaveLength(0);
  });

  it("keeps a YouTube embed as a video, and skips other iframes with a note", () => {
    const html =
      '<figure class="wp-block-embed"><iframe src="https://www.youtube.com/embed/abc_123-x?feature=oembed"></iframe></figure>' +
      '<iframe src="https://maps.example.com/embed"></iframe>';
    const { body, warnings } = convert(html);
    expect(body).toEqual([{ _type: "youtube", _key: expect.any(String), url: "https://www.youtube.com/watch?v=abc_123-x" }]);
    expect(warnings).toEqual(["skipped <iframe> (not YouTube)"]);
  });

  it("recognises the YouTube address forms", () => {
    expect(youtubeId("https://www.youtube.com/embed/abc123")).toBe("abc123");
    expect(youtubeId("https://www.youtube-nocookie.com/embed/abc123")).toBe("abc123");
    expect(youtubeId("https://youtu.be/abc123")).toBe("abc123");
    expect(youtubeId("https://www.youtube.com/watch?v=abc123&t=5")).toBe("abc123");
    expect(youtubeId("https://vimeo.com/123")).toBeNull();
    expect(youtubeId("not a url")).toBeNull();
  });
});

describe("htmlToPortable: links", () => {
  it("lets the caller rewrite an address, and drops a link it rewrites to nothing", () => {
    const { body } = convert('<p><a href="https://old.test/post/">kept</a> <a href="javascript:x">gone</a></p>', {
      rewriteHref: (h) => (h.startsWith("javascript:") ? "" : h.replace("https://old.test/post/", "/blog/post")),
    });
    const block = body[0] as Node;
    expect(block.markDefs).toEqual([expect.objectContaining({ href: "/blog/post" })]);
    expect(text(block)).toBe("kept gone");
  });
});

describe("text helpers", () => {
  it("decodes entities and strips tags", () => {
    expect(decodeText("AWS Inferentia &#8211; <em>Are</em> They Worth It?")).toBe("AWS Inferentia – Are They Worth It?");
  });

  it("tidies a WordPress excerpt and trims long ones at a word", () => {
    expect(plainExcerpt("<p>Short and sweet. [&hellip;]</p>")).toBe("Short and sweet.");
    expect(plainExcerpt("<p>Nice read. Read more</p>")).toBe("Nice read.");
    const long = plainExcerpt(`<p>${"word ".repeat(100)}</p>`, 60);
    expect(long.length).toBeLessThanOrEqual(61);
    expect(long.endsWith("…")).toBe(true);
    expect(long).not.toMatch(/wor…$/);
  });
});

describe("buildPostDocuments", () => {
  const wp = (overrides: Record<string, unknown> = {}) => ({
    slug: "terraform-vs-cloudformation",
    date_gmt: "2026-09-15T12:00:00",
    title: { rendered: "Terraform vs CloudFormation &#8211; which?" },
    excerpt: { rendered: "" },
    content: {
      rendered:
        '<figure><img src="https://x.test/up/Banner-Signiance-1-1-1024x538.webp" alt="b"></figure>' +
        "<h2><strong>A practical comparison of the tools</strong></h2>" +
        "<p>Infrastructure as Code is now a standard part of managing AWS environments, and choosing the right tool is hard.</p>",
    },
    _embedded: {
      author: [{ name: "Dana Reyes" }],
      "wp:featuredmedia": [{ source_url: "https://x.test/up/Banner-Signiance-1.webp", alt_text: "Cover alt" }],
      "wp:term": [[
        { taxonomy: "category", slug: "aws", name: "AWS" },
        { taxonomy: "category", slug: "uncategorized", name: "Uncategorized" },
        { taxonomy: "post_tag", slug: "iac", name: "IaC" },
      ]],
    },
    ...overrides,
  });

  const post = (w: ReturnType<typeof wp>) => buildPostDocuments(w).docs.find((d: Node) => d._type === "post") as Node;

  it("builds the post and its author, with stable ids, the old slug and the UTC date", () => {
    const { docs } = buildPostDocuments(wp());
    const p = docs.find((d: Node) => d._type === "post") as Node;
    const a = docs.find((d: Node) => d._type === "author") as Node;
    expect(p._id).toBe("post-terraform-vs-cloudformation");
    expect(p.slug.current).toBe("terraform-vs-cloudformation");
    expect(p.title).toBe("Terraform vs CloudFormation – which?");
    expect(p.publishedAt).toBe("2026-09-15T12:00:00Z");
    expect(p.author).toEqual({ _type: "reference", _ref: a._id });
    expect(a).toMatchObject({ _type: "author", name: "Dana Reyes" });
  });

  it("keeps topics from categories only, without Uncategorized", () => {
    expect(post(wp()).categories).toEqual(["AWS"]);
  });

  it("uses the featured image as the cover and drops a body image that repeats it", () => {
    const p = post(wp());
    expect(p.coverImage).toEqual({ _type: "image", _sanityAsset: "image@https://x.test/up/Banner-Signiance-1.webp", alt: "Cover alt" });
    expect(p.body.some((b: Node) => b._type === "image")).toBe(false);
  });

  it("keeps a body image that is a different picture", () => {
    const html = '<figure><img src="https://x.test/up/Other-diagram.webp" alt="d"></figure><p>Some text that is long enough to be a paragraph for sure.</p>';
    expect(post(wp({ content: { rendered: html } })).body.some((b: Node) => b._type === "image")).toBe(true);
  });

  it("promotes an opening body image to the cover when there is no featured image", () => {
    const p = post(wp({ _embedded: { author: [{ name: "Dana Reyes" }] } }));
    expect(p.coverImage?._sanityAsset).toBe("image@https://x.test/up/Banner-Signiance-1-1-1024x538.webp");
    expect(p.body.some((b: Node) => b._type === "image")).toBe(false);
  });

  it("replaces WordPress's automatic excerpt, which is just the start of the post, with the first paragraph", () => {
    const auto = wp({ excerpt: { rendered: "<p>A practical comparison of the tools Infrastructure as Code is now a standard part of managing AWS environments [&hellip;]</p>" } });
    expect(post(auto).excerpt).toMatch(/^Infrastructure as Code is now a standard part/);
  });

  it("keeps an excerpt a person wrote", () => {
    const manual = wp({ excerpt: { rendered: "<p>Our own summary, written by hand.</p>" } });
    expect(post(manual).excerpt).toBe("Our own summary, written by hand.");
  });

  it("omits the author reference when WordPress names none", () => {
    const p = post(wp({ _embedded: {} }));
    expect(p.author).toBeUndefined();
  });
});
