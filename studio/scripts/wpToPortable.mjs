/**
 * WordPress to Sanity: turns a WordPress REST API post into Sanity documents, and
 * its HTML body into Portable Text.
 *
 * Written against the markup this site's blog actually uses (Gutenberg: headings,
 * paragraphs, lists, tables, figures, the odd quote or code block) rather than as a
 * general HTML converter. Anything it does not understand is skipped and reported
 * in `warnings`, never silently turned into something else.
 *
 * Pure: no network, no filesystem. `import-wordpress.mjs` does the I/O.
 */
import { JSDOM } from "jsdom";

const DECORATORS = {
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  code: "code",
  u: "underline",
  s: "strike-through",
  del: "strike-through",
  strike: "strike-through",
};

// Elements that live inside a line of text. Everything else starts a new block.
const INLINE = new Set([...Object.keys(DECORATORS), "a", "span", "br", "small", "sub", "sup", "mark", "abbr", "time", "font", "label"]);

const SKIPPED = new Set(["script", "style", "noscript", "video", "audio", "form", "svg", "object", "embed", "button"]);

/** The video ID in a YouTube embed or watch address, or null if it is not YouTube. */
export function youtubeId(src) {
  try {
    const u = new URL(src, "https://example.com");
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const embed = u.pathname.match(/^\/embed\/([\w-]+)/);
      return embed ? embed[1] : u.searchParams.get("v");
    }
  } catch {
    // not a URL
  }
  return null;
}

// One window for all entity decoding. A jsdom window is heavy and is only freed when
// closed, so making one per call ran a 266-post import out of memory.
let decoder = null;

/** Decodes HTML entities (WordPress sends "&#8211;" in titles) and strips any tags. */
export function decodeText(html) {
  decoder ??= new JSDOM("").window.document.createElement("div");
  decoder.innerHTML = html ?? "";
  return (decoder.textContent ?? "").replace(/\s+/g, " ").trim();
}

