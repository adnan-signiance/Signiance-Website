"use client";

import { useRef } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import CalBooking from "./CalBooking";
import FeatureCard from "./FeatureCard";
import RelatedCaseStudies from "./RelatedCaseStudies";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
import { useGridIntersectionDots, GridDotsOverlay } from "./useGridIntersectionDots";
import { caseStudyEntries, services, type CaseStudyEntry } from "@/lib/data";

export default function CaseStudyDetail({ entry }: { entry: CaseStudyEntry }) {
  const related = caseStudyEntries.filter((c) => c.id !== entry.id).slice(0, 3);
  const matchedService = services.find((s) => s.short === entry.category);
  const accent = matchedService ? serviceColor[matchedService.id] : "#193DAA";
  const icon = matchedService ? serviceIcon[matchedService.id] : "target";

  const techGridRef = useRef<HTMLDivElement | null>(null);
  const techDots = useGridIntersectionDots(techGridRef, ".cs-spec-cell", [entry.techStack.length]);
  const resultsGridRef = useRef<HTMLDivElement | null>(null);
  const resultsDots = useGridIntersectionDots(resultsGridRef, ".cs-spec-cell", [entry.benefits.length]);

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>
          {entry.category} · {entry.industry}
        </SectionEyebrow>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: "16px 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          {entry.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>{entry.teaser}</p>

        <div className="grid-3col" style={{ marginTop: 36, borderTop: "1px solid #D6D3CB", gap: 0 }}>
          <div style={{ padding: "18px 22px 22px 0", borderRight: "1px solid #E2E0DA" }}>
            <div style={{ fontSize: 14, color: "#22252A" }}>{entry.client}</div>
            <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71" }}>Client</div>
          </div>
          <div style={{ padding: "18px 22px 22px 0", borderRight: "1px solid #E2E0DA" }}>
            <div style={{ fontSize: 14, color: "#22252A" }}>{entry.engagementLength}</div>
            <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71" }}>
              Engagement
            </div>
          </div>
          {entry.statValue ? (
            <div style={{ padding: "18px 0 22px" }}>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(24px, 2.6vw, 30px)",
                  letterSpacing: "-0.03em",
                  color: "#193DAA",
                }}
              >
                {entry.statValue}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71" }}>
                {entry.statLabel}
              </div>
            </div>
          ) : (
            <div style={{ padding: "18px 0 22px" }}>
              <div style={{ fontSize: 14, color: "#22252A" }}>{entry.category}</div>
              <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71" }}>
                Service
              </div>
            </div>
          )}
        </div>

        <div className="grid-cs-media" style={{ margin: "36px calc(var(--pad-x) * -1) 0" }}>
          <div className="cs-media-logo svc-panel" style={{ background: `linear-gradient(135deg, ${accent} 0%, #0D184A 100%)` }}>
            <span style={{ position: "relative", zIndex: 1 }}>
              <PracticeIcon name={icon} color="#FFFFFF" size={40} />
            </span>
          </div>
          <div className="cs-media-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.image} alt="" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(180deg, ${accent}00 55%, ${accent}55 100%)`,
              }}
            />
          </div>
        </div>

        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <div className="cs-detail-intro">
          <div>
            <SectionEyebrow>The challenge</SectionEyebrow>
            <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A", maxWidth: "62ch" }}>
              {entry.challenge}
            </p>
            <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {entry.challengePoints.map((pt) => (
                <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.6, color: "#43464A" }}>
                  <span style={{ flex: "0 0 auto", marginTop: 1 }}>
                    <PracticeIcon name="check-shield" color={accent} size={16} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="cs-detail-facts" style={{ borderLeft: `3px solid ${accent}` }}>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71", marginBottom: 16 }}>
              Quick facts
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#6A6D71" }}>Client</div>
                <div style={{ fontSize: 14, color: "#131417", marginTop: 3 }}>{entry.client}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6A6D71" }}>Engagement</div>
                <div style={{ fontSize: 14, color: "#131417", marginTop: 3 }}>{entry.engagementLength}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6A6D71" }}>Service</div>
                <div style={{ fontSize: 14, color: "#131417", marginTop: 3 }}>{entry.category}</div>
              </div>
            </div>
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>What we built</SectionEyebrow>
        <p style={{ margin: "16px 0 28px", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A", maxWidth: "62ch" }}>
          {entry.approach}
        </p>
        <div className="grid-3col" style={{ marginTop: 22 }}>
          {entry.solutionPoints.map((sp) => (
            <FeatureCard key={sp.title} icon="check-shield" title={sp.title} body={sp.body} color={accent} />
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71", marginBottom: 16 }}>
            Tech stack
          </div>
          <div className="grid-cs-spec" ref={techGridRef}>
            <GridDotsOverlay dots={techDots} />
            {entry.techStack.map((t) => (
              <div key={t} className="cs-spec-cell">
                {t}
              </div>
            ))}
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>Results</SectionEyebrow>
        <div style={{ display: "flex", gap: 40, marginTop: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <p style={{ flex: "1 1 420px", margin: 0, fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A", maxWidth: "62ch" }}>
            {entry.result}
          </p>
          {entry.statValue && (
            <div style={{ flex: "0 0 auto", borderLeft: `3px solid ${accent}`, padding: "2px 0 2px 22px" }}>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(38px, 4.2vw, 50px)",
                  letterSpacing: "-0.04em",
                  color: accent,
                  lineHeight: 1,
                }}
              >
                {entry.statValue}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6A6D71" }}>
                {entry.statLabel}
              </div>
            </div>
          )}
        </div>

        <div className="grid-cs-spec" style={{ marginTop: 32 }} ref={resultsGridRef}>
          <GridDotsOverlay dots={resultsDots} />
          {entry.benefits.map((b) => (
            <div key={b.title} className="cs-spec-cell cs-spec-cell-tall">
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 16.5, color: "#131417" }}>
                {b.title}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: "#43464A" }}>{b.body}</div>
            </div>
          ))}
        </div>
        <CornerDots />
      </section>

      {related.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
          <SectionEyebrow>More case studies</SectionEyebrow>
          <div style={{ marginTop: 24 }}>
            <RelatedCaseStudies cases={related} />
          </div>
          <CornerDots />
        </section>
      )}

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
          Want outcomes like this for your workflow?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          30 minutes with the people who&apos;d do the work. You leave with a scoped plan either way.
        </p>
        <div className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </div>
        <CornerDots />
      </section>
    </>
  );
}
