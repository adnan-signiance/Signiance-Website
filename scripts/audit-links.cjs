/**
 * Audits every internal link and CTA against what actually exists.
 *
 * Goes beyond "does it resolve": reports the label next to each destination so
 * mismatches between what a CTA says and where it goes are visible.
 *
 * Run with: node scripts/audit-links.cjs
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

const sources = [...walk("components"), ...walk("app"), ...walk("lib")].filter((f) =>
  /\.(tsx|ts)$/.test(f)
);

// --- routes that exist -----------------------------------------------------
const routes = new Set(["/"]);
const dynamicPrefixes = [];
for (const f of walk("app")) {
  if (!f.endsWith(path.join("", "page.tsx")) || !f.endsWith("page.tsx")) continue;
  const rel = path.relative("app", f).replace(/\\/g, "/").replace(/\/page\.tsx$/, "");
  const route = rel === "page.tsx" ? "/" : "/" + rel;
  if (route.includes("[")) dynamicPrefixes.push(route.replace(/\/\[[^\]]+\]$/, ""));
  else routes.add(route);
}

// --- anchor ids that exist, and which route renders them -------------------
const anchorOwners = new Map(); // id -> Set of component files
for (const f of sources) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/\bid="([^"]+)"/g)) {
    if (!anchorOwners.has(m[1])) anchorOwners.set(m[1], new Set());
    anchorOwners.get(m[1]).add(path.basename(f));
  }
  if (/\bid=\{sv\.id\}/.test(t)) {
    for (const id of ["s1", "s2", "s3", "s4", "s5"]) {
      if (!anchorOwners.has(id)) anchorOwners.set(id, new Set());
      anchorOwners.get(id).add(path.basename(f));
    }
  }
}

// --- which components the homepage renders --------------------------------
const homeSrc = fs.readFileSync(path.join("app", "page.tsx"), "utf8");
const homeComponents = new Set(
  [...homeSrc.matchAll(/<([A-Z]\w+)\s*\/>/g)].map((m) => m[1] + ".tsx")
);

// --- collect links with nearby label --------------------------------------
const links = [];
for (const f of sources) {
  const text = fs.readFileSync(f, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/href=(?:"([^"]+)"|\{`([^`]+)`\})/g)) {
      const href = (m[1] ?? m[2]).trim();
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      // Label: look ahead a few lines for visible text
      const window = lines.slice(i, i + 4).join(" ");
      const label =
        (window.match(/<CtaArrow>([^<{]+)<\/CtaArrow>/) ||
          window.match(/btn-primary-label">([^<]+)</) ||
          window.match(/>\s*([A-Z][^<>{}]{2,40}?)\s*</) ||
          [])[1] || "";
      links.push({ file: path.basename(f), line: i + 1, href, label: label.trim() });
    }
  });
}

function resolves(href) {
  const [p, frag] = href.split("#");
  if (p === "" && frag) return anchorOwners.has(frag);
  if (frag && !anchorOwners.has(frag)) return false;
  const clean = (p || "/").replace(/\/$/, "") || "/";
  if (routes.has(clean)) return true;
  return dynamicPrefixes.some((pre) => clean.startsWith(pre + "/"));
}

/** An anchor on "/" only works if the owning component is on the homepage. */
function anchorReachable(href) {
  const [p, frag] = href.split("#");
  if (!frag) return true;
  const owners = anchorOwners.get(frag);
  if (!owners) return false;
  const targetsHome = p === "" || p === "/";
  if (!targetsHome) return true;
  return [...owners].some((o) => homeComponents.has(o));
}

console.log("routes: " + [...routes].sort().join(", "));
console.log("dynamic: " + dynamicPrefixes.join(", "));
console.log("");

const broken = links.filter((l) => !resolves(l.href));
const unreachable = links.filter((l) => resolves(l.href) && !anchorReachable(l.href));

console.log("=== BROKEN (target does not exist) ===");
broken.forEach((l) => console.log(`  ${l.file}:${l.line}  ${l.href}   [${l.label}]`));
if (!broken.length) console.log("  none");

console.log("");
console.log("=== UNREACHABLE (anchor exists but not on the page linked) ===");
unreachable.forEach((l) =>
  console.log(
    `  ${l.file}:${l.line}  ${l.href}   [${l.label}]  owner=${[
      ...(anchorOwners.get(l.href.split("#")[1]) || []),
    ].join(",")}`
  )
);
if (!unreachable.length) console.log("  none");

console.log("");
console.log("=== ALL INTERNAL LINKS BY DESTINATION ===");
const byHref = new Map();
for (const l of links) {
  if (!byHref.has(l.href)) byHref.set(l.href, []);
  byHref.get(l.href).push(l);
}
for (const [href, group] of [...byHref.entries()].sort()) {
  const labels = [...new Set(group.map((g) => g.label).filter(Boolean))];
  console.log(`  ${href.padEnd(34)} x${group.length}  ${labels.join(" | ")}`);
}
