import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { services, caseStudyEntries } from "@/lib/data";

const OUT = join(process.cwd(), ".next", "server", "app");

/**
 * Smoke tests over the prerendered HTML produced by `next build`.
 *
 * This deliberately asserts against build output rather than driving a browser:
 * it covers every static route cheaply, and it verifies what a crawler and a
 * first-time visitor actually receive before any JavaScript runs.
 *
 * Requires a prior `npm run build` — `npm run verify` runs them in that order.
 */
const buildExists = existsSync(OUT);

const routes = [
  { name: "home", file: "index.html" },
  { name: "about", file: "about.html" },
  { name: "services", file: "services.html" },
  { name: "case-studies", file: "case-studies.html" },
  { name: "how-we-work", file: "how-we-work.html" },
  { name: "blog", file: "blog.html" },
  { name: "careers", file: "careers.html" },
  { name: "privacy", file: "privacy.html" },
  { name: "terms", file: "terms.html" },
  { name: "security", file: "security.html" },
  { name: "guarantee", file: "guarantee.html" },
  { name: "404", file: "_not-found.html" },
  ...services.map((s) => ({ name: `service/${s.slug}`, file: join("services", `${s.slug}.html`) })),
  ...caseStudyEntries.map((c) => ({
    name: `case-study/${c.slug}`,
    file: join("case-studies", `${c.slug}.html`),
  })),
];

function html(file: string): string {
  return readFileSync(join(OUT, file), "utf8");
}

function countTags(markup: string, tag: string): number {
  return (markup.match(new RegExp(`<${tag}[\\s>]`, "gi")) ?? []).length;
}

