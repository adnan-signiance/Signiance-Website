import Link from "next/link";
import CornerDots from "./CornerDots";
import CaseStudies from "./CaseStudies";
import { getCaseStudies, pickHome } from "@/lib/content/caseStudies";
import { RevealHeading } from "./Reveal";

export default async function CaseStudiesSection() {
  const entries = pickHome(await getCaseStudies());

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
        <Link href="/case-studies" className="btn-primary cs-cta-head">
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

      <div style={{ marginTop: "clamp(24px, 3.4vw, 40px)" }}>
        <CaseStudies entries={entries} />
      </div>

      {/* On a phone the button moves from beside the title to the end of the cards, where
          "see more" belongs. Two copies, one hidden at each size, so neither layout has
          to reorder the other. */}
      <div className="cs-cta-foot">
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

      <CornerDots />
    </section>
  );
}
