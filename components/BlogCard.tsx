import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type BlogPost } from "@/lib/content/posts";

/**
 * One post in the listing. The title link stretches over the whole card (see
 * blog.css). `heading` is h2 on the blog list (straight under the page's h1) and h3
 * where the cards sit under a section heading of their own, so levels never skip.
 */
export default function BlogCard({
  post,
  priority = false,
  heading: Heading = "h2",
}: {
  post: BlogPost;
  priority?: boolean;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="blog-card">
      <div className="blog-card-media">
        {post.cover ? (
          // Decorative: the title beside it already says what the post is about.
          <Image
            src={post.cover.src}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        ) : (
          <div className="blog-card-fallback" aria-hidden="true">
            <span className="plus-mark" />
          </div>
        )}
      </div>
      <div className="blog-card-body">
        {post.categories[0] && <div className="blog-card-cat">{post.categories[0]}</div>}
        <Heading className="blog-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          {" · "}
          {post.readingMinutes} min read
        </div>
      </div>
    </article>
  );
}
