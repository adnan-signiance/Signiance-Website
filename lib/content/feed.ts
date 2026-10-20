import type { BlogPost } from "./posts";

function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 for the blog. Summaries only (title, excerpt, link): the full article
 * lives on the site, which is where a reader should land.
 */
export function buildFeed(
  posts: BlogPost[],
  site: { url: string; title: string; description: string },
  limit = 50
): string {
  const items = posts
    .slice(0, limit)
    .map((p) => {
      const link = `${site.url}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${xml(p.title)}</title>`,
        `      <link>${xml(link)}</link>`,
        `      <guid isPermaLink="true">${xml(link)}</guid>`,
        `      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>`,
        `      <description>${xml(p.excerpt)}</description>`,
        ...p.categories.map((c) => `      <category>${xml(c)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const newest = posts[0] ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${xml(site.title)}</title>`,
    `    <link>${xml(`${site.url}/blog`)}</link>`,
    `    <description>${xml(site.description)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${newest}</lastBuildDate>`,
    `    <atom:link href="${xml(`${site.url}/blog/feed.xml`)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
