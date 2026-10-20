import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/BlogPostView";
import { getPost, getPosts, relatedPosts } from "@/lib/content/posts";
import { socialImage } from "@/lib/content/images";

// A slug that is not a published post is a 404, not an on-demand render.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const card = post.cover ? socialImage(post.cover.src) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Signiance`,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(post.author ? { authors: [post.author.name] } : {}),
      ...(post.categories.length > 0 ? { tags: post.categories } : {}),
      ...(card ? { images: [{ url: card, alt: post.cover?.alt || post.title }] } : {}),
    },
    twitter: {
      card: card ? "summary_large_image" : "summary",
      title: `${title} · Signiance`,
      description,
      ...(card ? { images: [card] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [all, post] = await Promise.all([getPosts(), getPost(slug)]);
  if (!post) notFound();

  return <BlogPostView post={post} related={relatedPosts(all, post)} />;
}
