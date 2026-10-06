"use client";

import Image from "next/image";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import ClientsStrip from "./ClientsStrip";
import FeatureCard from "./FeatureCard";
import MetricsGrid from "./MetricsGrid";
import CalBooking from "./CalBooking";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import PracticeIcon, { type IconName } from "./PracticeIcon";
import { bookingPromise, headline, team } from "@/lib/data";

// Literal hex for the same reason as serviceColor in PracticeIcon: FeatureCard
// builds a translucent tint with `${color}17`, which needs a raw hex value.
const blueScale = ["#152F85", "#193DAA", "#2C55C4", "#4F6FDB", "#5C81DF"];

// These were previously abstractions — "Integrity", "Innovation", "Customer
// obsession" — interchangeable with any consultancy and at odds with a site whose
// own copy mocks that kind of language ("Outcomes, not case-study theatre").
// Each one is now a commitment a client could hold us to.
const values: { title: string; body: string; icon: IconName }[] = [
  {
    title: "We scope before we sell",
    body: "Week one is a fixed-fee audit that ends in a go or no-go. If the answer is no, we tell you and you keep the plan.",
    icon: "shield",
  },
  {
    title: "You own all of it",
    body: "Code, infrastructure, evals and runbook are yours from the first commit. Nothing proprietary you have to keep paying us for.",
    icon: "check-shield",
  },
  {
    title: "Whoever scopes it, builds it",
    body: "No pyramid staffing and no handover to a delivery team you have never met. The people on the call do the work.",
    icon: "flag",
  },
  {
    title: "We measure against your number",
    body: "Every engagement starts by writing down what better looks like, using a figure your team already tracks.",
    icon: "target",
  },
  {
    title: "We plan our own exit",
    body: "Success is your team running it without us. We stay available; we don't stay necessary.",
    icon: "bolt",
  },
];

const whyUs: { title: string; body: string; icon: IconName }[] = [
  { title: "Deep expertise", body: "Senior engineers only: no bench, no juniors learning on your invoice.", icon: "star" },
  {
    title: "Proven approach",
    body: "The Thin Slice Method: one real workflow, scoped and shipped before we talk about anything bigger.",
    icon: "compass",
  },
  {
    // Was "Partner for life", which directly contradicted the method's own
    // promise that "we don't stay necessary". Retainers are still the commercial
    // point — the difference is that staying is the client's choice, not a lock-in.
    title: "Retained by choice, not by lock-in",
    body: "Most clients keep a standing pod once the first outcome lands. Rolling, thirty days' notice, cancel when it stops paying for itself.",
    icon: "link",
  },
  {
    title: "Cloud and AI, one roof",
    body: "Cloud foundations and agentic AI under one team, not two vendors who don't talk to each other.",
    icon: "layers",
  },
];

