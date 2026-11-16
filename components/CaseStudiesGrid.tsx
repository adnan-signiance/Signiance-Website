"use client";

import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { hasCasePhoto } from "@/lib/caseMedia";
import { caseStudyFilters, type CaseStudyEntry } from "@/lib/data";

export default function CaseStudiesGrid({ entries }: { entries: CaseStudyEntry[] }) {
  const [filter, setFilter] = useState("All");

  const visibleCases = entries.filter((c) => filter === "All" || c.category === filter);

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

      <RevealGroup className="cs-cards" stagger={0.07}>
        {visibleCases.map((cs) => {
          const photo = hasCasePhoto(cs.image);
          return (
            <RevealItem key={cs.id}>
              <Link href={`/case-studies/${cs.slug}`} className="cs-card">
                {/* A study with a photograph shows it; one without shows its result on a flat field. */}
                <span className={photo ? "cs-card-media" : "cs-card-media cs-card-media--plain"}>
                  {photo ? (
                    <Image src={cs.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  ) : (
                    <span className="cs-card-figure">{cs.statValue ?? cs.industry}</span>
                  )}
                </span>
                <span className="cs-card-meta">
                  {cs.industry} · {cs.category}
                </span>
                <h3 className="cs-card-title">{cs.title}</h3>
                <p className="cs-card-body">{cs.teaser}</p>
                {cs.statValue && (
                  <p className="cs-card-stat">
                    <strong>{cs.statValue}</strong> {cs.statLabel}
                  </p>
                )}
                <span className="cs-card-more">
                  View case study <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <CornerDots />
    </section>
  );
}
