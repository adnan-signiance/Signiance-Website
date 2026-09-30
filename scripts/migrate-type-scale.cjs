/**
 * Migrates literal font sizes and letter-spacing values onto the tokens defined
 * in app/globals.css.
 *
 * The mapping is explicit rather than computed: each literal is assigned to the
 * nearest step deliberately, and values below the 11px floor are raised.
 *
 * Run with: node scripts/migrate-type-scale.cjs
 */
const fs = require("fs");
const path = require("path");

/** literal px value -> token */
const SIZE = {
  // Below the floor: raised to 11px.
  9: "--fs-2xs",
  10: "--fs-2xs",
  10.5: "--fs-2xs",
  11: "--fs-2xs",
  // 12 / 12.5 collapse to one step.
  12: "--fs-xs",
  12.5: "--fs-xs",
  // 13 / 13.5.
  13: "--fs-sm",
  13.5: "--fs-sm",
  // 14 / 14.5.
  14: "--fs-base",
  14.5: "--fs-base",
  // 15 / 15.5 / 16 / 16.5 all land on the body step.
  15: "--fs-md",
  15.5: "--fs-md",
  16: "--fs-md",
  16.5: "--fs-md",
  // 17 / 18.
  17: "--fs-lg",
  18: "--fs-lg",
  // 19 / 20 / 21 / 22.
  19: "--fs-xl",
  20: "--fs-xl",
  21: "--fs-xl",
  22: "--fs-xl",
  // 24 / 26.
  24: "--fs-2xl",
  26: "--fs-2xl",
};

/** literal tracking -> token. Near-normal values are dropped entirely. */
const TRACKING = {
  "-0.05em": "--tracking-tight",
  "-0.045em": "--tracking-tight",
  "-0.04em": "--tracking-tight",
  "-0.038em": "--tracking-tight",
  "-0.035em": "--tracking-tight",
  "-0.03em": "--tracking-snug",
  "-0.028em": "--tracking-snug",
  "-0.025em": "--tracking-snug",
  "-0.02em": "--tracking-snug",
  "-0.015em": "--tracking-snug",
  "0.08em": "--tracking-wide",
  "0.1em": "--tracking-wide",
  "0.12em": "--tracking-wide",
  "0.14em": "--tracking-wide",
  "0.15em": "--tracking-wide",
  "0.16em": "--tracking-wide",
  "0.18em": "--tracking-wide",
};

function walk(d, o = []) {
  for (const e of fs.readdirSync(d)) {
    const f = path.join(d, e);
    fs.statSync(f).isDirectory() ? walk(f, o) : o.push(f);
  }
  return o;
}

const files = [...walk("components"), ...walk("app")].filter((f) => /\.(tsx|css)$/.test(f));

let changedFiles = 0;
let sizeCount = 0;
let trackCount = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");

  // Never rewrite the token definitions themselves.
  const tokenEnd = original.indexOf("TOKENS-END");
  const head = tokenEnd === -1 ? "" : original.slice(0, tokenEnd);
  let body = tokenEnd === -1 ? original : original.slice(tokenEnd);

  // --- Inline JSX numeric: fontSize: 14  ->  fontSize: "var(--fs-base)"
  body = body.replace(/fontSize:\s*([\d.]+)(?=[,\s}])/g, (m, v) => {
    const token = SIZE[Number(v)];
    if (!token) return m;
    sizeCount += 1;
    return `fontSize: "var(${token})"`;
  });

  // --- CSS: font-size: 14px;  ->  font-size: var(--fs-base);
  body = body.replace(/font-size:\s*([\d.]+)px\s*;/g, (m, v) => {
    const token = SIZE[Number(v)];
    if (!token) return m;
    sizeCount += 1;
    return `font-size: var(${token});`;
  });

  // --- Inline JSX tracking: letterSpacing: "-0.02em"
  body = body.replace(/letterSpacing:\s*"([^"]+)"/g, (m, v) => {
    if (v === "0.01em" || v === "0.02em") {
      trackCount += 1;
      return `letterSpacing: "normal"`;
    }
    const token = TRACKING[v];
    if (!token) return m;
    trackCount += 1;
    return `letterSpacing: "var(${token})"`;
  });

  // --- CSS tracking: letter-spacing: -0.02em;
  body = body.replace(/letter-spacing:\s*([^;]+);/g, (m, raw) => {
    const v = raw.trim();
    if (v === "0.01em" || v === "0.02em") {
      trackCount += 1;
      return "letter-spacing: normal;";
    }
    const token = TRACKING[v];
    if (!token) return m;
    trackCount += 1;
    return `letter-spacing: var(${token});`;
  });

  const out = head + body;
  if (out !== original) {
    fs.writeFileSync(file, out, { encoding: "utf8" });
    changedFiles += 1;
  }
}

console.log(
  `migrated ${sizeCount} font sizes and ${trackCount} tracking values across ${changedFiles} files`
);
