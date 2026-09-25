"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import CtaArrow from "./CtaArrow";
import CalBooking from "./CalBooking";
import RelatedCaseStudies from "./RelatedCaseStudies";
import { serviceColor } from "./PracticeIcon";
import { useGridIntersectionDots, GridDotsOverlay } from "./useGridIntersectionDots";
import { services, caseStudyEntries, type Service } from "@/lib/data";

const GoArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServiceDetail({ service }: { service: Service }) {
  const relatedCases = caseStudyEntries.filter((c) => c.category === service.short).slice(0, 3);
  const otherServices = services.filter((s) => s.id !== service.id);
  const accent = serviceColor[service.id];

  const [openCap, setOpenCap] = useState(0);
  const otherGridRef = useRef<HTMLDivElement | null>(null);
  const otherDots = useGridIntersectionDots(otherGridRef, ".other-practice-cell", [otherServices.length]);
  const techGridRef = useRef<HTMLDivElement | null>(null);
  const techDots = useGridIntersectionDots(techGridRef, ".tech-stack-cell", [service.techStackDetail.length]);
  const whoGridRef = useRef<HTMLDivElement | null>(null);
  const whoDots = useGridIntersectionDots(whoGridRef, ".who-for-cell", [service.whoItsFor.length]);

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid #E2E0DA" }}>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: 0,
            maxWidth: "24ch",
            textWrap: "balance",
          }}
        >
          {service.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>{service.long}</p>

        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/#contact" className="btn-hero-primary">
            <CtaArrow>Get Your Scoped Plan</CtaArrow>
          </Link>
        </div>

        <div
          className="svc-panel"
          style={{
            margin: "36px calc(var(--pad-x) * -1) 0",
            borderRadius: 0,
            height: "clamp(220px, 26vw, 320px)",
            background: `linear-gradient(135deg, ${accent} 0%, #0D184A 100%)`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 4,
              bottom: -24,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(120px, 15vw, 220px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              color: "rgba(255,255,255,0.1)",
            }}
          >
            {service.no}
          </span>
          <div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "26px 28px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              Practice {service.no} / 05
            </div>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginTop: 4,
              }}
            >
              {service.short}
            </div>
          </div>
        </div>

        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>What it is</SectionEyebrow>
        <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A" }}>{service.whatIsIt}</p>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>What's included</SectionEyebrow>
        <div style={{ marginTop: 28, maxWidth: 640 }}>
          {service.capabilities.map((c, i) => {
            const isOpen = openCap === i;
            return (
              <div key={c.title} style={{ marginBottom: isOpen ? 28 : 18 }}>
                <button
                  type="button"
                  onClick={() => setOpenCap(isOpen ? -1 : i)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: isOpen ? 600 : 500,
                    fontSize: 21,
                    letterSpacing: "-0.02em",
                    color: isOpen ? "#131417" : "#B5B1A7",
                    transition: "color 0.2s ease",
                  }}
                >
                  {c.title}
                </button>
                {isOpen && (
                  <p style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#43464A", maxWidth: "58ch" }}>{c.body}</p>
                )}
              </div>
            );
          })}
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>Tech stack</SectionEyebrow>
        <div className="grid-tech-stack" style={{ marginTop: 20 }} ref={techGridRef}>
          <GridDotsOverlay dots={techDots} />
          {service.techStackDetail.map((t) => (
            <div key={t.name} className="tech-stack-cell">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.logo} alt={t.name} className="tech-stack-logo" />
              <span className="tech-stack-name">{t.name}</span>
            </div>
          ))}
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>Who it's for</SectionEyebrow>
        <div className="grid-who-for" style={{ marginTop: 20 }} ref={whoGridRef}>
          <GridDotsOverlay dots={whoDots} />
          {service.whoItsFor.map((w) => (
            <div key={w} className="who-for-cell">
              {w}
            </div>
          ))}
        </div>
        <CornerDots />
      </section>

      {relatedCases.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
          <SectionEyebrow>Proof</SectionEyebrow>
          <h3
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: "-0.025em",
              margin: "16px 0 0",
            }}
          >
            Case studies in {service.short}
          </h3>
          <div style={{ marginTop: 24 }}>
            <RelatedCaseStudies cases={relatedCases} />
          </div>
          <CornerDots />
        </section>
      )}

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)" }}>
        <SectionEyebrow>Other practices</SectionEyebrow>
        <div className="grid-other-practices" style={{ marginTop: 20 }} ref={otherGridRef}>
          <GridDotsOverlay dots={otherDots} />
          {otherServices.map((s) => (
            <Link key={s.id} href={`/services/${s.slug}`} data-transition="none" className="other-practice-cell">
              <h4
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {s.title}
              </h4>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 13, fontWeight: 500, color: "#193DAA" }}>
                See details
                <GoArrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderTop: "1px solid #E2E0DA", borderBottom: "1px solid #E2E0DA" }}>
        <CornerDots position="top" />
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(24px, 3vw, 32px)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Not sure this is the right practice?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          Tell us the workflow. We&apos;ll tell you which of the five gets you there fastest.
        </p>
        <div className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </div>
        <CornerDots />
      </section>
    </>
  );
}
