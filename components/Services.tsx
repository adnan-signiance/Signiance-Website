"use client";

import Link from "next/link";
import { m } from "motion/react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealHeading } from "./Reveal";
import { staggerItem } from "@/lib/motion";
import { services } from "@/lib/data";

// Each cell is a Next <Link>, so it is made a motion component once here, not on every render.
const MotionLink = m.create(Link);

// Named grid-template-areas below (not a uniform 3-column repeat): the first
// practice spans the first two columns of row 1, everything else is one cell.
const AREAS = ["a", "b", "c", "d", "e"];
// Last cell in each row needs its own border-right dropped so the
// container's primary-blue edge (drawn via ::before) isn't hidden behind it.
const EDGE_INDEXES = [1, 4];

export default function Services() {
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
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Services</SectionEyebrow>
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
            Where Cloud becomes Agentic AI
          </RevealHeading>
        </div>
        <Reveal as="p" className="section-head-note" delay={0.15}>
          Five practices, one senior team.
          <br />
          Scoped in a week, delivered against outcomes.
        </Reveal>
      </div>

      <div className="section-rule" />

      <RevealGroup className="grid-services" style={{ marginTop: 24 }} stagger={0.07} spotlight>
        {services.map((sv, i) => {
          const wide = i === 0;
          const edge = EDGE_INDEXES.includes(i);
          return (
            <MotionLink
              key={sv.id}
              variants={staggerItem}
              data-reveal=""
              data-spot=""
              // Each cell goes to its own practice page. These all pointed at
              // #contact, so clicking any of the five dropped the visitor at the
              // booking form instead of the thing they asked about — and left the
              // five detail pages with no internal links from the homepage.
              href={`/services/${sv.slug}`}
              className={`grid-services-cell${wide ? " grid-services-cell--wide" : ""}${edge ? " grid-services-cell--edge" : ""}`}
              style={{ gridArea: AREAS[i] }}
            >
              <div className="grid-services-text">
                <span className="grid-services-num">{sv.no}</span>
                <h3 className="grid-services-title">{sv.title}</h3>
                <p className="grid-services-body">{sv.body}</p>
              </div>
              <span className="grid-services-arrow" aria-hidden="true">
                <svg width="15" height="18" viewBox="0 0 12 14" fill="none">
                  <path d="M4 3 8 7 4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </MotionLink>
          );
        })}
      </RevealGroup>

      <CornerDots />
    </section>
  );
}