export default function AboutContent() {
  const founder = team.find((m) => m.name === "Brijesh")!;

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0", borderBottom: "1px solid var(--color-line)" }}>
        <div className="hero-split">
          <div>
            <SectionEyebrow rise={0}>About</SectionEyebrow>
            <HeroHeading
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(29px, 4.4vw, 46px)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-tight)",
                margin: "16px 0 0",
                maxWidth: "20ch",
                textWrap: "balance",
              }}
            >
              {headline}
            </HeroHeading>
            <p className="hero-rise hero-d1" style={{ maxWidth: 620, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
              We&apos;re a team of senior cloud and AI engineers who believe most AI pilots fail for the same reason
              most infrastructure projects used to: too much ceremony before anything real ships. Whether you&apos;re
              at the idea stage or already running production infrastructure, we take the hard part off your
              shoulders and build alongside your team, not instead of it.
            </p>
            <p style={{ maxWidth: 620, margin: "10px 0 0", fontSize: "var(--fs-base)", color: "var(--color-muted)" }}>Bengaluru · Rajkot · Melbourne</p>
          </div>
          <div className="hero-art hero-rise hero-d2">
            <Image src="/media/about-team.webp" alt="" fill priority sizes="320px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        <MetricsGrid bordered style={{ marginTop: 40 }} />

        <CornerDots />
      </section>

      <ClientsStrip variant="grid" />

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="grid-3col" style={{ gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          <div style={{ position: "relative", paddingRight: 40, overflow: "hidden" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -18,
                right: 20,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(80px, 9vw, 120px)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-tint)",
                zIndex: 0,
              }}
            >
              01
            </span>
            <Reveal style={{ position: "relative" }}>
              <SectionEyebrow>Our mission</SectionEyebrow>
              <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: "44ch" }}>
                Move businesses from cloud infrastructure to production AI, with solutions built for how they
                actually work, and a team that stays accountable for the outcome, not just the handoff.
              </p>
            </Reveal>
          </div>
          <div style={{ position: "relative", borderLeft: "1px solid var(--color-line)", paddingLeft: 40, overflow: "hidden" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -18,
                right: 20,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(80px, 9vw, 120px)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-tight)",
                color: "var(--color-tint)",
                zIndex: 0,
              }}
            >
              02
            </span>
            <Reveal style={{ position: "relative" }} delay={0.12}>
              <SectionEyebrow>Our vision</SectionEyebrow>
              <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: "44ch" }}>
                To be the consulting partner of choice for businesses turning cloud infrastructure into
                production AI, worldwide, not just where we happen to have an office.
              </p>
            </Reveal>
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>Founder</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24 }}>
          <span className="team-avatar" style={{ width: 64, height: 64, fontSize: "var(--fs-xl)", background: blueScale[0] }}>
            {founder.name.charAt(0)}
          </span>
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--fs-xl)",
                letterSpacing: "var(--tracking-snug)",
                margin: 0,
                color: "var(--color-ink)",
              }}
            >
              {founder.name}
            </h4>
            <p style={{ margin: "4px 0 0", fontSize: "var(--fs-base)", color: "var(--color-muted)" }}>{founder.role}</p>
          </div>
        </Reveal>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)", background: "var(--color-tint)" }}>
        <Reveal>
          <SectionEyebrow>Core values</SectionEyebrow>
        </Reveal>
        <div style={{ position: "relative", marginTop: 28 }}>
          <RevealGroup className="grid-values" stagger={0.08} spotlight>
            {values.map((v, i) => (
              <RevealItem key={v.title} className="grid-values-cell" spotlight>
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${blueScale[i % blueScale.length]}17`,
                  }}
                >
                  <PracticeIcon name={v.icon} color={blueScale[i % blueScale.length]} size={18} />
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "var(--fs-md)",
                    letterSpacing: "var(--tracking-snug)",
                    margin: "14px 0 0",
                    color: "var(--color-ink)",
                  }}
                >
                  {v.title}
                </h4>
                <p style={{ margin: "8px 0 0", fontSize: "var(--fs-sm)", lineHeight: 1.55, color: "var(--color-text)" }}>{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <CornerDots position="top" bg="var(--color-tint)" />
          <CornerDots bg="var(--color-tint)" />
        </div>
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>Why work with us</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1} className="grid-3col" style={{ marginTop: 24, gridTemplateColumns: "repeat(2, 1fr)" }}>
          {whyUs.map((w, i) => (
            <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} color={blueScale[i % blueScale.length]} />
          ))}
        </Reveal>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid var(--color-line)" }}>
        <Reveal>
          <SectionEyebrow>Trusted &amp; certified</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1} style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-advanced-tier-partner.webp"
            alt="AWS Partner: Advanced Tier Services"
            style={{ display: "block", height: 92, width: "auto" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-well-architected-partner.webp"
            alt="AWS Partner: Well-Architected Partner Program"
            style={{ display: "block", height: 92, width: "auto" }}
          />
        </Reveal>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <CornerDots position="top" />
        <RevealHeading
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
          Ready to see how we&apos;d scope your workflow?
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
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