/** WordPress excerpts are an HTML paragraph, often ending "[…]" or a "Read more" link. */
export function plainExcerpt(html, max = 300) {
  const text = decodeText(html)
    .replace(/\s*\[(?:…|\.\.\.|&hellip;)\]\s*$/u, "")
    .replace(/\s*(?:Read more|Continue reading)\W*$/i, "")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 40)).replace(/[\s.,;:]+$/, "")}…`;
}

function largestFromSrcset(srcset) {
  let best = null;
  for (const part of (srcset ?? "").split(",")) {
    const [url, size] = part.trim().split(/\s+/);
    const width = parseInt(size ?? "0", 10);
    if (url && (!best || width > best.width)) best = { url, width };
  }
  return best?.url ?? null;
}

export function htmlToPortable(html, { rewriteHref = (h) => h } = {}) {
  const dom = new JSDOM(`<body>${html ?? ""}</body>`);
  const doc = dom.window.document;
  const out = [];
  const warnings = new Set();
  let n = 0;
  const key = () => `k${(n++).toString(36)}`;

  // -- inline text -----------------------------------------------------------

  /** Collects spans and link definitions for a run of inline nodes. */
  function inlineRun(nodes) {
    const spans = [];
    const markDefs = [];

    const visit = (node, marks) => {
      if (node.nodeType === 3) {
        spans.push({ text: (node.nodeValue ?? "").replace(/\s+/g, " "), marks });
        return;
      }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      if (SKIPPED.has(tag)) return;
      if (tag === "br") {
        spans.push({ text: "\n", marks });
        return;
      }
      if (tag === "a") {
        const href = rewriteHref(node.getAttribute("href") ?? "");
        if (href) {
          const def = { _key: key(), _type: "link", href };
          markDefs.push(def);
          for (const c of node.childNodes) visit(c, [...marks, def._key]);
          return;
        }
      }
      const next = DECORATORS[tag] && !marks.includes(DECORATORS[tag]) ? [...marks, DECORATORS[tag]] : marks;
      for (const c of node.childNodes) visit(c, next);
    };
    nodes.forEach((node) => visit(node, []));

    // Merge neighbours with the same marks, then tidy the edges of each line.
    const merged = [];
    for (const span of spans) {
      const last = merged[merged.length - 1];
      if (last && last.marks.join("|") === span.marks.join("|")) last.text += span.text;
      else merged.push({ ...span });
    }
    for (const span of merged) span.text = span.text.replace(/ *\n */g, "\n");
    if (merged.length) {
      merged[0].text = merged[0].text.replace(/^[ \n]+/, "");
      merged[merged.length - 1].text = merged[merged.length - 1].text.replace(/[ \n]+$/, "");
    }
    const children = merged
      .filter((s) => s.text !== "")
      .map((s) => ({ _type: "span", _key: key(), text: s.text, marks: s.marks }));
    const usedKeys = new Set(children.flatMap((c) => c.marks));
    return { children, markDefs: markDefs.filter((d) => usedKeys.has(d._key)) };
  }

  function emitText(nodes, style, list) {
    const { children, markDefs } = inlineRun(nodes);
    if (children.every((c) => c.text.trim() === "")) return;
    // WordPress headings are usually wrapped in <strong>, which a heading already is.
    if (/^h\d$/.test(style)) for (const c of children) c.marks = c.marks.filter((m) => m !== "strong");
    const block = { _type: "block", _key: key(), style, markDefs, children };
    if (list) {
      block.listItem = list.type;
      block.level = list.level;
    }
    out.push(block);
  }

  // -- block structure -------------------------------------------------------

  function emitImage(img, caption) {
    const url = largestFromSrcset(img.getAttribute("srcset")) ?? img.getAttribute("src");
    if (!url || url.startsWith("data:")) return;
    out.push({
      _type: "image",
      _key: key(),
      _sanityAsset: `image@${url}`,
      alt: (img.getAttribute("alt") ?? "").trim(),
      ...(caption ? { caption } : {}),
    });
  }

  function emitTable(table) {
    const rows = [...table.querySelectorAll("tr")]
      .map((tr) => ({
        _type: "tableRow",
        _key: key(),
        cells: [...tr.children]
          .filter((c) => /^(td|th)$/i.test(c.tagName))
          .map((c) => (c.textContent ?? "").replace(/\s+/g, " ").trim()),
      }))
      .filter((row) => row.cells.some((c) => c !== ""));
    if (rows.length) out.push({ _type: "table", _key: key(), rows });
  }

  function emitCode(pre) {
    const code = pre.querySelector("code");
    const language = (code?.className.match(/language-([\w+-]+)/)?.[1] ?? null);
    // WordPress writes a code block's line breaks as <br>, not newlines.
    for (const br of pre.querySelectorAll("br")) br.replaceWith("\n");
    const text = (pre.textContent ?? "").replace(/\n+$/, "");
    if (text.trim()) out.push({ _type: "code", _key: key(), code: text, ...(language ? { language } : {}) });
  }

  function walk(parent, style, list) {
    let run = [];
    const flush = () => {
      if (run.length) emitText(run, style, list);
      run = [];
    };

    for (const node of parent.childNodes) {
      if (node.nodeType === 3) {
        run.push(node);
        continue;
      }
      if (node.nodeType !== 1) continue;

      const tag = node.tagName.toLowerCase();
      if (SKIPPED.has(tag)) {
        flush();
        warnings.add(`skipped <${tag}>`);
        continue;
      }
      if (INLINE.has(tag)) {
        run.push(node);
        continue;
      }

      flush();
      switch (tag) {
        case "h1":
        case "h2":
          walk(node, "h2", null);
          break;
        case "h3":
          walk(node, "h3", null);
          break;
        case "h4":
        case "h5":
        case "h6":
          walk(node, "h4", null);
          break;
        case "blockquote":
          walk(node, "blockquote", null);
          break;
        case "ul":
        case "ol": {
          const type = tag === "ol" ? "number" : "bullet";
          const level = (list?.level ?? 0) + 1;
          for (const li of node.children) {
            if (li.tagName.toLowerCase() === "li") walk(li, "normal", { type, level });
          }
          break;
        }
        case "table":
          emitTable(node);
          break;
        case "pre":
          emitCode(node);
          break;
        case "img":
          emitImage(node, "");
          break;
        case "figure": {
          const table = node.querySelector("table");
          const img = node.querySelector("img");
          if (table) emitTable(table);
          else if (node.querySelector("iframe")) walk(node, style, list);
          else if (img) emitImage(img, (node.querySelector("figcaption")?.textContent ?? "").trim());
          else walk(node, style, list);
          break;
        }
        case "iframe": {
          const id = youtubeId(node.getAttribute("src") ?? "");
          if (id) out.push({ _type: "youtube", _key: key(), url: `https://www.youtube.com/watch?v=${id}` });
          else warnings.add("skipped <iframe> (not YouTube)");
          break;
        }
        case "hr":
          break;
        default:
          // p, div, section, li wrappers and so on: their content is what matters.
          walk(node, style, list);
      }
    }
    flush();
  }

  walk(doc.body, "normal", null);
  dom.window.close();
  return { body: out, warnings: [...warnings] };
}

