import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import MetricsGrid from "./MetricsGrid";
import { caseStudyEntries } from "@/lib/data";

export default function CaseStudiesHero() {
  const featured = caseStudyEntries.find((c) => c.slug === "scaling-engineering-simulations-with-cloud-hpc")!;

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <SectionEyebrow>Case Studies</SectionEyebrow>
      <h1
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(29px, 4.4vw, 46px)",
          lineHeight: 1.05,
          letterSpacing: "-0.038em",
          margin: "16px 0 0",
          maxWidth: "20ch",
          textWrap: "balance",
        }}
      >
        The work behind the numbers
      </h1>
      <p style={{ maxWidth: 540, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
        Every engagement below shipped to production and was measured against a number the client cared
        about, not a vanity metric.
      </p>

      <MetricsGrid bordered style={{ marginTop: 40, marginBottom: 48 }} />

      <div style={{ position: "relative", margin: "0 var(--bleed)", borderTop: "2px solid #193DAA" }}>
        <CornerDots position="top" />
        <Link
          href={`/case-studies/${featured.slug}`}
          data-transition="none"
          style={{
            position: "relative",
            display: "block",
            overflow: "hidden",
            background: "#0D184A",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt=""
            style={{ display: "block", width: "100%", height: 380, objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(13,24,74,0.88) 0%, rgba(13,24,74,0.6) 28%, rgba(13,24,74,0.1) 48%, rgba(13,24,74,0) 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 40px",
              maxWidth: 620,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#193DAA",
                  padding: "6px 12px",
                  borderRadius: 999,
                }}
              >
                Featured
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#A9B8E4",
                }}
              >
                {featured.industry}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 32,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: "12px 0 0",
                color: "#FFFFFF",
                textWrap: "balance",
              }}
            >
              {featured.title}
            </h2>
            <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "#C7CEE6", maxWidth: "48ch" }}>
              {featured.teaser}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
              {featured.statValue && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 26, color: "#FFFFFF" }}>
                    {featured.statValue}
                  </span>
                  <span style={{ fontSize: 12.5, color: "#A9B8E4" }}>{featured.statLabel}</span>
                </div>
              )}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#FFFFFF" }}>
                Read the full story
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
