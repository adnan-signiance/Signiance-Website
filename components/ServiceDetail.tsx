"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import CtaArrow from "./CtaArrow";
import CalBooking from "./CalBooking";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { staggerItem } from "@/lib/motion";
import RelatedCaseStudies from "./RelatedCaseStudies";
import { serviceColor } from "./PracticeIcon";
import { services, caseStudyEntries, type Service } from "@/lib/data";

// Each other-practice cell is a Next <Link>; made a motion component once, here.
const MotionLink = m.create(Link);

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

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid var(--color-line)" }}>
        <HeroHeading
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            maxWidth: "24ch",
            textWrap: "balance",
          }}
        >
          {service.title}
        </HeroHeading>
        <p className="hero-rise hero-d1" style={{ maxWidth: 560, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>{service.long}</p>

        <div className="hero-rise hero-d2" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/#contact" className="btn-hero-primary">
            <CtaArrow>Book a scoping call</CtaArrow>
          </Link>
        </div>

        <div
          className="svc-panel hero-rise hero-d3"
          style={{
            margin: "36px calc(var(--pad-x) * -1) 0",
            borderRadius: 0,
            height: "clamp(220px, 26vw, 320px)",
            background: `linear-gradient(135deg, ${accent} 0%, var(--color-navy) 100%)`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: 4,
              bottom: -24,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(120px, 15vw, 220px)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-tight)",
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
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.6)" }}>
              Practice {service.no} / 05
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--fs-xl)",
                letterSpacing: "var(--tracking-snug)",
                color: "var(--color-white)",
                marginTop: 4,
              }}
            >
              {service.short}
            </div>
          </div>
        </div>

        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>What it is</SectionEyebrow>
        </Reveal>
        <Reveal as="p" delay={0.1} style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)" }}>{service.whatIsIt}</Reveal>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>What&apos;s included</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1} style={{ marginTop: 28, maxWidth: 640 }}>
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
                    fontFamily: "var(--font-display)",
                    fontWeight: isOpen ? 600 : 500,
                    fontSize: "var(--fs-xl)",
                    letterSpacing: "var(--tracking-snug)",
                    // Was #B5B1A7 at 2.14:1 — a clear AA failure for 21px text,
                    // which needs 4.5:1. --color-muted is 5.20:1 and still reads
                    // as dimmed against the open item's near-black.
                    color: isOpen ? "var(--color-ink)" : "var(--color-muted)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {c.title}
                </button>
                {isOpen && (
                  <p style={{ margin: "10px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)", maxWidth: "58ch" }}>{c.body}</p>
                )}
              </div>
            );
          })}
        </Reveal>
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
            <SectionEyebrow>Proof</SectionEyebrow>
          </Reveal>
          <RevealHeading
            level={3}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-xl)",
              letterSpacing: "var(--tracking-snug)",
              margin: "16px 0 0",
            }}
          >
            {`Case studies in ${service.short}`}
          </RevealHeading>
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
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--fs-lg)",
                  letterSpacing: "var(--tracking-snug)",
                  margin: 0,
                }}
              >
                {s.title}
              </h4>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--color-accent)" }}>
                See details
                <GoArrow />
              </span>
            </MotionLink>
          ))}
        </RevealGroup>
      </section>

      <section style={{ position: "relative", padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <CornerDots position="top" />
        <RevealHeading className="cta-title"
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
          Not sure this is the right practice?
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
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
