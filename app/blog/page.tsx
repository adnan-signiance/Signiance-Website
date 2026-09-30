import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";

export const metadata: Metadata = {
  title: "Blog",
  description: "Field notes on shipping cloud infrastructure and production AI, coming soon.",
  // Placeholder page with no articles yet. Thin content that is indexable drags
  // on site quality, so it is kept out of the index — and out of sitemap.ts —
  // until there is something here worth ranking. Remove both when it launches.
  robots: { index: false, follow: true },
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageShell>
      <section
        style={{
          position: "relative",
          padding: "clamp(64px, 12vw, 130px) var(--pad-x)",
          textAlign: "center",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(48px, 9vw, 108px)",
            lineHeight: 0.9,
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-accent)",
            textWrap: "balance",
          }}
        >
          Coming Soon
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-h1)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: "12px 0 0",
            textWrap: "balance",
          }}
        >
          Field notes on shipping cloud infrastructure and production AI
        </h1>
        <p style={{ maxWidth: 460, margin: "16px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
          We&apos;re putting together writing from the engagements we run, not theory. Check back soon, or see
          the outcomes we&apos;ve already delivered.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: "clamp(24px, 4vw, 32px)",
            flexWrap: "wrap",
          }}
        >
          <Link href="/case-studies" className="btn-hero-primary">
            <CtaArrow>Browse Case Studies</CtaArrow>
          </Link>
          <Link href="/" className="btn-hero-outline">
            <CtaArrow>Back to homepage</CtaArrow>
          </Link>
        </div>
        <CornerDots />
      </section>
    </PageShell>
  );
}
