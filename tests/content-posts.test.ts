import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  POSTS_PER_PAGE,
  formatPostDate,
  pageCount,
  pageOf,
  parsePosts,
  readingMinutes,
  relatedPosts,
  type BlogPost,
  type PortableNode,
  type RawPost,
} from "@/lib/content/posts";

const para = (text: string): PortableNode => ({
  _type: "block",
  style: "normal",
  children: [{ _type: "span", text }],
});

const words = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(" ");

function rawPost(n: number, overrides: Partial<RawPost> = {}): RawPost {
  return {
    _id: `post-${n}`,
    title: `Post ${n}`,
    slug: `post-${n}`,
    excerpt: `Summary ${n}`,
    publishedAt: new Date(Date.UTC(2026, 9, 30 - n)).toISOString(),
    _updatedAt: "2026-10-31T10:00:00Z",
    categories: ["AWS"],
    body: [para(words(300))],
    ...overrides,
  };
}

const many = (count: number) => parsePosts(Array.from({ length: count }, (_, i) => rawPost(i + 1)));

describe("readingMinutes", () => {
  it("rounds to the nearest minute at about 220 words a minute, and never says zero", () => {
    expect(readingMinutes([para(words(5))])).toBe(1);
    expect(readingMinutes([para(words(220))])).toBe(1);
    expect(readingMinutes([para(words(660))])).toBe(3);
    expect(readingMinutes([para(words(1100))])).toBe(5);
    expect(readingMinutes([])).toBe(1);
  });

  it("counts prose only, not images or code", () => {
    const body: PortableNode[] = [
      para(words(220)),
      { _type: "image", src: "https://cdn.sanity.io/x.webp" },
      { _type: "code", code: words(5000) },
    ];
    expect(readingMinutes(body)).toBe(1);
  });
});

describe("parsePosts", () => {
  it("maps a document, including its author, cover and topics", () => {
    const [post] = parsePosts([
      rawPost(1, {
        author: { name: " Dana Reyes ", role: "Architect", image: null },
        cover: { src: "https://cdn.sanity.io/c.webp", alt: " A chart ", width: 1730, height: 909 },
        categories: ["AWS", " ", "DevOps"],
        seoTitle: "  ",
        seoDescription: "Custom description",
      }),
    ]);

    expect(post.author).toEqual({ name: "Dana Reyes", role: "Architect", image: null });
    expect(post.cover).toEqual({ src: "https://cdn.sanity.io/c.webp", alt: "A chart", width: 1730, height: 909 });
    expect(post.categories).toEqual(["AWS", "DevOps"]);
    expect(post.seoTitle).toBeNull();
    expect(post.seoDescription).toBe("Custom description");
    expect(post.updatedAt).toBe("2026-10-31T10:00:00Z");
    expect(post.readingMinutes).toBe(1);
  });

  it("allows a post with no author and no cover", () => {
    const [post] = parsePosts([rawPost(1, { author: null, cover: null })]);
    expect(post.author).toBeNull();
    expect(post.cover).toBeNull();
  });

  it("ignores a cover that arrived without its dimensions rather than rendering it broken", () => {
    const [post] = parsePosts([rawPost(1, { cover: { src: "https://cdn.sanity.io/c.webp", width: null, height: null } })]);
    expect(post.cover).toBeNull();
  });

  it("reports every problem at once, naming the post", () => {
    const bad = [
      rawPost(1, { excerpt: "", body: [] }),
      rawPost(2, { publishedAt: "yesterday-ish" }),
      rawPost(3, { slug: "post-4" }),
      rawPost(4),
    ];
    try {
      parsePosts(bad);
      throw new Error("should have thrown");
    } catch (error) {
      const message = String((error as Error).message);
      expect(message).toContain('"Post 1": excerpt is empty');
      expect(message).toContain('"Post 1": the body is empty');
      expect(message).toContain("not a valid date");
      expect(message).toContain("used by more than one post");
    }
  });
});

describe("pagination", () => {
  it("shows twelve to a page", () => {
    expect(POSTS_PER_PAGE).toBe(12);
    const posts = many(28);
    expect(pageCount(posts)).toBe(3);
    expect(pageOf(posts, 1)).toHaveLength(12);
    expect(pageOf(posts, 3)).toHaveLength(4);
    expect(pageOf(posts, 2)[0].slug).toBe("post-13");
  });

  it("always has at least one page, even with no posts", () => {
    expect(pageCount([])).toBe(1);
    expect(pageCount(many(12))).toBe(1);
    expect(pageCount(many(13))).toBe(2);
  });
});

describe("relatedPosts", () => {
  const posts: BlogPost[] = parsePosts([
    rawPost(1, { categories: ["AWS", "DevOps"] }),
    rawPost(2, { categories: ["Cloud"] }),
    rawPost(3, { categories: ["DevOps"] }),
    rawPost(4, { categories: ["Generative AI"] }),
    rawPost(5, { categories: ["AWS"] }),
  ]);

  it("prefers posts that share a topic, then the newest", () => {
    expect(relatedPosts(posts, posts[0], 3).map((p) => p.slug)).toEqual(["post-3", "post-5", "post-2"]);
  });

  it("never includes the post itself", () => {
    expect(relatedPosts(posts, posts[0], 10).some((p) => p.id === posts[0].id)).toBe(false);
  });
});

describe("formatPostDate", () => {
  it("is fixed to UTC and a fixed locale, so server and browser always agree", () => {
    expect(formatPostDate("2026-10-15T23:30:00Z")).toBe("15 Oct 2026");
    expect(formatPostDate("2026-01-01T00:00:00Z")).toBe("1 Jan 2026");
  });
});

describe("getPosts", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("is empty with no CMS configured, which keeps /blog on its coming-soon page", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { getPosts, getPost } = await import("@/lib/content/posts");
    expect(await getPosts()).toEqual([]);
    expect(await getPost("anything")).toBeUndefined();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reads and parses posts from Sanity", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ result: [rawPost(1), rawPost(2)] }) })
    );

    const { getPosts, getPost } = await import("@/lib/content/posts");
    expect((await getPosts()).map((p) => p.slug)).toEqual(["post-1", "post-2"]);
    expect((await getPost("post-2"))?.title).toBe("Post 2");
  });

  it("treats a null result as no posts rather than crashing", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ result: null }) }));

    const { getPosts } = await import("@/lib/content/posts");
    expect(await getPosts()).toEqual([]);
  });
});
