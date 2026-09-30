"use client";

import Image from "next/image";

import { useRef } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import CalBooking from "./CalBooking";
import FeatureCard from "./FeatureCard";
import RelatedCaseStudies from "./RelatedCaseStudies";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
import { bookingPromise, caseStudyEntries, services, type CaseStudyEntry } from "@/lib/data";

export default function CaseStudyDetail({ entry }: { entry: CaseStudyEntry }) {
  const related = caseStudyEntries.filter((c) => c.id !== entry.id).slice(0, 3);
  const matchedService = services.find((s) => s.short === entry.category);
  const accent = matchedService ? serviceColor[matchedService.id] : "var(--color-accent)";
  const icon = matchedService ? serviceIcon[matchedService.id] : "target";

  const techGridRef = useRef<HTMLDivElement | null>(null);
  const resultsGridRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid var(--color-line)" }}>
        <SectionEyebrow>
          {entry.category} · {entry.industry}
        </SectionEyebrow>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: "16px 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          {entry.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>{entry.teaser}</p>

        <div className="grid-3col" style={{ marginTop: 36, borderTop: "1px solid var(--color-line-strong)", gap: 0 }}>
          <div style={{ padding: "18px 22px 22px 0", borderRight: "1px solid var(--color-line)" }}>
            <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink-soft)" }}>{entry.client}</div>
            <div style={{ marginTop: 8, fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)" }}>Client</div>
          </div>
          <div style={{ padding: "18px 22px 22px 0", borderRight: "1px solid var(--color-line)" }}>
            <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink-soft)" }}>{entry.engagementLength}</div>
            <div style={{ marginTop: 8, fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)" }}>
              Engagement
            </div>
          </div>
          {entry.statValue ? (
            <div style={{ padding: "18px 0 22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(24px, 2.6vw, 30px)",
                  letterSpacing: "var(--tracking-snug)",
                  color: "var(--color-accent)",
                }}
              >
                {entry.statValue}
              </div>
              <div style={{ marginTop: 6, fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)" }}>
                {entry.statLabel}
              </div>
            </div>
          ) : (
            <div style={{ padding: "18px 0 22px" }}>
              <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink-soft)" }}>{entry.category}</div>
              <div style={{ marginTop: 8, fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)" }}>
                Service
              </div>
            </div>
          )}
        </div>

        <div className="grid-cs-media" style={{ margin: "36px calc(var(--pad-x) * -1) 0" }}>
          <div className="cs-media-logo svc-panel" style={{ background: `linear-gradient(135deg, ${accent} 0%, var(--color-navy) 100%)` }}>
            <span style={{ position: "relative", zIndex: 1 }}>
              <PracticeIcon name={icon} color="var(--color-white)" size={40} />
            </span>
          </div>
          <div className="cs-media-image">
            {/* alt="" is correct while this is an abstract gradient render: it
                depicts nothing, so describing it would add noise for screen
                reader users. When Phase 6.6 replaces these with real artifacts
                (architecture diagrams, dashboards, redacted metric charts) they
                will carry information and will need genuine alt text. */}
            {/* Above the fold on a case study page, so preloaded rather than
                lazy. `fill` matches the existing .cs-media-image img rules. */}
            <Image src={entry.image} alt="" fill priority sizes="(max-width: 700px) 100vw, 80vw" />
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

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="cs-detail-intro">
          <div>
            <SectionEyebrow>The challenge</SectionEyebrow>
            <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: "62ch" }}>
              {entry.challenge}
            </p>
            <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {entry.challengePoints.map((pt) => (
                <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-text)" }}>
                  <span style={{ flex: "0 0 auto", marginTop: 1 }}>
                    <PracticeIcon name="check-shield" color={accent} size={16} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="cs-detail-facts" style={{ borderLeft: `3px solid ${accent}` }}>
            <div style={{ fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16 }}>
              Quick facts
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: "var(--fs-2xs)", color: "var(--color-muted)" }}>Client</div>
                <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink)", marginTop: 3 }}>{entry.client}</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--fs-2xs)", color: "var(--color-muted)" }}>Engagement</div>
                <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink)", marginTop: 3 }}>{entry.engagementLength}</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--fs-2xs)", color: "var(--color-muted)" }}>Service</div>
                <div style={{ fontSize: "var(--fs-base)", color: "var(--color-ink)", marginTop: 3 }}>{entry.category}</div>
              </div>
            </div>
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <SectionEyebrow>What we built</SectionEyebrow>
        <p style={{ margin: "16px 0 28px", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: "62ch" }}>
          {entry.approach}
        </p>
        <div className="grid-3col" style={{ marginTop: 22 }}>
          {entry.solutionPoints.map((sp) => (
            <FeatureCard key={sp.title} icon="check-shield" title={sp.title} body={sp.body} color={accent} />
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 16 }}>
            Tech stack
          </div>
          <div className="grid-cs-spec" ref={techGridRef}>
            {entry.techStack.map((t) => (
              <div key={t} className="cs-spec-cell">
                {t}
              </div>
            ))}
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <SectionEyebrow>Results</SectionEyebrow>
        <div style={{ display: "flex", gap: 40, marginTop: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <p style={{ flex: "1 1 420px", margin: 0, fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: "62ch" }}>
            {entry.result}
          </p>
          {entry.statValue && (
            <div style={{ flex: "0 0 auto", borderLeft: `3px solid ${accent}`, padding: "2px 0 2px 22px" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(38px, 4.2vw, 50px)",
                  letterSpacing: "var(--tracking-tight)",
                  color: accent,
                  lineHeight: 1,
                }}
              >
                {entry.statValue}
              </div>
              <div style={{ marginTop: 8, fontSize: "var(--fs-xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)" }}>
                {entry.statLabel}
              </div>
            </div>
          )}
        </div>

        <div className="grid-cs-spec" style={{ marginTop: 32 }} ref={resultsGridRef}>
          {entry.benefits.map((b) => (
            <div key={b.title} className="cs-spec-cell cs-spec-cell-tall">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-md)", color: "var(--color-ink)" }}>
                {b.title}
              </div>
              <div style={{ marginTop: 8, fontSize: "var(--fs-base)", lineHeight: 1.55, color: "var(--color-text)" }}>{b.body}</div>
            </div>
          ))}
        </div>
        <CornerDots />
      </section>

      {related.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
          <SectionEyebrow>More case studies</SectionEyebrow>
          <div style={{ marginTop: 24 }}>
            <RelatedCaseStudies cases={related} />
          </div>
          <CornerDots />
        </section>
      )}

      <section style={{ position: "relative", padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <CornerDots position="top" />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(24px, 3vw, 32px)",
            lineHeight: 1.1,
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Want outcomes like this for your workflow?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
          {bookingPromise} You leave with a scoped plan either way.
        </p>
        <div className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </div>
        <CornerDots />
      </section>
    </>
  );
}
