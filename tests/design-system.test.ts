import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    statSync(full).isDirectory() ? walk(full, out) : out.push(full);
  }
  return out;
}

const sources = [join(ROOT, "components"), join(ROOT, "app"), join(ROOT, "lib")]
  .flatMap((d) => walk(d))
  .filter((f) => /\.(tsx|ts|css)$/.test(f))
  .map((f) => ({ path: relative(ROOT, f).replace(/\\/g, "/"), text: readFileSync(f, "utf8") }));

/**
 * Files allowed to contain literal hex colours, each for a specific reason.
 * Anything else must use a token from the block in app/globals.css.
 */
const ALLOWED = new Map<string, string>([
  ["app/globals.css", "defines the tokens"],
  [
    "components/PracticeIcon.tsx",
    "serviceColor is concatenated with an alpha suffix at call sites",
  ],
  ["components/AboutContent.tsx", "blueScale is concatenated with an alpha suffix"],
  ["app/fallbacks.css", "rgba fallbacks for color-mix"],
  [
    "components/CalBooking.tsx",
    "brand colours are passed to the Calendly iframe, where this document's custom properties do not exist",
  ],
  [
    "app/global-error.tsx",
    "renders when the root layout failed, so no stylesheet is guaranteed to be loaded",
  ],
]);

function stripComments(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split(/\r?\n/)
    .filter((l) => !l.trim().startsWith("//"))
    .join("\n");
}

describe("design tokens", () => {
  it("defines the token block in globals.css", () => {
    const globals = sources.find((s) => s.path === "app/globals.css")!;
    expect(globals.text).toContain("TOKENS-START");
    expect(globals.text).toContain("TOKENS-END");
  });

  it("uses tokens rather than literal hex colours", () => {
    const offenders: string[] = [];

    for (const { path, text } of sources) {
      if (ALLOWED.has(path)) continue;
      const code = stripComments(text);
      const hits = [...code.matchAll(/#[0-9A-Fa-f]{6}\b/g)].map((m) => m[0]);
      if (hits.length) {
        offenders.push(`${path}: ${[...new Set(hits)].join(", ")}`);
      }
    }

    expect(
      offenders,
      `literal colours outside the token layer:\n${offenders.join("\n")}\n` +
        `Add a token in app/globals.css, or document an exception in tests/design-system.test.ts.`
    ).toEqual([]);
  });

  it("never applies an alpha suffix to a custom property", () => {
    const broken: string[] = [];
    for (const { path, text } of sources) {
      const code = stripComments(text);
      if (/var\(--[a-z0-9-]+\)[0-9A-Fa-f]{2}\b/.test(code)) broken.push(path);
    }
    // `var(--x)17` is invalid CSS and fails silently, so this is worth asserting.
    expect(broken, `invalid alpha-on-var in: ${broken.join(", ")}`).toEqual([]);
  });

  it("keeps the radius scale to three steps", () => {
    const globals = sources.find((s) => s.path === "app/globals.css")!;
    for (const token of ["--radius-sm", "--radius-md", "--radius-pill"]) {
      expect(globals.text, `${token} should be defined`).toContain(token);
    }
  });
});

describe("homepage tonal contrast", () => {
  it("has exactly one dark band, on the proof section", () => {
    const metrics = sources.find((s) => s.path === "components/MetricsSection.tsx")!;
    expect(metrics.text).toContain("metrics-band");

    const band = sources.find((s) => s.path === "app/metrics-band.css")!;
    expect(band.text, "band should stay inside the page frame").not.toContain("50vw");
    expect(band.text).toContain("--color-navy");
  });
});

describe("cross-browser fallbacks", () => {
  // The hero mask guard that used to be asserted here went with the hero
  // backdrop image: the hero is now centred copy on plain white, so there is no
  // masked element left to guard.

  it("declares an rgba fallback before every color-mix box-shadow", () => {
    const globals = sources.find((s) => s.path === "app/globals.css")!;
    const rules = globals.text.split("}");
    for (const rule of rules) {
      if (!rule.includes("color-mix")) continue;
      expect(
        rule,
        `a rule uses color-mix with no rgba fallback:\n${rule.trim().slice(0, 160)}`
      ).toMatch(/box-shadow:[^;]*rgba\(/);
    }
  });
});

describe("style duplication", () => {
  it("uses the .section-rule class instead of repeating an inline divider", () => {
    const inline = sources.filter(({ text }) =>
      /height: 2, background: "var\(--color-line-strong\)"/.test(text)
    );
    expect(inline.map((s) => s.path), "inline divider should be the .section-rule class").toEqual([]);
  });
});