/** "…-Signiance-1-1-1024x538.webp" and "…-Signiance-1.webp" are the same picture. */
function imageBase(url) {
  const file = url.split("?")[0].split("/").pop().replace(/\.[a-z0-9]+$/i, "").toLowerCase();
  return file.replace(/-\d+x\d+$/, "").replace(/(-\d+)+$/, "");
}

const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
const textOf = (b) => b.children.map((c) => c.text).join("");

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const postId = (slug) => `post-${slug}`.slice(0, 120);
export const authorId = (name) => `author-${slugify(name) || "unknown"}`.slice(0, 120);

/**
 * One WordPress post (REST API, fetched with _embed) to its Sanity documents:
 * the post, and its author when it has one. Images are written as `_sanityAsset`
 * URLs, which `sanity dataset import` downloads and uploads itself.
 */
export function buildPostDocuments(wp, { rewriteHref } = {}) {
  const { body, warnings } = htmlToPortable(wp.content?.rendered ?? "", { rewriteHref });

  const terms = (wp._embedded?.["wp:term"] ?? []).flat();
  const categories = terms
    .filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized")
    .map((t) => decodeText(t.name));

  const authorName = decodeText(wp._embedded?.author?.[0]?.name ?? "");
  const media = wp._embedded?.["wp:featuredmedia"]?.[0];

  // The cover. Posts here usually open the body with the same banner that is also
  // the featured image, so showing both would repeat it: the body copy is dropped.
  // With no featured image at all, an opening body image becomes the cover.
  let cover = media?.source_url ? { url: media.source_url, alt: (media.alt_text ?? "").trim() } : null;
  const first = body[0];
  if (first?._type === "image") {
    const url = first._sanityAsset.replace(/^image@/, "");
    if (!cover) {
      cover = { url, alt: first.alt ?? "" };
      body.shift();
    } else if (imageBase(url) === imageBase(cover.url)) {
      body.shift();
    }
  }

  // WordPress fills an empty excerpt with the start of the post (heading and all),
  // which makes a poor summary. When the excerpt is just the opening of the body,
  // use the first real paragraph instead; a hand-written excerpt is kept as it is.
  const prose = body.filter((b) => b._type === "block");
  const wpExcerpt = plainExcerpt(wp.excerpt?.rendered ?? "");
  const opening = squash(prose.map(textOf).join(" "));
  const automatic = wpExcerpt === "" || opening.startsWith(squash(wpExcerpt).slice(0, 60));
  const paragraph = prose.filter((b) => !b.listItem && b.style === "normal").map(textOf).find((t) => t.length >= 80);
  const excerpt = automatic ? plainExcerpt(paragraph ?? "") || wpExcerpt : wpExcerpt;

  const docs = [];
  if (authorName) docs.push({ _id: authorId(authorName), _type: "author", name: authorName });

  docs.push({
    _id: postId(wp.slug),
    _type: "post",
    title: decodeText(wp.title?.rendered ?? ""),
    slug: { _type: "slug", current: wp.slug },
    publishedAt: wp.date_gmt ? `${wp.date_gmt}Z` : new Date(wp.date).toISOString(),
    excerpt,
    categories,
    ...(authorName ? { author: { _type: "reference", _ref: authorId(authorName) } } : {}),
    ...(cover ? { coverImage: { _type: "image", _sanityAsset: `image@${cover.url}`, alt: cover.alt } } : {}),
    body,
  });

  return { docs, warnings };
}
