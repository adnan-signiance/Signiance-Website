import { describe, expect, it } from "vitest";
import { buildFeed } from "@/lib/content/feed";
import { parsePosts, type RawPost } from "@/lib/content/posts";

const site = { url: "https://www.signiance.com", title: "Signiance field notes", description: "Notes & news" };

function posts(overrides: Partial<RawPost> = {}) {
  return parsePosts([
    {
      _id: "p1",
      title: "Terraform vs CloudFormation <vs> Pulumi",
      slug: "terraform-vs-cloudformation",
      excerpt: 'Which one? "It depends" & here\'s why.',
      publishedAt: "2026-09-15T12:00:00Z",
      categories: ["Cloud", "IaC & more"],
      body: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Body." }] }],
      ...overrides,
    },
  ]);
}

describe("buildFeed", () => {
  it("is RSS 2.0 with a self link, and links each post under /blog", () => {
    const xml = buildFeed(posts(), site);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('rel="self" type="application/rss+xml"');
    expect(xml).toContain("<link>https://www.signiance.com/blog/terraform-vs-cloudformation</link>");
    expect(xml).toContain('<guid isPermaLink="true">https://www.signiance.com/blog/terraform-vs-cloudformation</guid>');
  });

  it("escapes anything that could break the XML", () => {
    const xml = buildFeed(posts(), site);
    expect(xml).toContain("<title>Terraform vs CloudFormation &lt;vs&gt; Pulumi</title>");
    expect(xml).toContain("&quot;It depends&quot; &amp; here&apos;s why.");
    expect(xml).toContain("<category>IaC &amp; more</category>");
    expect(xml).toContain("<description>Notes &amp; news</description>");
    expect(xml).not.toContain("<vs>");
  });

  it("dates items in the RFC 822 form feed readers expect", () => {
    expect(buildFeed(posts(), site)).toContain("<pubDate>Tue, 15 Sep 2026 12:00:00 GMT</pubDate>");
  });

  it("limits the number of items", () => {
    const many = parsePosts(
      Array.from({ length: 5 }, (_, i) => ({
        _id: `p${i}`,
        title: `Post ${i}`,
        slug: `post-${i}`,
        excerpt: "x",
        publishedAt: "2026-09-15T12:00:00Z",
        body: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Body." }] }],
      }))
    );
    expect(buildFeed(many, site, 2).match(/<item>/g)).toHaveLength(2);
  });

  it("is still a valid, empty feed when there are no posts", () => {
    const xml = buildFeed([], site);
    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
  });
});
