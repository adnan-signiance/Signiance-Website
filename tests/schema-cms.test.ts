import { describe, expect, it } from "vitest";
import { blogPostingSchema, jsonLdGraph } from "@/lib/schema";
import { socialImage } from "@/lib/content/images";
import { parsePosts } from "@/lib/content/posts";

const post = (overrides: Record<string, unknown> = {}) =>
  parsePosts([
    {
      _id: "p1",
      title: "A post",
      slug: "a-post",
      excerpt: "Summary",
      publishedAt: "2026-09-15T12:00:00Z",
      _updatedAt: "2026-09-20T09:00:00Z",
      categories: ["AWS", "DevOps"],
      author: { name: "Dana Reyes" },
      cover: { src: "https://cdn.sanity.io/images/p/production/c-1730x909.webp", alt: "", width: 1730, height: 909 },
      body: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Body." }] }],
      ...overrides,
    },
  ])[0];

describe("jsonLdGraph", () => {
  // Titles and excerpts now come from the CMS. A "</script>" in one must not be
  // able to end the structured-data tag and run what follows it.
  it("cannot be broken out of a script tag by text from the CMS", () => {
    const json = jsonLdGraph({ headline: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(json).toContain(String.fromCharCode(92) + "u003c");
    expect(JSON.parse(json)["@graph"][0].headline).toBe("</script><script>alert(1)</script>");
  });
});

describe("blogPostingSchema", () => {
  it("describes the article, with the author as a person", () => {
    const s = blogPostingSchema(post());
    expect(s["@type"]).toBe("BlogPosting");
    expect(s.headline).toBe("A post");
    expect(s.url).toMatch(/\/blog\/a-post$/);
    expect(s.datePublished).toBe("2026-09-15T12:00:00Z");
    expect(s.dateModified).toBe("2026-09-20T09:00:00Z");
    expect(s.author).toEqual({ "@type": "Person", name: "Dana Reyes" });
    expect(s.keywords).toBe("AWS, DevOps");
    expect(s.articleSection).toBe("AWS");
    expect(s.image).toContain("w=1200&h=630");
  });

  it("falls back to the organisation when a post names no author, and omits what it lacks", () => {
    const s = blogPostingSchema(post({ author: null, cover: null, categories: [] }));
    expect(s.author).toEqual({ "@id": expect.stringContaining("#organization") });
    expect("image" in s).toBe(false);
    expect("keywords" in s).toBe(false);
  });

  it("prefers the search description when there is one", () => {
    expect(blogPostingSchema(post({ seoDescription: "For search" })).description).toBe("For search");
  });
});

describe("socialImage", () => {
  it("crops CMS images to the 1200x630 social card size", () => {
    const url = new URL(socialImage("https://cdn.sanity.io/images/p/production/c-1730x909.webp?x=1"));
    expect(url.searchParams.get("w")).toBe("1200");
    expect(url.searchParams.get("h")).toBe("630");
    expect(url.searchParams.get("fit")).toBe("crop");
    expect(url.searchParams.has("x")).toBe(false);
  });

  it("leaves local images alone", () => {
    expect(socialImage("/media/case-healthcare.webp")).toBe("/media/case-healthcare.webp");
  });
});
