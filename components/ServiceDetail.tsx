"use client";

import Link from "next/link";
import { m } from "motion/react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import PageHero from "./PageHero";
import CtaArrow from "./CtaArrow";
import CalBooking from "./CalBooking";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { staggerItem } from "@/lib/motion";
import RelatedCaseStudies from "./RelatedCaseStudies";
import { services, type CaseStudyEntry, type Service } from "@/lib/data";

// Each other-practice cell is a Next <Link>; made a motion component once, here.
const MotionLink = m.create(Link);

const GoArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServiceDetail({ service, relatedCases }: { service: Service; relatedCases: CaseStudyEntry[] }) {
  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageHero
        title={service.title}
        lead={<p>{service.long}</p>}
        aside={
          <div className="hero-sheet">
            <h2>Best for</h2>
            <p>{service.bestFor}</p>
            <h2>Includes</h2>
            <ul>
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        }
      >
        <Link href="/#contact" className="btn-hero-primary">
          <CtaArrow>Book a scoping call</CtaArrow>
        </Link>
      </PageHero>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>What it is</SectionEyebrow>
        </Reveal>
        <Reveal as="p" delay={0.1} className="sec-split-body sec-split-lead">
          {service.whatIsIt}
        </Reveal>
        <CornerDots />
      </section>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>What&apos;s included</SectionEyebrow>
        </Reveal>
        <RevealGroup className="sec-split-body sec-list" stagger={0.08}>
          {service.capabilities.map((c) => (
            <RevealItem key={c.title} className="sec-list-item">
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>Tech stack</SectionEyebrow>
        </Reveal>
        <RevealGroup className="grid-tech-stack" style={{ marginTop: 20 }} stagger={0.05} spotlight>
          {service.techStackDetail.map((t) => (
            <RevealItem key={t.name} className="tech-stack-cell" spotlight>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.logo} alt={t.name} className="tech-stack-logo" />
              <span className="tech-stack-name">{t.name}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>Who it&apos;s for</SectionEyebrow>
        </Reveal>
        <RevealGroup className="grid-who-for" style={{ marginTop: 20 }} stagger={0.1} spotlight>
          {service.whoItsFor.map((w) => (
            <RevealItem key={w} className="who-for-cell" spotlight>
              {w}
            </RevealItem>
          ))}
        </RevealGroup>
        <CornerDots />
      </section>

      {relatedCases.length > 0 && (
        <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
          <Reveal>
            <SectionEyebrow>{`Case studies in ${service.short}`}</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: 24 }}>
            <RelatedCaseStudies cases={relatedCases} />
          </Reveal>
          <CornerDots />
        </section>
      )}

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)" }}>
        <Reveal>
          <SectionEyebrow>Other practices</SectionEyebrow>
        </Reveal>
        <RevealGroup className="grid-other-practices" style={{ marginTop: 20 }} stagger={0.1}>
          {otherServices.map((s) => (
            <MotionLink key={s.id} variants={staggerItem} data-reveal="" href={`/services/${s.slug}`} className="other-practice-cell">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--fs-lead)",
                  letterSpacing: "var(--tracking-snug)",
                  margin: 0,
                }}
              >
                {s.title}
              </h3>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--color-accent)" }}>
                See details
                <GoArrow />
              </span>
            </MotionLink>
          ))}
        </RevealGroup>
      </section>

      <section style={{ position: "relative", padding: "var(--sp-field) var(--pad-x)", textAlign: "center", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <CornerDots position="top" />
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
          Not sure this is the right practice?
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-text)" }}>
          Tell us the workflow. We&apos;ll tell you which of the five gets you there fastest.
        </Reveal>
        <Reveal delay={0.18} className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </Reveal>
        <CornerDots />
      </section>
    </>
  );
}
