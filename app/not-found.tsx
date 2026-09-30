import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
            fontSize: "clamp(96px, 17vw, 200px)",
            lineHeight: 0.9,
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-accent)",
          }}
        >
          404
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
          This page shipped somewhere else.
        </h1>
        <p style={{ maxWidth: 460, margin: "16px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
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
