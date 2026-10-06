import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import CaseStudies from "./CaseStudies";
import { Reveal, RevealHeading } from "./Reveal";

export default function CaseStudiesSection() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Case Studies</SectionEyebrow>
          </Reveal>
          <RevealHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-tight)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Built. Shipped. Proven.
          </RevealHeading>
        </div>
        <Link href="/case-studies" className="btn-primary">
          <span className="btn-primary-arrow-in">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-tint)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="btn-primary-label">See all case studies</span>
          <span className="btn-primary-arrow-out">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-tint)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      <div className="section-rule" />

      <div style={{ marginTop: 24 }}>
        <CaseStudies />
      </div>

      <CornerDots />
    </section>
  );
}
