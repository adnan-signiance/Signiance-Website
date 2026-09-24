"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { useGridIntersectionDots, GridDotsOverlay } from "./useGridIntersectionDots";
import { caseStudyEntries, caseStudyFilters } from "@/lib/data";

export default function CaseStudiesGrid() {
  const [filter, setFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visibleCases = caseStudyEntries.filter((c) => filter === "All" || c.category === filter);
  const dots = useGridIntersectionDots(gridRef, ".cs-listing-cell", [visibleCases.length]);

  return (
    <section
      id="featured"
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Engagements</SectionEyebrow>
          </div>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "-0.038em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            All engagements
          </h2>
        </div>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div className="cs-filter-rail" style={{ marginTop: 24, marginBottom: 30 }}>
        {caseStudyFilters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cs-filter-chip${active ? " is-active" : ""}`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {visibleCases.length === 0 && (
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#6A6D71" }}>
          No case studies in this category yet. Check back soon.
        </p>
      )}

      <div className="grid-cs-listing" ref={gridRef}>
        <GridDotsOverlay dots={dots} />
        {visibleCases.map((cs) => (
          <div key={cs.id} className="cs-listing-cell">
            <div className="case-cell-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.image} alt="" className="case-cell-bg" />
              <div className="case-cell-scrim" />
              <Link href={`/case-studies/${cs.slug}`} className="case-cell-overlay" data-transition="none">
                <div className="case-cell-bottom-row">
                  <div>
                    <div className="case-cell-tag">{cs.tag}</div>
                    <h3 className="case-cell-title" style={{ fontSize: 21 }}>
                      {cs.title}
                    </h3>
                    <p className="case-cell-body">{cs.teaser}</p>
                    {cs.statValue && (
                      <div className="case-cell-stat">
                        <span className="case-cell-stat-value">{cs.statValue}</span>
                        <span className="case-cell-stat-label">{cs.statLabel}</span>
                      </div>
                    )}
                  </div>
                  <span className="case-cell-cta">
                    <span className="case-cell-cta-arrow-in">
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                        <path d="M3 2.5 7 6 3 9.5" stroke="#131417" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>View case study</span>
                    <span className="case-cell-cta-arrow-out">
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                        <path d="M3 2.5 7 6 3 9.5" stroke="#131417" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
