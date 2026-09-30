import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");
const MEDIA_DIR = join(PUBLIC_DIR, "media");
const BUILD_HTML = join(process.cwd(), ".next", "server", "app", "index.html");

function allFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? allFiles(join(dir, e.name)) : [join(dir, e.name)]
  );
}

/**
 * Performance budgets.
 *
 * These exist because the site previously shipped a 6 MB hero image and ~15 MB
 * of static assets. Budgets make that a build failure rather than something
 * noticed months later in a Lighthouse report.
 */
describe("asset budgets", () => {
  const files = allFiles(PUBLIC_DIR);

  it("keeps the whole public directory under 4 MB", () => {
    const totalMb = files.reduce((sum, f) => sum + statSync(f).size, 0) / 1024 / 1024;
    expect(totalMb, `public/ is ${totalMb.toFixed(2)} MB`).toBeLessThan(4);
  });

  it("has no single asset over 400 KB", () => {
    const oversized = files
      .map((f) => ({ f, kb: statSync(f).size / 1024 }))
      .filter((x) => x.kb > 400)
      .map((x) => `${x.f.replace(process.cwd(), "")} (${Math.round(x.kb)} KB)`);
    expect(oversized, `oversized assets:\n${oversized.join("\n")}`).toEqual([]);
  });

  it("keeps the hero backdrop under 150 KB", () => {
    const hero = join(MEDIA_DIR, "hero-portal.webp");
    expect(existsSync(hero), "hero-portal.webp should exist").toBe(true);
    const kb = statSync(hero).size / 1024;
    expect(kb, `hero is ${Math.round(kb)} KB`).toBeLessThan(150);
  });

  it("ships no PNG over 200 KB, since photographic art should be WebP", () => {
    const heavyPng = files
      .filter((f) => f.endsWith(".png") && statSync(f).size > 200 * 1024)
      .map((f) => f.replace(process.cwd(), ""));
    expect(heavyPng, `heavy PNGs:\n${heavyPng.join("\n")}`).toEqual([]);
  });
});

describe.skipIf(!existsSync(BUILD_HTML))("delivery", () => {
  const html = readFileSync(BUILD_HTML, "utf8");

  it("serves fonts from our own origin, not Google", () => {
    expect(html).not.toMatch(/fonts\.googleapis\.com/);
    expect(html).not.toMatch(/fonts\.gstatic\.com/);
  });

  it("preloads a self-hosted font file", () => {
    expect(html).toMatch(/static\/media\/[^"']*\.woff2/);
  });

  it("routes images through the next/image optimizer", () => {
    expect(html).toMatch(/\/_next\/image\?url=/);
  });

  it("marks the hero as high priority so it is not lazy-loaded", () => {
    expect(html).toMatch(/hero-portal/);
    expect(html).toMatch(/fetchPriority="high"|rel="preload"/);
  });
});
