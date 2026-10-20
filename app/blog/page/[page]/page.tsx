import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/BlogIndex";
import { getPosts, pageCount, pageOf } from "@/lib/content/posts";

// Only the pages that exist are generated; anything else is a 404, not a render.
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = pageCount(await getPosts());
  // Page 1 is /blog itself.
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog, page ${page}`,
    description: "Field notes on shipping cloud infrastructure and production AI.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPageN({ params }: { params: Promise<{ page: string }> }) {
  const { page: raw } = await params;
  const posts = await getPosts();
  const pages = pageCount(posts);
  const page = Number(raw);

  if (!Number.isInteger(page) || page < 2 || page > pages) notFound();

  return <BlogIndex posts={pageOf(posts, page)} page={page} pages={pages} />;
}
