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

const counts = new Map();
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/#[0-9A-Fa-f]{6}\b/g)) {
    const hex = m[0].toUpperCase();
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
console.log("distinct colours: " + sorted.length);
console.log("total references: " + sorted.reduce((s, [, n]) => s + n, 0));
console.log("");
for (const [hex, n] of sorted) {
  console.log(String(n).padStart(4) + "x  " + hex);
}

// Radii
const radii = new Map();
for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/border-?[Rr]adius:\s*"?([0-9]+px|[0-9]+%|999px|[0-9]+)"?/g)) {
    radii.set(m[1], (radii.get(m[1]) || 0) + 1);
  }
}
console.log("");
console.log("distinct border-radius values: " + radii.size);
for (const [v, n] of [...radii.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4) + "x  " + v);
}
