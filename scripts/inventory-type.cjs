const fs = require("fs");
const path = require("path");

function walk(d, o = []) {
  for (const e of fs.readdirSync(d)) {
    const f = path.join(d, e);
    fs.statSync(f).isDirectory() ? walk(f, o) : o.push(f);
  }
  return o;
}

const files = [...walk("components"), ...walk("app")].filter((f) => /\.(tsx|css)$/.test(f));

const sizes = new Map();
const tracking = new Map();

for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  // Inline JSX: fontSize: 14  /  fontSize: "clamp(...)"
  for (const m of t.matchAll(/fontSize:\s*(?:"([^"]+)"|([\d.]+))/g)) {
    const v = (m[1] ?? m[2]).trim();
    sizes.set(v, (sizes.get(v) || 0) + 1);
  }
  // CSS: font-size: 14px
  for (const m of t.matchAll(/font-size:\s*([^;]+);/g)) {
    sizes.set(m[1].trim(), (sizes.get(m[1].trim()) || 0) + 1);
  }
  for (const m of t.matchAll(/letterSpacing:\s*"([^"]+)"/g)) {
    tracking.set(m[1], (tracking.get(m[1]) || 0) + 1);
  }
  for (const m of t.matchAll(/letter-spacing:\s*([^;]+);/g)) {
    tracking.set(m[1].trim(), (tracking.get(m[1].trim()) || 0) + 1);
  }
}

const plain = [...sizes.entries()].filter(([v]) => !v.includes("var(") && !v.includes("clamp"));
console.log("distinct font sizes: " + sizes.size + "  (literal, non-token: " + plain.length + ")");
console.log("");
console.log("--- literal sizes, most used first ---");
for (const [v, n] of plain.sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4) + "x  " + v);
}
console.log("");
console.log("--- letter-spacing values: " + tracking.size + " ---");
for (const [v, n] of [...tracking.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4) + "x  " + v);
}
