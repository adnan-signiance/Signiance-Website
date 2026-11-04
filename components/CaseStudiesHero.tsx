import Image from "next/image";
import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import { Reveal } from "./Reveal";
import CtaArrow from "./CtaArrow";
import MetricsGrid from "./MetricsGrid";
import type { CaseStudyEntry } from "@/lib/data";

export default function CaseStudiesHero({ featured }: { featured?: CaseStudyEntry }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="hero-split">
        <div>
          <SectionEyebrow rise={0}>Case Studies</SectionEyebrow>
          <HeroHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h1)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tight)",
              margin: "16px 0 0",
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            The work behind the numbers
          </HeroHeading>
          <p className="hero-rise hero-d1" style={{ maxWidth: 540, margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-text)" }}>
            Every engagement below shipped to production and was measured against a number the client cared
            about, not a vanity metric.
          </p>
        </div>
        <div className="hero-art hero-rise hero-d2">
          <Image src="/media/case-studies-hero.webp" alt="" fill priority sizes="320px" style={{ objectFit: "cover" }} />
        </div>
      </div>

      <MetricsGrid bordered style={{ marginTop: 40, marginBottom: 48 }} />

      {featured && (
        <Reveal style={{ position: "relative", margin: "0 var(--bleed)" }}>
          <Link
            href={`/case-studies/${featured.slug}`}
            style={{
              position: "relative",
              display: "block",
              overflow: "hidden",
              background: "var(--color-navy)",
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
                background:
                  "linear-gradient(100deg, rgba(6,12,42,0.96) 0%, rgba(10,19,64,0.86) 30%, rgba(13,24,74,0.4) 52%, rgba(13,24,74,0) 74%), linear-gradient(0deg, rgba(6,12,42,0.55) 0%, rgba(6,12,42,0) 45%)",
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
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <SectionEyebrow>Featured</SectionEyebrow>
                <span
                  style={{
                    fontSize: "var(--fs-xs)",
                    letterSpacing: "var(--tracking-wide)",
                    textTransform: "uppercase",
                    color: "var(--color-on-dark-muted)",
                  }}
                >
                  {featured.industry}
                </span>
              </div>
              <h2
                className="cs-featured-title"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--fs-h2)",
                  lineHeight: 1.12,
                  letterSpacing: "var(--tracking-snug)",
                  margin: "14px 0 0",
                  color: "var(--color-white)",
                  textWrap: "balance",
                }}
              >
                {featured.title}
              </h2>
              <p style={{ margin: "12px 0 0", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-accent-faint)", maxWidth: "48ch" }}>
                {featured.teaser}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
                {featured.statValue && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h3)", color: "var(--color-white)" }}>
                      {featured.statValue}
                    </span>
                    <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-on-dark-muted)" }}>{featured.statLabel}</span>
                  </div>
                )}
                <span className="btn-hero-primary">
                  <CtaArrow>Read the full story</CtaArrow>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      )}
    </section>
  );
}
