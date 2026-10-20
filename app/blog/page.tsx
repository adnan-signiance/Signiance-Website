import type { Metadata } from "next";
import BlogComingSoon from "@/components/BlogComingSoon";
import BlogIndex from "@/components/BlogIndex";
import { getPosts, pageCount, pageOf } from "@/lib/content/posts";

const DESCRIPTION = "Field notes on shipping cloud infrastructure and production AI.";

export async function generateMetadata(): Promise<Metadata> {
  const live = (await getPosts()).length > 0;

  return {
    title: "Blog",
    description: live ? DESCRIPTION : `${DESCRIPTION.slice(0, -1)}, coming soon.`,
    // With no posts this is a placeholder, and thin content that is indexable
    // drags on site quality, so it is kept out of the index (and out of
    // sitemap.ts) until the first post is published. Both flip on their own then.
    ...(live ? {} : { robots: { index: false, follow: true } }),
    alternates: {
      canonical: "/blog",
      ...(live ? { types: { "application/rss+xml": "/blog/feed.xml" } } : {}),
    },
  };
}

export default async function BlogPage() {
  const posts = await getPosts();
  if (posts.length === 0) return <BlogComingSoon />;

  return <BlogIndex posts={pageOf(posts, 1)} page={1} pages={pageCount(posts)} />;
}
