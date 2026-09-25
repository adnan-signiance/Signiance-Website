import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";

export const metadata: Metadata = {
  title: "Blog · Signiance",
  description: "Field notes on shipping cloud infrastructure and production AI, coming soon.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <section
        style={{
          position: "relative",
          padding: "clamp(64px, 12vw, 130px) var(--pad-x)",
          textAlign: "center",
          borderBottom: "1px solid #E2E0DA",
        }}
      >
        <div
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 9vw, 108px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#193DAA",
            textWrap: "balance",
          }}
        >
          Coming Soon
        </div>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "var(--fs-h1)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            margin: "12px 0 0",
            textWrap: "balance",
          }}
        >
          Field notes on shipping cloud infrastructure and production AI
        </h1>
        <p style={{ maxWidth: 460, margin: "16px auto 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
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
