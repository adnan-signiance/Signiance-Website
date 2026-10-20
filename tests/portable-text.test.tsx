import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import axe from "axe-core";
import PortableText, { groupNodes, safeHref, safeVideoUrl, slugifyHeading } from "@/components/PortableText";
import type { PortableBlock, PortableNode } from "@/lib/content/posts";

let n = 0;
const span = (text: string, marks: string[] = []) => ({ _type: "span" as const, _key: `s${n++}`, text, marks });
const block = (
  text: string | ReturnType<typeof span>[],
  extra: Partial<PortableBlock> = {}
): PortableBlock => ({
  _type: "block",
  _key: `b${n++}`,
  style: "normal",
  markDefs: [],
  children: typeof text === "string" ? [span(text)] : text,
  ...extra,
});
const li = (text: string, level = 1, type: "bullet" | "number" = "bullet") => block(text, { listItem: type, level });

function html(nodes: PortableNode[]) {
  const { container } = render(<PortableText value={nodes} />);
  return container;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("safeHref", () => {
  it("allows web, mail, phone, in-site and in-page links", () => {
    for (const ok of ["https://example.com/a?b=1", "http://example.com", "mailto:hi@signiance.com", "tel:+15551234", "/case-studies", "#section"]) {
      expect(safeHref(ok)).toBe(ok);
    }
  });

  it("refuses anything that could run script or leave the site by stealth", () => {
    for (const bad of ["javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,<b>x", "vbscript:x", "//evil.example.com", "ftp://x", "", "  "]) {
      expect(safeHref(bad)).toBeNull();
    }
    expect(safeHref(undefined)).toBeNull();
  });
});

describe("safeVideoUrl", () => {
  it("accepts YouTube over https only", () => {
    expect(safeVideoUrl("https://www.youtube.com/watch?v=abc123")).toBe("https://www.youtube.com/watch?v=abc123");
    expect(safeVideoUrl("https://youtu.be/abc123")).toBe("https://youtu.be/abc123");
    expect(safeVideoUrl("http://www.youtube.com/watch?v=abc")).toBeNull();
    expect(safeVideoUrl("https://youtube.com.evil.example/watch?v=abc")).toBeNull();
    expect(safeVideoUrl("javascript:alert(1)")).toBeNull();
    expect(safeVideoUrl(undefined)).toBeNull();
  });
});

describe("slugifyHeading", () => {
  it("makes a readable, URL-safe anchor", () => {
    expect(slugifyHeading("Why IaC Tool Selection Matters")).toBe("why-iac-tool-selection-matters");
    expect(slugifyHeading("  What's new? (2026)  ")).toBe("whats-new-2026");
  });
});

describe("groupNodes", () => {
  it("folds flat list blocks into nested lists", () => {
    const groups = groupNodes([li("a"), li("a1", 2), li("a2", 2), li("b"), block("after")]);
    expect(groups).toHaveLength(2);

    const list = (groups[0] as { kind: "list"; list: { items: { children: unknown[] }[] } }).list;
    expect(list.items).toHaveLength(2);
    expect(list.items[0].children).toHaveLength(1);
    expect((list.items[0].children[0] as { items: unknown[] }).items).toHaveLength(2);
    expect(groups[1].kind).toBe("node");
  });

  it("starts a new list after other content, and when the list type changes", () => {
    const groups = groupNodes([li("a"), block("break"), li("b"), li("c", 1, "number")]);
    expect(groups.map((g) => g.kind)).toEqual(["list", "node", "list", "list"]);
  });

  it("copes with a list that starts deeper than level one", () => {
    expect(() => groupNodes([li("deep", 3)])).not.toThrow();
  });
});

describe("PortableText", () => {
  it("renders paragraphs and the decorators", () => {
    const c = html([block([span("A "), span("bold", ["strong"]), span(" and "), span("em", ["em"]), span(" and "), span("code", ["code"])])]);
    expect(c.querySelector("p")?.innerHTML).toBe("A <strong>bold</strong> and <em>em</em> and <code>code</code>");
  });

  it("turns line breaks inside a span into <br>", () => {
    const c = html([block("one\ntwo")]);
    expect(c.querySelector("p")?.innerHTML).toBe("one<br>two");
  });

  it("skips empty paragraphs", () => {
    expect(html([block("   "), block("real")]).querySelectorAll("p")).toHaveLength(1);
  });

  it("demotes a body h1 to h2, since the page title is the only h1", () => {
    const c = html([block("Title", { style: "h1" }), block("Sub", { style: "h3" }), block("Small", { style: "h4" })]);
    expect(c.querySelectorAll("h1")).toHaveLength(0);
    expect(c.querySelector("h2")?.textContent).toBe("Title");
    expect(c.querySelector("h3")?.textContent).toBe("Sub");
    expect(c.querySelector("h4")?.textContent).toBe("Small");
  });

  it("gives headings unique anchor ids", () => {
    const c = html([block("Overview", { style: "h2" }), block("Overview", { style: "h2" }), block("Overview", { style: "h3" })]);
    expect([...c.querySelectorAll("h2, h3")].map((h) => h.id)).toEqual(["overview", "overview-2", "overview-3"]);
  });

  it("renders links, opening external ones safely, and drops unsafe ones to plain text", () => {
    const c = html([
      block(
        [span("site", ["l1"]), span(" "), span("out", ["l2"]), span(" "), span("evil", ["l3"])],
        {
          markDefs: [
            { _key: "l1", _type: "link", href: "/case-studies" },
            { _key: "l2", _type: "link", href: "https://example.com" },
            { _key: "l3", _type: "link", href: "javascript:alert(1)" },
          ],
        }
      ),
    ]);
    const links = c.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toBe("/case-studies");
    expect(links[0].getAttribute("target")).toBeNull();
    expect(links[1].getAttribute("target")).toBe("_blank");
    expect(links[1].getAttribute("rel")).toBe("noopener noreferrer");
    expect(c.innerHTML).not.toContain("javascript:");
    expect(c.querySelector("p")?.textContent).toBe("site out evil");
  });

  it("renders nested lists as nested lists", () => {
    const c = html([li("a"), li("a1", 2), li("b"), li("one", 1, "number")]);
    expect(c.querySelectorAll("ul")).toHaveLength(2);
    expect(c.querySelector("ul > li > ul > li")?.textContent).toBe("a1");
    expect(c.querySelectorAll("ol > li")).toHaveLength(1);
  });

  it("renders a table with its first row as the header", () => {
    const c = html([
      {
        _type: "table",
        _key: "t",
        rows: [
          { cells: ["Aspect", "Terraform"] },
          { cells: ["State", "Remote"] },
          { cells: ["Language", "HCL"] },
        ],
      },
    ]);
    expect([...c.querySelectorAll("thead th")].map((t) => t.textContent)).toEqual(["Aspect", "Terraform"]);
    expect(c.querySelectorAll("tbody tr")).toHaveLength(2);
    expect(c.querySelector("th")?.getAttribute("scope")).toBe("col");
  });

  it("labels each table distinctly when there are several, and makes it scrollable by keyboard", () => {
    const table = (key: string): PortableNode => ({ _type: "table", _key: key, rows: [{ cells: ["A"] }, { cells: ["1"] }] });
    const c = html([table("t1"), block("between"), table("t2")]);
    const regions = [...c.querySelectorAll(".prose-table")];
    expect(regions.map((r) => r.getAttribute("aria-label"))).toEqual(["Table 1", "Table 2"]);
    expect(regions.every((r) => r.getAttribute("tabindex") === "0")).toBe(true);

    expect(html([table("only")]).querySelector(".prose-table")?.getAttribute("aria-label")).toBe("Table");
  });

  it("renders a code block with its filename, focusable so long lines can be scrolled", () => {
    const c = html([{ _type: "code", _key: "c", code: "aws sso login", filename: "login.sh", language: "bash" }]);
    expect(c.querySelector("figcaption")?.textContent).toBe("login.sh");
    expect(c.querySelector("pre")?.getAttribute("tabindex")).toBe("0");
    expect(c.querySelector("pre code")?.textContent).toBe("aws sso login");
  });

  it("renders an image with its dimensions, alt text and caption", () => {
    const c = html([
      { _type: "image", _key: "i", src: "https://cdn.sanity.io/images/p/production/x-800x400.webp", width: 800, height: 400, alt: "A diagram", caption: "Figure 1" },
    ]);
    const img = c.querySelector("img");
    expect(img?.getAttribute("alt")).toBe("A diagram");
    expect(img?.getAttribute("width")).toBe("800");
    expect(img?.getAttribute("height")).toBe("400");
    expect(c.querySelector("figcaption")?.textContent).toBe("Figure 1");
  });

  it("renders a video as a link to YouTube rather than loading an embed", () => {
    const c = html([{ _type: "youtube", _key: "v", url: "https://www.youtube.com/watch?v=abc123" }]);
    expect(c.querySelector("iframe")).toBeNull();
    const link = c.querySelector(".prose-video a");
    expect(link?.getAttribute("href")).toBe("https://www.youtube.com/watch?v=abc123");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("does not render a video address that is not YouTube", () => {
    expect(html([{ _type: "youtube", _key: "v", url: "https://evil.example/watch" }]).querySelector(".prose-video")).toBeNull();
  });

  it("says so in the build log when it meets a block it cannot render, once per type", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const unknown = { _type: "someNewBlock", _key: "x" };
    const c = html([unknown, unknown, block("still here")]);
    expect(c.querySelector("p")?.textContent).toBe("still here");
    expect(warn.mock.calls.filter(([m]) => String(m).includes("someNewBlock"))).toHaveLength(1);
  });

  it("produces markup with no accessibility violations", async () => {
    const c = html([
      block("Intro", { style: "h2" }),
      block("Some text with a link", {
        children: [span("Some text with a "), span("link", ["l"])],
        markDefs: [{ _key: "l", _type: "link", href: "https://example.com" }],
      }),
      li("one"),
      li("two"),
      { _type: "table", _key: "t", rows: [{ cells: ["A", "B"] }, { cells: ["1", "2"] }] },
      { _type: "code", _key: "c", code: "echo hi" },
      { _type: "image", _key: "i", src: "https://cdn.sanity.io/images/p/production/x-100x100.webp", width: 100, height: 100, alt: "Alt text" },
      { _type: "youtube", _key: "v", url: "https://youtu.be/abc123" },
    ]);
    const results = await axe.run(c, { rules: { "color-contrast": { enabled: false }, "target-size": { enabled: false } } });
    expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
  });
});
