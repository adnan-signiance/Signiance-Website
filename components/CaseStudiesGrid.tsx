"use client";

import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { caseStudyEntries, caseStudyFilters } from "@/lib/data";

export default function CaseStudiesGrid() {
  const [filter, setFilter] = useState("All");

  const visibleCases = caseStudyEntries.filter((c) => filter === "All" || c.category === filter);

  return (
    <section
      id="featured"
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Engagements</SectionEyebrow>
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
            All engagements
          </RevealHeading>
        </div>
      </div>

      <div className="section-rule" />

      {/* Labelled group so the chips are announced as a related set rather than
          a run of unrelated buttons. */}
      <div
        className="cs-filter-rail"
        role="group"
        aria-label="Filter case studies by practice"
        style={{ marginTop: 24, marginBottom: 30 }}
      >
        {caseStudyFilters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              // Without this the active chip reads identically to the others:
              // its selected state was conveyed by colour alone.
              aria-pressed={active}
              className={`cs-filter-chip${active ? " is-active" : ""}`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Filtering changes the grid below without moving focus, so the new
          result count has to be announced for it to be perceivable. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`${visibleCases.length} ${visibleCases.length === 1 ? "case study" : "case studies"} shown${
          filter === "All" ? "" : ` for ${filter}`
        }`}
      </div>

      {visibleCases.length === 0 && (
        <p style={{ margin: "0 0 24px", fontSize: "var(--fs-base)", color: "var(--color-muted)" }}>
          No case studies in this category yet. Check back soon.
        </p>
      )}

      <RevealGroup className="grid-cs-listing" stagger={0.09}>
        {visibleCases.map((cs) => (
          <RevealItem key={cs.id} className="cs-listing-cell">
            <div className="case-cell-frame">
              <Image src={cs.image} alt="" fill className="case-cell-bg" sizes="(max-width: 900px) 100vw, 33vw" />
              <div className="case-cell-scrim" />
              <Link href={`/case-studies/${cs.slug}`} className="case-cell-overlay">
                <div className="case-cell-bottom-row">
                  <div>
                    <div className="case-cell-tag">{cs.tag}</div>
                    <h3 className="case-cell-title" style={{ fontSize: "var(--fs-xl)" }}>
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
                        <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>View case study</span>
                    <span className="case-cell-cta-arrow-out">
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                        <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <CornerDots />
    </section>
  );
}
