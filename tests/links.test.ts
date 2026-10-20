import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { services, caseStudyEntries } from "@/lib/data";

const ROOT = process.cwd();
const APP_DIR = join(ROOT, "app");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Every source file that can contain a link or an anchor target. */
const sourceFiles = [join(ROOT, "app"), join(ROOT, "components"), join(ROOT, "lib")]
  .flatMap((d) => walk(d))
  .filter((f) => /\.(tsx|ts)$/.test(f));

const sources = sourceFiles.map((file) => ({
  file: relative(ROOT, file),
  text: readFileSync(file, "utf8"),
}));

/**
 * Static routes derived from the filesystem: every `page.tsx` becomes a route,
 * with dynamic `[slug]` segments recorded separately.
 */
function collectRoutes() {
  const staticRoutes = new Set<string>(["/"]);
  const dynamicPrefixes: string[] = [];

  for (const file of walk(APP_DIR)) {
    if (!file.endsWith(`${sep}page.tsx`)) continue;
    const rel = relative(APP_DIR, file).replace(/\\/g, "/").replace(/\/page\.tsx$/, "");
    const route = rel === "page.tsx" ? "/" : `/${rel}`;
    if (route.includes("[")) {
      dynamicPrefixes.push(route.replace(/\/\[[^\]]+\]$/, ""));
    } else {
      staticRoutes.add(route);
    }
  }
  return { staticRoutes, dynamicPrefixes };
}

const { staticRoutes, dynamicPrefixes } = collectRoutes();

/** All element ids in the codebase, for validating `#fragment` links. */
const anchorIds = new Set<string>();
for (const { text } of sources) {
  for (const m of text.matchAll(/\bid=["']([^"']+)["']/g)) anchorIds.add(m[1]);
  // ServicesList renders `id={sv.id}`, so service ids are anchor targets too.
  if (/\bid=\{sv\.id\}/.test(text)) services.forEach((s) => anchorIds.add(s.id));
}

/** Static internal hrefs, i.e. `href="/..."` or `href="#..."`. */
const staticLinks: { file: string; href: string }[] = [];
for (const { file, text } of sources) {
  for (const m of text.matchAll(/href=["'](\/[^"']*|#[^"']+)["']/g)) {
    staticLinks.push({ file, href: m[1] });
  }
}

const knownDynamicRoutes = new Set<string>([
  ...services.map((s) => `/services/${s.slug}`),
  ...caseStudyEntries.map((c) => `/case-studies/${c.slug}`),
]);

function resolves(href: string): boolean {
  const [path, fragment] = href.split("#");

  if (path === "" && fragment) return anchorIds.has(fragment);
  if (fragment && !anchorIds.has(fragment)) return false;

  const clean = path.replace(/\/$/, "") || "/";
  if (staticRoutes.has(clean)) return true;
  if (knownDynamicRoutes.has(clean)) return true;
  return dynamicPrefixes.some((p) => clean.startsWith(`${p}/`));
}

describe("route discovery", () => {
  it("finds the expected static routes", () => {
    for (const expected of [
      "/",
      "/about",
      "/services",
      "/case-studies",
      "/how-we-work",
      "/blog",
      "/careers",
      "/privacy",
      "/terms",
      "/security",
    ]) {
      expect(staticRoutes.has(expected), `missing route ${expected}`).toBe(true);
    }
  });

  it("finds dynamic route segments for services and case studies", () => {
    expect(dynamicPrefixes).toContain("/services");
    expect(dynamicPrefixes).toContain("/case-studies");
  });
});

describe("link integrity", () => {
  it("finds links to check", () => {
    expect(staticLinks.length).toBeGreaterThan(10);
  });

  it("has no internal link pointing at a route or anchor that does not exist", () => {
    const broken = staticLinks
      .filter(({ href }) => !resolves(href))
      .map(({ file, href }) => `${file} -> ${href}`);
    expect(broken, `broken links:\n${broken.join("\n")}`).toEqual([]);
  });
});

describe("anchor targets", () => {
  // These are the in-page targets the navigation and hero CTAs rely on.
  it.each(["contact", "work", "services"])("renders an element with id=%s", (id) => {
    expect(anchorIds.has(id)).toBe(true);
  });
});

describe("sitemap coverage", () => {
  it("lists every indexable static route", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const urls: string[] = (await sitemap()).map((e: { url: string }) =>
      new URL(e.url).pathname.replace(/\/$/, "") || "/"
    );

    // Routes intentionally excluded from the sitemap must be listed here with a
    // reason, so an omission is always a deliberate decision rather than a slip.
    const intentionallyExcluded = new Set<string>([
      "/blog", // Phase 5.14: "Coming Soon" stub, pending noindex decision
      "/careers", // Phase 5.14: "Coming Soon" stub, pending noindex decision
    ]);

    const missing = [...staticRoutes].filter(
      (r) => !urls.includes(r) && !intentionallyExcluded.has(r)
    );
    expect(missing, `routes missing from sitemap: ${missing.join(", ")}`).toEqual([]);
  });
});
