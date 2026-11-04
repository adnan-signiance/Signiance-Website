import Image from "next/image";
import "../app/blog.css";
import PageShell from "./PageShell";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import BlogCard from "./BlogCard";
import CaseStudiesCTA from "./CaseStudiesCTA";
import PortableText from "./PortableText";
import JsonLd from "./JsonLd";
import { RevealHeading } from "./Reveal";
import { blogPostingSchema, breadcrumbSchema, jsonLdGraph, organizationSchema } from "@/lib/schema";
import { formatPostDate, type BlogPost } from "@/lib/content/posts";

export default function BlogPostView({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />

      <article>
        <section
          style={{
            position: "relative",
            padding: "clamp(32px, 5vw, 48px) var(--pad-x) clamp(28px, 4vw, 40px)",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <SectionEyebrow rise={0}>{post.categories[0] ?? "Blog"}</SectionEyebrow>
          <HeroHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h1)",
              lineHeight: 1.08,
              letterSpacing: "var(--tracking-tight)",
              margin: "16px 0 0",
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            {post.title}
          </HeroHeading>
          <div className="post-meta hero-rise hero-d1">
            {post.author && <strong>{post.author.name}</strong>}
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span>{post.readingMinutes} min read</span>
          </div>
          <CornerDots />
        </section>

        <section className="post-body">
          {post.cover && (
            // Shown whole, at its own proportions: cover images here are banners with
            // the title set into them, and a crop would cut the lettering.
            <div className="post-cover" style={{ aspectRatio: `${post.cover.width} / ${post.cover.height}` }}>
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 960px"
              />
            </div>
          )}
          <PortableText value={post.body} />

          <footer className="post-footer">
            {post.author && (
              <div className="post-author">
                {post.author.image && <Image src={post.author.image} alt="" width={44} height={44} />}
                <div>
                  <div className="post-author-name">{post.author.name}</div>
                  {post.author.role && <div className="post-author-role">{post.author.role}</div>}
                </div>
              </div>
            )}
            {post.categories.length > 0 && (
              <ul className="post-tags" aria-label="Topics" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {post.categories.map((c) => (
                  <li key={c} className="post-tag">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </footer>
          <CornerDots />
        </section>
      </article>

      {related.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
          <div className="section-head">
            <div className="section-head-main">
              <SectionEyebrow>Keep reading</SectionEyebrow>
              <RevealHeading
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--fs-h2)",
                  lineHeight: 1.04,
                  letterSpacing: "var(--tracking-tight)",
                  margin: "18px 0 0",
                  textWrap: "balance",
                }}
              >
                More field notes
              </RevealHeading>
            </div>
          </div>
          <div className="section-rule" />
          <div className="blog-grid" data-count={Math.min(related.length, 3)} style={{ marginTop: 24 }}>
            {related.map((p) => (
              <BlogCard key={p.id} post={p} heading="h3" />
            ))}
          </div>
          <CornerDots />
        </section>
      )}

      <CaseStudiesCTA />
    </PageShell>
  );
}
