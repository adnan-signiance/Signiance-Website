import Link from "next/link";
import PageShell from "@/components/PageShell";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";

export default function NotFound() {
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
            fontSize: "clamp(96px, 17vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#193DAA",
          }}
        >
          404
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
          This page shipped somewhere else.
        </h1>
        <p style={{ maxWidth: 460, margin: "16px auto 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
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
          <Link href="/" className="btn-hero-primary">
            <CtaArrow>Back to homepage</CtaArrow>
          </Link>
          <Link href="/case-studies" className="btn-hero-outline">
            <CtaArrow>See our work</CtaArrow>
          </Link>
        </div>
        <CornerDots />
      </section>
    </PageShell>
  );
}
