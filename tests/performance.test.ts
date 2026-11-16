import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { clients } from "@/lib/data";

const PUBLIC_DIR = join(process.cwd(), "public");
const BUILD_HTML = join(process.cwd(), ".next", "server", "app", "index.html");

function allFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? allFiles(join(dir, e.name)) : [join(dir, e.name)]
  );
}

type Size = { width: number; height: number };

/** Pixel size from a WebP header: lossy (VP8), lossless (VP8L) or extended (VP8X). */
function webpSize(buf: Buffer): Size {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("not a WebP file");
  }
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >>> 14) & 0x3fff) };
  }
  if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  throw new Error(`unknown WebP chunk "${chunk}"`);
}

/** Size of an SVG from its viewBox, rounded to whole pixels as recorded in lib/data.ts. */
function svgSize(text: string): Size {
  const box = text.match(/viewBox="([^"]+)"/)?.[1].trim().split(/[\s,]+/).map(Number);
  if (!box || box.length !== 4) throw new Error("SVG has no viewBox");
  return { width: Math.round(box[2]), height: Math.round(box[3]) };
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

  // The hero backdrop weight budget went with the backdrop itself: the hero is
  // now centred copy on plain white and ships no image at all. The 400 KB
  // per-asset cap above still covers everything in public/.

  it("ships no PNG over 200 KB, since photographic art should be WebP", () => {
    const heavyPng = files
      .filter((f) => f.endsWith(".png") && statSync(f).size > 200 * 1024)
      .map((f) => f.replace(process.cwd(), ""));
    expect(heavyPng, `heavy PNGs:\n${heavyPng.join("\n")}`).toEqual([]);
  });
});

describe("layout stability", () => {
  // ClientsStrip turns these into width/height attributes so the logo row in the
  // homepage's first screen does not reflow as each file loads.
  it("records a positive intrinsic size for every client logo", () => {
    for (const c of clients) {
      expect(c.intrinsicWidth, c.alt).toBeGreaterThan(0);
      expect(c.intrinsicHeight, c.alt).toBeGreaterThan(0);
    }
  });

  // The sizes are copied by hand into lib/data.ts, so a replaced logo file would
  // otherwise drift out of step with its recorded aspect ratio.
  it("records each client logo's intrinsic size as the file's own", () => {
    for (const c of clients) {
      const file = join(PUBLIC_DIR, c.src);
      const size = c.src.endsWith(".svg") ? svgSize(readFileSync(file, "utf8")) : webpSize(readFileSync(file));
      expect({ width: c.intrinsicWidth, height: c.intrinsicHeight }, c.src).toEqual(size);
    }
  });

  it("gives both AWS badges on the About page width and height attributes", () => {
    const src = readFileSync(join(process.cwd(), "components", "AboutContent.tsx"), "utf8");
    for (const file of ["aws-advanced-tier-partner.webp", "aws-well-architected-partner.webp"]) {
      const tag = src.match(new RegExp(`<img[^>]*src="/media/${file.replace(".", "\\.")}"[^>]*>`))?.[0] ?? "";
      expect(tag, file).toMatch(/\swidth=\{\d+\}/);
      expect(tag, file).toMatch(/\sheight=\{\d+\}/);
    }
  });

  // The case-study filter chips are the only filter control on /case-studies, so
  // they sit at the control size on the type scale with a comfortable touch target.
  it("sizes .cs-filter-chip as a control", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
    const rule = css.match(/\.cs-filter-chip\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(rule).toMatch(/font-size:\s*var\(--fs-sm\)/);
    const minHeight = Number(rule.match(/min-height:\s*(\d+)px/)?.[1] ?? 0);
    expect(minHeight).toBeGreaterThanOrEqual(36);
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

  // There is no longer a priority hero image to assert on. The hero is text on
  // plain white, which makes the h1 the LCP element — nothing to preload, and
  // the font preload above is covered by its own test.
});
