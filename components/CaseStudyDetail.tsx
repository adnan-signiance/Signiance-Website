"use client";

import Image from "next/image";

import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import PageHero from "./PageHero";
import CalBooking from "./CalBooking";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import RelatedCaseStudies from "./RelatedCaseStudies";
import { hasCasePhoto as hasPhoto } from "@/lib/caseMedia";
import { bookingPromise, type CaseStudyEntry } from "@/lib/data";


/**
 * One case study: the result and the facts on the first screen, the photograph across the
 * page, then the challenge, what was built and what came of it, each with its heading on the
 * left and its text on the right.
 */
export default function CaseStudyDetail({ entry, related }: { entry: CaseStudyEntry; related: CaseStudyEntry[] }) {
  return (
    <>
      <PageHero
        compact
        flush={hasPhoto(entry.image)}
        title={entry.title}
        meta={`${entry.category} · ${entry.industry}`}
        lead={<p>{entry.teaser}</p>}
        aside={
          <dl className="cs-facts">
            {entry.statValue ? (
              <div className="cs-facts-stat">
                <dd>{entry.statValue}</dd>
                <dt>{entry.statLabel}</dt>
              </div>
            ) : null}
            <div>
              <dt>Client</dt>
              <dd>{entry.client}</dd>
            </div>
            <div>
              <dt>Engagement</dt>
              <dd>{entry.engagementLength}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{entry.category}</dd>
            </div>
          </dl>
        }
      />

      {hasPhoto(entry.image) ? (
        <section className="cs-photo hero-rise hero-d3">
          {/* alt="" while the picture is a scene, not an artifact: it carries no information the
              text does not. Above the fold, so preloaded. */}
          <Image src={entry.image} alt="" fill priority sizes="(max-width: 700px) 100vw, 1280px" />
          <CornerDots />
        </section>
      ) : null}

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>The challenge</SectionEyebrow>
        </Reveal>
        <Reveal className="sec-split-body" delay={0.1}>
          <p className="sec-split-lead">{entry.challenge}</p>
          <ul className="hero-checks" style={{ marginTop: 24 }}>
            {entry.challengePoints.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </Reveal>
        <CornerDots />
      </section>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>What we built</SectionEyebrow>
        </Reveal>
        <div className="sec-split-body">
          <Reveal as="p" className="sec-split-lead" delay={0.1}>
            {entry.approach}
          </Reveal>
          <RevealGroup className="sec-list" style={{ marginTop: 32 }} stagger={0.08}>
            {entry.solutionPoints.map((sp) => (
              <RevealItem key={sp.title} className="sec-list-item">
                <h3>{sp.title}</h3>
                <p>{sp.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal style={{ marginTop: 32 }}>
            <h3 className="sec-tags-title">Tech stack</h3>
            <ul className="sec-tags">
              {entry.techStack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <CornerDots />
      </section>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>Results</SectionEyebrow>
          {entry.statValue ? (
            <p className="cs-result-stat">
              <strong>{entry.statValue}</strong>
              <span>{entry.statLabel}</span>
            </p>
          ) : null}
        </Reveal>
        <div className="sec-split-body">
          <Reveal as="p" className="sec-split-lead" delay={0.1}>
            {entry.result}
          </Reveal>
          <RevealGroup className="sec-list" style={{ marginTop: 32 }} stagger={0.08}>
            {entry.benefits.map((b) => (
              <RevealItem key={b.title} className="sec-list-item">
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <CornerDots />
      </section>

      {related.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
          <Reveal>
            <SectionEyebrow>More case studies</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: 24 }}>
            <RelatedCaseStudies cases={related} />
          </Reveal>
          <CornerDots />
        </section>
      )}

      <section style={{ position: "relative", padding: "var(--sp-field) var(--pad-x)", textAlign: "center", borderBottom: "1px solid var(--color-line)" }}>
        <RevealHeading className="cta-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-h2)",
            lineHeight: 1.1,
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Want outcomes like this for your workflow?
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-text)" }}>
          {bookingPromise} You leave with a scoped plan either way.
        </Reveal>
        <Reveal delay={0.18} className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </Reveal>
        <CornerDots />
      </section>
    </>
  );
}
