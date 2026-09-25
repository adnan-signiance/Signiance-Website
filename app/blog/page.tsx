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
          padding: "clamp(64px, 10vw, 110px) var(--pad-x) clamp(72px, 11vw, 120px)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            background: "#193DAA",
            borderRadius: 10,
            padding: "10px 22px",
          }}
        >
          Blog
        </span>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(30px, 4.6vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            margin: "22px auto 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          Field notes, coming soon
        </h1>
        <p style={{ maxWidth: 480, margin: "16px auto 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
          We&apos;re putting together writing on shipping cloud infrastructure and production AI, from the
          engagements we run, not theory. Check back soon, or see the outcomes we&apos;ve already delivered.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
          <Link href="/case-studies" className="btn-hero-primary">
            <CtaArrow>Browse Case Studies</CtaArrow>
          </Link>
        </div>
        <CornerDots />
      </section>
    </PageShell>
  );
}
