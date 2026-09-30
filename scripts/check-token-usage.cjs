/**
 * Guards against the two ways a CSS custom property can silently fail after the
 * token migration:
 *
 *  1. Concatenated with an alpha suffix — `var(--x)17` is invalid CSS.
 *  2. Used somewhere custom properties are not resolved, such as email HTML.
 *
 * Run with: node scripts/check-token-usage.cjs
 */
const fs = require("fs");
const path = require("path");

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

const problems = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);

  lines.forEach((line, i) => {
    // Comments legitimately discuss the broken patterns this script looks for.
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;

    // var(--token) immediately followed by hex digits
    if (/var\(--[a-z0-9-]+\)[0-9A-Fa-f]{2}\b/.test(line)) {
      problems.push(`${file}:${i + 1}  alpha suffix on a var(): ${line.trim().slice(0, 90)}`);
    }
    // A template literal interpolating a colour then appending alpha, where the
    // interpolated value could be a token.
    if (/\$\{[^}]*(accent|color|Color)[^}]*\}[0-9A-Fa-f]{2}\b/.test(line)) {
      const varsInLine = /var\(--/.test(line);
      if (varsInLine) {
        problems.push(`${file}:${i + 1}  interpolated token + alpha: ${line.trim().slice(0, 90)}`);
      }
    }
  });

  // Custom properties do not resolve in email clients.
  if (file.includes(path.join("api", "contact")) && /var\(--/.test(text)) {
    problems.push(`${file}  custom property inside email HTML`);
  }
}

if (problems.length) {
  console.log("PROBLEMS FOUND:");
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
}
console.log("no token misuse found");
