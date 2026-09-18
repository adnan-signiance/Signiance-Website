"use client";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { caseStudyEntries, caseStudyFilters } from "@/lib/data";

export default function CaseStudiesGrid() {
  const [filter, setFilter] = useState("All");

  const visibleCases = caseStudyEntries.filter((c) => filter === "All" || c.category === filter);

  return (
    <section
      id="featured"
      style={{
        position: "relative",
        padding: "clamp(38px, 5vw, 54px) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 24, letterSpacing: "-0.025em", margin: 0 }}>
          All engagements
        </h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {caseStudyFilters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: `1px solid ${active ? "#193DAA" : "#D6D3CB"}`,
                  background: active ? "#193DAA" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#43464A",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .18s ease",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {visibleCases.length === 0 && (
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "#6A6D71" }}>
          No case studies in this category yet — check back soon.
        </p>
      )}

      <div className="grid-cs-cards">
        {visibleCases.map((cs) => {
          const bg = cs.dark ? "#0D184A" : "#FFFFFF";
          const tagColor = cs.dark ? "#A9B8E4" : "#6A6D71";
          const titleColor = cs.dark ? "#FFFFFF" : "#131417";
          const bodyColor = cs.dark ? "#C9C6C0" : "#43464A";
          const statColor = cs.dark ? "#A9B8E4" : "#193DAA";

          return (
            <div
              key={cs.id}
              className="cs-card"
              style={{ border: "1px solid #D6D3CB", borderRadius: 14, overflow: "hidden", background: bg, display: "flex", flexDirection: "column" }}
            >
              <div style={{ overflow: "hidden", height: 200 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="cs-img" src={cs.image} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tagColor }}>{cs.tag}</span>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, color: "#A29E96" }}>{cs.no} / 04</span>
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 21, letterSpacing: "-0.025em", margin: 0, color: titleColor }}>
                  {cs.title}
                </h3>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: bodyColor }}>{cs.teaser}</p>

                {cs.statValue && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 19, color: statColor }}>
                      {cs.statValue}
                    </span>
                    <span style={{ fontSize: 12, color: bodyColor }}>{cs.statLabel}</span>
                  </div>
                )}

                <Link
                  href={`/case-studies/${cs.slug}`}
                  style={{
                    marginTop: "auto",
                    paddingTop: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: titleColor,
                    fontFamily: "Geist, sans-serif",
                  }}
                >
                  Read case study
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <CornerDots />
    </section>
  );
}
