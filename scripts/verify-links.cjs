/**
 * Verifies every internal link in the PRERENDERED HTML actually resolves —
 * routes to real pages, fragments to ids that exist on the page being linked.
 *
 * This is the authoritative check: it works on rendered output, so template
 * literals are already expanded.
 *
 * Requires a prior `npm run build`.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(".next", "server", "app");

function walk(d, o = []) {
  for (const e of fs.readdirSync(d)) {
    const f = path.join(d, e);
    fs.statSync(f).isDirectory() ? walk(f, o) : o.push(f);
  }
  return o;
}

const pages = walk(OUT).filter((f) => f.endsWith(".html"));

/** route path -> set of element ids on that page */
const idsByRoute = new Map();
const routeOf = (file) => {
  const rel = path.relative(OUT, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  if (rel.startsWith("_")) return "/" + rel;
  return "/" + rel;
};

for (const f of pages) {
  const html = fs.readFileSync(f, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idsByRoute.set(routeOf(f), ids);
}

const knownRoutes = new Set(idsByRoute.keys());

let problems = 0;
let checked = 0;

for (const f of pages) {
  const route = routeOf(f);
  const html = fs.readFileSync(f, "utf8");

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#)/.test(href) === false && !href.startsWith("/")) continue;
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith("/_next/")) continue;
    // Asset URLs, not navigation: preloaded images, icons, manifests. Anything
    // with a file extension is served from public/ rather than being a route.
    if (/\.[a-z0-9]{2,5}(\?|$)/i.test(href)) continue;

    checked += 1;

    const [rawPath, frag] = href.split("#");
    // Fragment-only link: the id must exist on THIS page.
    if (rawPath === "") {
      if (frag && !idsByRoute.get(route).has(frag)) {
        console.log(`  ${route}  ->  ${href}   fragment not on this page`);
        problems += 1;
      }
      continue;
    }

    const target = (rawPath.replace(/\/$/, "") || "/");
    if (!knownRoutes.has(target)) {
      console.log(`  ${route}  ->  ${href}   route does not exist`);
      problems += 1;
      continue;
    }
    if (frag && !idsByRoute.get(target).has(frag)) {
      console.log(`  ${route}  ->  ${href}   fragment not on target page`);
      problems += 1;
    }
  }
}

console.log("");
console.log(`checked ${checked} internal links across ${pages.length} pages`);
console.log(problems === 0 ? "all resolve" : `${problems} problems`);
process.exit(problems === 0 ? 0 : 1);
