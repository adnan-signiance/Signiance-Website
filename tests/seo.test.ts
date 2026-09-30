import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { services, caseStudyEntries, faqs } from "@/lib/data";

const OUT = join(process.cwd(), ".next", "server", "app");
const buildExists = existsSync(OUT);

function html(file: string): string {
  return readFileSync(join(OUT, file), "utf8");
}

function jsonLd(markup: string): Record<string, unknown>[] {
  const blocks = [...markup.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  return blocks.flatMap((b) => {
    const parsed = JSON.parse(b[1]);
    return (parsed["@graph"] ?? [parsed]) as Record<string, unknown>[];
  });
}

function types(markup: string): string[] {
  return jsonLd(markup).map((n) => String(n["@type"]));
}

const staticPages = [
  "index",
  "about",
  "services",
  "case-studies",
  "privacy",
  "terms",
  "security",
  "blog",
  "careers",
];

describe.skipIf(!buildExists)("structured data", () => {
  it("emits valid JSON-LD wherever it is present", () => {
    for (const page of staticPages) {
      expect(() => jsonLd(html(`${page}.html`)), `${page} has malformed JSON-LD`).not.toThrow();
    }
  });

  it("describes the organisation and the FAQ on the home page", () => {
    const t = types(html("index.html"));
    expect(t).toContain("Organization");
    expect(t).toContain("WebSite");
    expect(t).toContain("FAQPage");
  });

  it("includes every FAQ entry in the FAQPage schema", () => {
    const faqNode = jsonLd(html("index.html")).find((n) => n["@type"] === "FAQPage") as
      | { mainEntity: unknown[] }
      | undefined;
    expect(faqNode).toBeTruthy();
    expect(faqNode!.mainEntity).toHaveLength(faqs.length);
  });

  it("lists services and case studies on their index pages", () => {
    expect(types(html("services.html"))).toContain("ItemList");
    expect(types(html("case-studies.html"))).toContain("ItemList");
  });

  it("marks up every service detail page as a Service with breadcrumbs", () => {
    for (const s of services) {
      const t = types(html(join("services", `${s.slug}.html`)));
      expect(t, `${s.slug} schema`).toContain("Service");
      expect(t, `${s.slug} breadcrumbs`).toContain("BreadcrumbList");
    }
  });

  it("marks up every case study as an Article with breadcrumbs", () => {
    for (const c of caseStudyEntries) {
      const t = types(html(join("case-studies", `${c.slug}.html`)));
      expect(t, `${c.slug} schema`).toContain("Article");
      expect(t, `${c.slug} breadcrumbs`).toContain("BreadcrumbList");
    }
  });

  it("points every Service at the same Organization node by id", () => {
    const nodes = jsonLd(html(join("services", `${services[0].slug}.html`)));
    const org = nodes.find((n) => n["@type"] === "Organization") as { "@id": string };
    const service = nodes.find((n) => n["@type"] === "Service") as { provider: { "@id": string } };
    expect(service.provider["@id"]).toBe(org["@id"]);
  });
});

describe.skipIf(!buildExists)("canonical URLs", () => {
  it.each(staticPages)("%s declares a canonical URL", (page) => {
    expect(html(`${page}.html`)).toMatch(/rel="canonical"/);
  });

  it("gives each service page its own canonical", () => {
    for (const s of services) {
      const markup = html(join("services", `${s.slug}.html`));
      expect(markup).toContain(`/services/${s.slug}`);
      expect(markup).toMatch(/rel="canonical"/);
    }
  });
});

describe.skipIf(!buildExists)("titles", () => {
  it("appends the brand exactly once", () => {
    for (const page of staticPages) {
      const title = html(`${page}.html`).match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "";
      const occurrences = (title.match(/Signiance/g) ?? []).length;
      expect(occurrences, `"${title}" repeats the brand`).toBe(1);
    }
  });

  it("gives the 404 page its own title", () => {
    const title = html("_not-found.html").match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "";
    expect(title).toMatch(/not found/i);
    expect((title.match(/Signiance/g) ?? []).length).toBe(1);
  });
});

describe.skipIf(!buildExists)("social cards", () => {
  it("gives each case study its own OpenGraph image rather than the site default", () => {
    for (const c of caseStudyEntries) {
      const markup = html(join("case-studies", `${c.slug}.html`));
      const ogImage = markup.match(/property="og:image" content="([^"]+)"/)?.[1] ?? "";
      expect(ogImage, `${c.slug} should not fall back to the generic card`).not.toMatch(
        /og-image\.png/
      );
    }
  });

  it("gives each service page its own OpenGraph title", () => {
    for (const s of services) {
      const markup = html(join("services", `${s.slug}.html`));
      const ogTitle = (markup.match(/property="og:title" content="([^"]+)"/)?.[1] ?? "")
        // Attribute values are entity-escaped, e.g. "Cloud Architecture &amp; DevOps".
        .replace(/&amp;/g, "&")
        .replace(/&#x27;/g, "'");
      expect(ogTitle, `${s.slug} og:title`).toContain(s.title);
    }
  });
});

describe.skipIf(!buildExists)("indexing directives", () => {
  it("keeps the placeholder pages out of the index", () => {
    for (const page of ["blog", "careers"]) {
      expect(html(`${page}.html`), `${page} should be noindex`).toMatch(
        /name="robots" content="[^"]*noindex/
      );
    }
  });

  it("leaves the real pages indexable", () => {
    for (const page of ["index", "about", "services", "case-studies"]) {
      const robots = html(`${page}.html`).match(/name="robots" content="([^"]*)"/)?.[1] ?? "";
      expect(robots, `${page} must not be noindex`).not.toMatch(/noindex/);
    }
  });
});