describe.skipIf(!buildExists)("prerendered routes", () => {
  it("prerenders every expected route", () => {
    const missing = routes.filter((r) => !existsSync(join(OUT, r.file))).map((r) => r.name);
    expect(missing, `routes with no prerendered HTML: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(routes)("$name has exactly one h1", ({ file }) => {
    expect(countTags(html(file), "h1")).toBe(1);
  });

  it.each(routes)("$name has a non-empty title", ({ file }) => {
    const match = html(file).match(/<title[^>]*>([^<]*)<\/title>/i);
    expect(match?.[1]?.trim(), "title tag").toBeTruthy();
  });

  it.each(routes)("$name has a meta description", ({ file }) => {
    expect(html(file)).toMatch(/<meta name="description"/i);
  });

  it("renders the site header navigation on the home page", () => {
    const markup = html("index.html");
    expect(markup).toMatch(/Services/);
    expect(markup).toMatch(/About/);
  });

  it("renders the booking section anchor on the home page", () => {
    expect(html("index.html")).toMatch(/id="contact"/);
  });
});

describe.skipIf(!buildExists)("metadata quality", () => {
  it("has no duplicate titles across static pages", () => {
    const staticRoutes = routes.filter((r) => !r.name.includes("/"));
    const titles = staticRoutes.map((r) => {
      const m = html(r.file).match(/<title[^>]*>([^<]*)<\/title>/i);
      return `${r.name}::${m?.[1]?.trim() ?? ""}`;
    });
    const seen = new Map<string, string[]>();
    for (const entry of titles) {
      const [name, title] = entry.split("::");
      seen.set(title, [...(seen.get(title) ?? []), name]);
    }
    const dupes = [...seen.entries()].filter(([, names]) => names.length > 1);
    expect(dupes, `duplicate titles: ${JSON.stringify(dupes)}`).toEqual([]);
  });

  it("emits canonical OpenGraph tags on the home page", () => {
    const markup = html("index.html");
    expect(markup).toMatch(/property="og:title"/);
    expect(markup).toMatch(/property="og:image"/);
  });
});

describe.skipIf(!buildExists)("content integrity", () => {
  // The metric counters animate from zero on the client. They must still render
  // their real figures server-side, or crawlers and visitors without JavaScript
  // see "0 wks" where the proof numbers should be.
  it("renders real metric values in the prerendered HTML, not zeros", async () => {
    const { metrics } = await import("@/lib/data");
    const markup = html("index.html");
    // React escapes apostrophes to &#x27;, so labels are compared against a
    // version with entities decoded rather than the raw markup.
    const decoded = markup.replace(/&#x27;/g, "'").replace(/&amp;/g, "&");

    for (const m of metrics) {
      const digits = m.value.match(/^(\d+)/)?.[1];
      expect(digits, `metric "${m.label}" should start with digits`).toBeTruthy();
      expect(decoded, `metric "${m.label}" missing its value`).toContain(m.label);
      // With a trailing unit React splits the text node and inserts a comment
      // marker ("5<!-- --> wks"); without one the digits sit directly before the
      // closing tag ("50<").
      expect(markup, `metric "${m.label}" value ${digits} not rendered`).toMatch(
        new RegExp(`>${digits}(<!-- -->|<)`)
      );
    }
    expect(markup, "counters must not render as zero").not.toMatch(/>0<!-- --> wks/);
  });

  it("renders the hero headline as a lead line and a punchline", () => {
    const markup = html("index.html");
    const h1 = markup.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? "";
    // The headline is split into one span per word for the staggered entrance,
    // so the phrases are checked against its text content, not the raw markup.
    const text = h1
      .replace(/<[^>]+>/g, "")
      .replace(/&#x27;/g, "'")
      .replace(/&nbsp;| /g, " ")
      .replace(/\s+/g, " ");
    expect(text).toContain("Your AI pilot works.");
    expect(text).toContain("It's still a pilot.");
    // Neither line is struck through.
    expect(h1).not.toContain("line-through");
  });

  it("keeps the founder's note above the booking form", () => {
    const markup = html("index.html");
    const founder = markup.indexOf("From the founder");
    const contact = markup.search(/id=.contact./);
    expect(founder, "founder's note missing").toBeGreaterThan(0);
    expect(founder, "trust copy must sit before the ask").toBeLessThan(contact);
  });

  it("does not render the engagements block, which was removed by design", () => {
    const markup = html("index.html");
    expect(markup).not.toMatch(/id=.engage./);
  });
});

describe.skipIf(!buildExists)("rendered link integrity", () => {
  const pages = new Map<string, string>();
  for (const r of routes) {
    if (existsSync(join(OUT, r.file))) pages.set(r.name, html(r.file));
  }

  /** Element ids present on each rendered route. */
  function idsOn(markup: string): Set<string> {
    return new Set([...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  }

  const routePath = (name: string) =>
    name === "home" ? "/" : name === "404" ? "/_not-found" : `/${name}`;

  const idsByPath = new Map<string, Set<string>>();
  for (const [name, markup] of pages) idsByPath.set(routePath(name), idsOn(markup));

  function navLinks(markup: string): string[] {
    return [...markup.matchAll(/href="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((h) => !/^(https?:|mailto:|tel:)/.test(h))
      .filter((h) => !h.startsWith("/_next/"))
      // Asset URLs (preloads, icons) are files in public/, not routes.
      .filter((h) => !/\.[a-z0-9]{2,5}(\?|$)/i.test(h));
  }

  it("resolves every fragment link against the page it targets", () => {
    const broken: string[] = [];

    for (const [name, markup] of pages) {
      for (const href of navLinks(markup)) {
        const [rawPath, frag] = href.split("#");
        if (!frag) continue;

        const targetPath = rawPath === "" ? routePath(name) : rawPath.replace(/\/$/, "") || "/";
        const ids = idsByPath.get(targetPath);
        // Dynamic routes are not in the sampled set; skip rather than false-fail.
        if (!ids) continue;
        if (!ids.has(frag)) broken.push(`${routePath(name)} -> ${href}`);
      }
    }

    expect(broken, `fragment links with no matching id:\n${broken.join("\n")}`).toEqual([]);
  });

  it("gives every in-page anchor a scroll offset clear of the sticky header", async () => {
    const css = readFileSync(join(process.cwd(), "app", "a11y.css"), "utf8");
    // Without this, an anchor target scrolls to the top of the viewport and lands
    // underneath the 62px sticky header.
    expect(css).toMatch(/scroll-margin-top:\s*\d+px/);
  });

  it("links each homepage service cell to its own practice page", async () => {
    const { services } = await import("@/lib/data");
    const markup = pages.get("home")!;
    for (const s of services) {
      expect(markup, `no homepage link to ${s.slug}`).toContain(`/services/${s.slug}`);
    }
    // They previously all pointed at #contact, which sent every practice to the
    // booking form and left the detail pages with no inbound homepage links.
    expect(markup).not.toMatch(/class="grid-services-cell[^"]*"[^>]*href="\/?#contact"/);
  });
});

describe.skipIf(!buildExists)("third-party consent compliance", () => {
  // The Calendly embed sets its own cookies, so nothing belonging to it may
  // appear in markup served before the visitor has agreed to load it. These
  // assertions fail loudly if the gate in CalBooking is ever bypassed.
  const bookingPages = routes.filter(
    (r) => r.name === "home" || r.name === "about" || r.name.startsWith("service") || r.name.startsWith("case-study")
  );

  it.each(bookingPages)("$name requests no Calendly resource before consent", ({ file }) => {
    const markup = html(file);
    expect(markup, "embed frame must not be prerendered").not.toMatch(/<iframe[^>]*calendly\.com/);
    expect(markup, "embed script must not be prerendered").not.toMatch(/assets\.calendly\.com/);
  });

  it("still offers a booking path in the no-JavaScript markup", () => {
    const markup = html("index.html");
    // A plain link to the booking page, so the page converts even with the
    // embed unloaded and scripting disabled.
    expect(markup).toMatch(/href="https:\/\/calendly\.com\//);
    expect(markup).toMatch(/mailto:/);
  });

  it("does not prerender the consent prompt, so returning visitors see no flash", () => {
    expect(html("index.html")).not.toMatch(/cookie-consent-inner/);
  });

  it("discloses Calendly in the privacy policy", () => {
    expect(html("privacy.html")).toMatch(/Calendly/);
  });

  it("lists Calendly as a sub-processor on the security page", () => {
    expect(html("security.html")).toMatch(/Calendly/);
  });

  it("describes its cookie and analytics use accurately", () => {
    const markup = html("privacy.html");
    // The policy once claimed analytics cookies that did not exist. Analytics
    // now exists but is cookieless, so both halves need to be stated.
    expect(markup, "should disclose that analytics is cookieless").toMatch(/cookieless/i);
    expect(markup, "should still rule out cross-site tracking cookies").toMatch(
      /do not use advertising or cross-site tracking cookies/i
    );
  });
});
