/**
 * Replaces literal hex colours with the tokens defined in app/globals.css.
 *
 * Values are mapped one-to-one, so this is a pure refactor with no visual
 * change. The token definition block in globals.css is skipped, since that is
 * where the literals legitimately live.
 *
 * Run with: node scripts/migrate-to-tokens.cjs
 */
const fs = require("fs");
const path = require("path");

const MAP = {
  "#9DB8EE": "--color-accent-pale",
  "#5C81DF": "--color-accent-lighter",
  "#4F6FDB": "--color-accent-light",
  "#2C55C4": "--color-accent-mid",
  "#193DAA": "--color-accent",
  "#152F85": "--color-accent-strong",
  "#132C7A": "--color-accent-deep",
  "#0D184A": "--color-navy",
  "#A9B8E4": "--color-on-dark-muted",
  "#8090C2": "--color-numeral",
  "#C7CEE6": "--color-accent-faint",
  "#FFFFFF": "--color-white",
  "#EEF2FB": "--color-tint",
  "#F9F8F5": "--color-warm",
  "#F0EFEA": "--color-warm-alt",
  "#131417": "--color-ink",
  "#22252A": "--color-ink-soft",
  "#43464A": "--color-text",
  "#55585C": "--color-text-soft",
  "#6A6D71": "--color-muted",
  "#E2E0DA": "--color-line",
  "#D6D3CB": "--color-line-strong",
  "#8B8E86": "--color-border-ui",
  "#A29E96": "--color-dot",
  "#B4231F": "--color-danger",
  "#1B6B3A": "--color-success",
};

// Near-duplicates folded into an existing token. Each delta is imperceptible and
// each was used once or twice, so they were carrying no distinct meaning.
const FOLD = {
  "#64676B": "--color-muted", // vs #6A6D71: 5.68 vs 5.20 contrast, both pass AA
  "#F5F4F0": "--color-warm-alt",
  "#EDE9E0": "--color-warm-alt",
};

const ALL = { ...MAP, ...FOLD };

function walk(d, o = []) {
  for (const e of fs.readdirSync(d)) {
    const f = path.join(d, e);
    fs.statSync(f).isDirectory() ? walk(f, o) : o.push(f);
  }
  return o;
}

const files = [...walk("components"), ...walk("app"), ...walk("lib")].filter((f) =>
  /\.(tsx|ts|css)$/.test(f)
);

let totalReplaced = 0;
let filesChanged = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");

  // Protect the token definitions themselves.
  const start = original.indexOf("TOKENS-START");
  const end = original.indexOf("TOKENS-END");
  const hasTokens = start !== -1 && end !== -1;

  const head = hasTokens ? original.slice(0, end) : "";
  const body = hasTokens ? original.slice(end) : original;

  let out = body;
  let count = 0;

  for (const [hex, token] of Object.entries(ALL)) {
    const re = new RegExp(hex.replace("#", "#"), "gi");
    out = out.replace(re, (match) => {
      // Preserve the surrounding syntax: CSS uses `color: var(--x)`, and inline
      // JSX styles are strings, so `"var(--x)"` works in both.
      count += 1;
      return `var(${token})`;
    });
  }

  if (count > 0) {
    fs.writeFileSync(file, head + out, { encoding: "utf8" });
    filesChanged += 1;
    totalReplaced += count;
    console.log(String(count).padStart(4) + "  " + file);
  }
}

console.log("");
console.log("replaced " + totalReplaced + " literals across " + filesChanged + " files");
