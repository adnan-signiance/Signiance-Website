"use client";

import { useRef } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
import { useGridIntersectionDots, GridDotsOverlay } from "./useGridIntersectionDots";
import { services } from "@/lib/data";

// Named grid-template-areas below (not a uniform 3-column repeat), since the
// first practice spans both rows in column 1.
const AREAS = ["a", "b", "c", "d", "e"];

export default function Services() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dots = useGridIntersectionDots(gridRef, ".grid-services-cell", [services.length]);

  return (
    <section
      id="services"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Services</SectionEyebrow>
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
            Where Cloud becomes Agentic AI
          </h2>
        </div>
        <p className="section-head-note">
          Five practices, one senior team.
          <br />
          Scoped in a week, delivered against outcomes.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div className="grid-services" ref={gridRef} style={{ marginTop: 24 }}>
        <GridDotsOverlay dots={dots} />
        {services.map((sv, i) => {
          const accent = serviceColor[sv.id];
          const icon = serviceIcon[sv.id];
          const featured = i === 0;
          return (
            <a
              key={sv.id}
              href="#contact"
              className={`grid-services-cell${featured ? " grid-services-cell-featured" : ""}`}
              style={{
                gridArea: AREAS[i],
                ...(featured ? { background: `linear-gradient(160deg, ${accent} 0%, #193DAA 100%)` } : {}),
              }}
            >
              <span className="grid-services-num" style={{ color: featured ? "rgba(255,255,255,0.3)" : `${accent}30` }}>
                {sv.no}
              </span>
              <span
                className="grid-services-icon"
                style={{ background: featured ? "rgba(255,255,255,0.16)" : `${accent}17` }}
              >
                <PracticeIcon name={icon} color={featured ? "#FFFFFF" : accent} size={featured ? 22 : 19} />
              </span>
              <h3 className="grid-services-title">{sv.title}</h3>
              <p className="grid-services-body">{sv.body}</p>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="grid-services-arrow">
                <path
                  d="M4 3 8 7 4 11"
                  stroke={featured ? "#FFFFFF" : "#193DAA"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          );
        })}
      </div>

      <CornerDots />
    </section>
  );
}
