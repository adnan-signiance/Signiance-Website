import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { metrics } from "@/lib/data";

export default function CaseStudiesHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <SectionEyebrow>Proof</SectionEyebrow>
      <h1
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(29px, 4.4vw, 46px)",
          lineHeight: 1.05,
          letterSpacing: "-0.038em",
          margin: "14px 0 0",
          maxWidth: "18ch",
          textWrap: "balance",
        }}
      >
        Outcomes, not case-study theatre
      </h1>
      <p style={{ maxWidth: 540, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
        Every engagement below shipped to production and was measured against a number the client cared
        about — not a vanity metric.
      </p>

      <div
        className="grid-cs-metrics"
        style={{
          marginTop: 44,
          borderTop: "1px solid #C7CEE6",
        }}
      >
        {metrics.map((m) => (
          <div key={m.label} style={{ padding: "18px 22px 22px 0", borderRight: "1px solid #E2E0DA" }}>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(30px, 3.4vw, 40px)",
                letterSpacing: "-0.045em",
                lineHeight: 1,
                color: "#193DAA",
              }}
            >
              {m.value}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "#43464A", maxWidth: "20ch" }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/case-studies/making-pathology-reports-easier-to-understand"
        style={{
          position: "relative",
          display: "block",
          margin: "40px -28px 0",
          overflow: "hidden",
          background: "#0D184A",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/light-01.png"
          alt=""
          style={{ display: "block", width: "100%", height: 380, objectFit: "cover", opacity: 0.5 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #0D184A 0%, rgba(13,24,74,0.72) 46%, rgba(13,24,74,0.1) 100%)",
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
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#A9B8E4",
            }}
          >
            Featured · Healthcare
          </span>
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
            Making pathology reports easier to understand
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "#C7CEE6", maxWidth: "48ch" }}>
            AI-powered analysis that turns complex pathology reports into clearer, structured insights — read
            by clinicians in a fraction of the time.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 26, color: "#FFFFFF" }}>
                80%
              </span>
              <span style={{ fontSize: 12.5, color: "#A9B8E4" }}>faster report review</span>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#FFFFFF" }}>
              Read the full story
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      <CornerDots />
    </section>
  );
}
