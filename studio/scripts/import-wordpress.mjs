/**
 * Reads blog posts from the WordPress site's REST API and writes them as a file
 * Sanity can import, plus the list of redirects from the old addresses.
 *
 *   node scripts/import-wordpress.mjs                       # every post
 *   node scripts/import-wordpress.mjs --limit=20            # the 20 newest
 *   node scripts/import-wordpress.mjs --slugs=a-post,b-post # just these
 *   node scripts/import-wordpress.mjs --since=2025-01-01    # posts from a date on
 *
 * Then load the result into the dataset (images are downloaded and uploaded by
 * Sanity itself; --missing leaves any post that already exists untouched):
 *
 *   npx sanity dataset import wordpress-posts.ndjson production --missing
 *
 * Options: --site=https://signiance.com  --out=wordpress-posts.ndjson
 *          --redirects=wordpress-redirects.json
 *
 * Needs `npm install` first (the converter uses jsdom).
 */
import { writeFileSync } from "node:fs";
import { buildPostDocuments } from "./wpToPortable.mjs";

const args = process.argv.slice(2);
const option = (name, fallback) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;

const site = option("site", "https://signiance.com").replace(/\/$/, "");
const limit = Number(option("limit", "0")) || Infinity;
const since = option("since", "");
const only = new Set(option("slugs", "").split(",").map((s) => s.trim()).filter(Boolean));
const outFile = option("out", "wordpress-posts.ndjson");
const redirectsFile = option("redirects", "wordpress-redirects.json");

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const url = `${site}/wp-json/wp/v2/posts?per_page=100&page=${page}&orderby=date&order=desc&_embed=author,wp:featuredmedia,wp:term`;
    const res = await fetch(url);
    if (res.status === 400) break; // past the last page
    if (!res.ok) throw new Error(`WordPress answered ${res.status} for ${url}`);
    const batch = await res.json();
    posts.push(...batch);
    const totalPages = Number(res.headers.get("x-wp-totalpages") ?? page);
    process.stdout.write(`\rfetched ${posts.length} posts (page ${page}/${totalPages})`);
    if (page >= totalPages) break;
  }
  process.stdout.write("\n");
  return posts;
}

const all = await fetchAllPosts();
const selected = all
  .filter((p) => (only.size ? only.has(p.slug) : true))
  .filter((p) => (since ? (p.date_gmt ?? p.date) >= since : true))
  .slice(0, limit);

// A link to another imported post is rewritten to its new address. Links to any
// other page on the old site become relative paths and are listed at the end:
// each needs an old-page redirect (or a decision on where it should now point).
const importedSlugs = new Set(selected.map((p) => p.slug));
const hostnames = new Set([new URL(site).hostname, `www.${new URL(site).hostname}`]);
const unresolved = new Map();

function rewriteHref(href) {
  const value = href.trim();
  if (value === "" || /^javascript:/i.test(value)) return "";
  let url;
  try {
    url = new URL(value, site);
  } catch {
    return value;
  }
  if (!hostnames.has(url.hostname)) return value;
  const slug = url.pathname.replace(/^\/+|\/+$/g, "");
  if (importedSlugs.has(slug)) return `/blog/${slug}${url.hash}`;
  if (slug !== "") unresolved.set(url.pathname, (unresolved.get(url.pathname) ?? 0) + 1);
  // Made relative, so it works on any domain (staging included) and is resolved by
  // the old-page redirects at launch rather than hard-wired to the old site.
  return `${url.pathname}${url.search}${url.hash}`;
}

const docs = new Map();
const warnings = new Map();
const redirects = [];
let images = 0;
let tables = 0;

for (const wp of selected) {
  const built = buildPostDocuments(wp, { rewriteHref });
  for (const doc of built.docs) docs.set(doc._id, doc);
  for (const w of built.warnings) warnings.set(w, (warnings.get(w) ?? 0) + 1);

  const post = built.docs.find((d) => d._type === "post");
  images += (post.coverImage ? 1 : 0) + post.body.filter((b) => b._type === "image").length;
  tables += post.body.filter((b) => b._type === "table").length;

  const oldPath = new URL(wp.link).pathname.replace(/\/+$/, "");
  if (oldPath && oldPath !== `/blog/${wp.slug}`) {
    redirects.push({ source: oldPath, destination: `/blog/${wp.slug}`, permanent: true });
  }
}

writeFileSync(outFile, [...docs.values()].map((d) => JSON.stringify(d)).join("\n") + "\n");
writeFileSync(redirectsFile, JSON.stringify(redirects, null, 2) + "\n");

const posts = [...docs.values()].filter((d) => d._type === "post");
console.log(`\nWrote ${posts.length} posts, ${docs.size - posts.length} authors, ${images} images, ${tables} tables to ${outFile}`);
console.log(`Wrote ${redirects.length} redirects to ${redirectsFile}`);

const noExcerpt = posts.filter((p) => !p.excerpt).map((p) => p.slug);
const noBody = posts.filter((p) => p.body.length === 0).map((p) => p.slug);
if (noExcerpt.length) console.log(`\n${noExcerpt.length} post(s) have no summary (required in the Studio): ${noExcerpt.join(", ")}`);
if (noBody.length) console.log(`\n${noBody.length} post(s) have an empty body: ${noBody.join(", ")}`);
if (warnings.size) console.log(`\nSkipped content: ${[...warnings].map(([w, c]) => `${w} x${c}`).join(", ")}`);
if (unresolved.size) {
  console.log(`\nLinks to other pages on the old site (now relative paths; each needs a redirect to its new home):`);
  for (const [path, count] of [...unresolved].sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(`  ${count}x ${path}`);
}
