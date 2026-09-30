"use client";

import { useRef } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { services } from "@/lib/data";

// Named grid-template-areas below (not a uniform 3-column repeat): the first
// practice spans the first two columns of row 1, everything else is one cell.
const AREAS = ["a", "b", "c", "d", "e"];
// Last cell in each row needs its own border-right dropped so the
// container's primary-blue edge (drawn via ::before) isn't hidden behind it.
const EDGE_INDEXES = [1, 4];

export default function Services() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="services"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
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
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-tight)",
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

      <div className="section-rule" />

      <div className="grid-services" ref={gridRef} style={{ marginTop: 24 }}>
        {services.map((sv, i) => {
          const wide = i === 0;
          const edge = EDGE_INDEXES.includes(i);
          return (
            <Link
              key={sv.id}
              // Each cell goes to its own practice page. These all pointed at
              // #contact, so clicking any of the five dropped the visitor at the
              // booking form instead of the thing they asked about — and left the
              // five detail pages with no internal links from the homepage.
              href={`/services/${sv.slug}`}
              className={`grid-services-cell${wide ? " grid-services-cell--wide" : ""}${edge ? " grid-services-cell--edge" : ""}`}
              style={{ gridArea: AREAS[i] }}
            >
              <span className="grid-services-num">{sv.no}</span>
              <h3 className="grid-services-title">{sv.title}</h3>
              <p className="grid-services-body">{sv.body}</p>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="grid-services-arrow">
                <path d="M4 3 8 7 4 11" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })}
      </div>

      <CornerDots />
    </section>
  );
}
