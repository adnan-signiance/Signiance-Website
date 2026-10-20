import { CmsError, memoizeForBuild, sanityConfig, sanityFetch } from "@/lib/cms/sanity";

/**
 * Blog posts. Sanity is the only source: there is no bundled fallback, so a site
 * built without a CMS simply has no posts and /blog stays the "coming soon" page.
 */

// Portable Text, as Sanity stores it. Only the shapes the renderer understands
// are described; anything else is passed through as an unknown node and reported
// at render time rather than dropped without a word.
export type PortableMarkDef = { _key: string; _type: string; href?: string };

export type PortableSpan = { _type: "span"; _key?: string; text: string; marks?: string[] };

export type PortableBlock = {
  _type: "block";
  _key?: string;
  style?: string;
  children: PortableSpan[];
  markDefs?: PortableMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};

export type PortableImage = {
  _type: "image";
  _key?: string;
  src: string;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
  caption?: string | null;
};

export type PortableCode = {
  _type: "code";
  _key?: string;
  code: string;
  language?: string | null;
  filename?: string | null;
};

export type PortableTable = {
  _type: "table";
  _key?: string;
  rows: { _key?: string; cells: string[] }[];
};

export type PortableVideo = { _type: "youtube"; _key?: string; url: string };

export type PortableNode =
  | PortableBlock
  | PortableImage
  | PortableCode
  | PortableTable
  | PortableVideo
  | { _type: string; _key?: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** ISO 8601. */
  publishedAt: string;
  updatedAt: string | null;
  author: { name: string; role: string | null; image: string | null } | null;
  categories: string[];
  cover: { src: string; alt: string; width: number; height: number } | null;
  body: PortableNode[];
  readingMinutes: number;
  seoTitle: string | null;
  seoDescription: string | null;
};

export const POSTS_PER_PAGE = 12;

const QUERY = /* groq */ `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  categories,
  seoTitle,
  seoDescription,
  "author": author->{ name, role, "image": image.asset->url },
  "cover": coverImage{
    alt,
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  body[]{
    ...,
    _type == "image" => {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
}`;

export type RawPost = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  _updatedAt?: string | null;
  categories?: (string | null)[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  author?: { name?: string | null; role?: string | null; image?: string | null } | null;
  cover?: { alt?: string | null; src?: string | null; width?: number | null; height?: number | null } | null;
  body?: PortableNode[] | null;
};

const clean = (v: string | null | undefined) => (typeof v === "string" ? v.trim() : "");

/** Words in the prose of a Portable Text body, for the "N min read" estimate. */
export function readingMinutes(body: PortableNode[]): number {
  let words = 0;
  for (const node of body) {
    if (node._type !== "block") continue;
    for (const span of (node as PortableBlock).children ?? []) {
      words += span.text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.round(words / 220));
}

export function parsePosts(raw: RawPost[]): BlogPost[] {
  const problems: string[] = [];

  const posts = raw.map((doc): BlogPost => {
    const title = clean(doc.title);
    const label = title || doc._id;
    const need = (field: string, value: string) => {
      if (value === "") problems.push(`"${label}": ${field} is empty`);
      return value;
    };

    const publishedAt = need("publishedAt", clean(doc.publishedAt));
    if (publishedAt && Number.isNaN(Date.parse(publishedAt))) {
      problems.push(`"${label}": publishedAt "${publishedAt}" is not a valid date`);
    }

    const body = Array.isArray(doc.body) ? doc.body : [];
    if (body.length === 0) problems.push(`"${label}": the body is empty`);

    const cover =
      doc.cover?.src && doc.cover.width && doc.cover.height
        ? { src: doc.cover.src, alt: clean(doc.cover.alt), width: doc.cover.width, height: doc.cover.height }
        : null;

    const author = doc.author?.name
      ? { name: clean(doc.author.name), role: clean(doc.author.role) || null, image: clean(doc.author.image) || null }
      : null;

    return {
      id: doc._id,
      slug: need("slug", clean(doc.slug)),
      title: need("title", title),
      excerpt: need("excerpt", clean(doc.excerpt)),
      publishedAt,
      updatedAt: clean(doc._updatedAt) || null,
      author,
      categories: (doc.categories ?? []).map(clean).filter(Boolean),
      cover,
      body,
      readingMinutes: readingMinutes(body),
      seoTitle: clean(doc.seoTitle) || null,
      seoDescription: clean(doc.seoDescription) || null,
    };
  });

  const slugs = new Set<string>();
  for (const p of posts) {
    if (p.slug && slugs.has(p.slug)) problems.push(`"${p.title}": slug "${p.slug}" is used by more than one post`);
    slugs.add(p.slug);
  }

  if (problems.length > 0) {
    throw new CmsError(`blog posts need fixing in Sanity before the site can build:\n  - ${problems.join("\n  - ")}`);
  }
  return posts;
}

export const getPosts = memoizeForBuild(async (): Promise<BlogPost[]> => {
  if (!sanityConfig()) return [];
  const raw = await sanityFetch<RawPost[] | null>(QUERY);
  return parsePosts(raw ?? []);
});

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export function pageCount(posts: BlogPost[]): number {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

export function pageOf(posts: BlogPost[], page: number): BlogPost[] {
  return posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
}

/** Posts to suggest after one: shared categories first, then the newest. */
export function relatedPosts(all: BlogPost[], current: BlogPost, limit = 3): BlogPost[] {
  const others = all.filter((p) => p.id !== current.id);
  const shared = others.filter((p) => p.categories.some((c) => current.categories.includes(c)));
  const rest = others.filter((p) => !shared.includes(p));
  return [...shared, ...rest].slice(0, limit);
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "15 Oct 2026". Fixed locale and zone so the server and the browser agree. */
export function formatPostDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}
