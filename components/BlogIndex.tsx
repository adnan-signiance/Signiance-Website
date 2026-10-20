import Link from "next/link";
import "../app/blog.css";
import PageShell from "./PageShell";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import BlogCard from "./BlogCard";
import CaseStudiesCTA from "./CaseStudiesCTA";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, jsonLdGraph, organizationSchema } from "@/lib/schema";
import type { BlogPost } from "@/lib/content/posts";

const pagePath = (page: number) => (page === 1 ? "/blog" : `/blog/page/${page}`);

/** One page of the post listing: /blog is page 1, /blog/page/N is the rest. */
export default function BlogIndex({ posts, page, pages }: { posts: BlogPost[]; page: number; pages: number }) {
  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ])
        )}
      />

      <section
        style={{
          position: "relative",
          padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <SectionEyebrow rise={0}>{page === 1 ? "Blog" : `Blog · Page ${page}`}</SectionEyebrow>
        <HeroHeading
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: "16px 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          Field notes on shipping cloud infrastructure and production AI
        </HeroHeading>
        <p
          className="hero-rise hero-d1"
          style={{ maxWidth: 540, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}
        >
          Writing from the engagements we run, not theory: AWS, DevOps and getting AI into production.
        </p>
        <div className="blog-hero-links hero-rise hero-d2">
          <Link href="/blog/feed.xml">RSS feed</Link>
          <Link href="/case-studies">See the outcomes we have delivered</Link>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="blog-grid" data-count={Math.min(posts.length, 3)}>
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} priority={page === 1 && i < 3} />
          ))}
        </div>

        {pages > 1 && (
          <nav className="blog-pager" aria-label="Blog pages">
            {page > 1 ? (
              <Link href={pagePath(page - 1)} rel="prev">
                <span aria-hidden="true">←</span> Newer posts
              </Link>
            ) : (
              <span className="blog-pager-spacer" />
            )}
            <span aria-current="page">
              Page {page} of {pages}
            </span>
            {page < pages ? (
              <Link href={pagePath(page + 1)} rel="next">
                Older posts <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="blog-pager-spacer" />
            )}
          </nav>
        )}
        <CornerDots />
      </section>

      <CaseStudiesCTA />
    </PageShell>
  );
}
