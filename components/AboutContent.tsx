"use client";

import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import PageHero from "./PageHero";
import ClientsStrip from "./ClientsStrip";
import FoundersNote from "./FoundersNote";
import MetricsGrid from "./MetricsGrid";
import CalBooking from "./CalBooking";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { bookingPromise } from "@/lib/data";

// These were previously abstractions — "Integrity", "Innovation", "Customer
// obsession" — interchangeable with any consultancy and at odds with a site whose
// own copy mocks that kind of language ("Outcomes, not case-study theatre").
// Each one is now a commitment a client could hold us to.
const values: { title: string; body: string }[] = [
  {
    title: "We scope before we sell",
    body: "Week one is a fixed-fee audit that ends in a go or no-go. If the answer is no, we tell you and you keep the plan.",
  },
  {
    title: "You own all of it",
    body: "Code, infrastructure, evals and runbook are yours from the first commit. Nothing proprietary you have to keep paying us for.",
  },
  {
    title: "Whoever scopes it, builds it",
    body: "No pyramid staffing and no handover to a delivery team you have never met. The people on the call do the work.",
  },
  {
    title: "We measure against your number",
    body: "Every engagement starts by writing down what better looks like, using a figure your team already tracks.",
  },
  {
    title: "We plan our own exit",
    body: "Success is your team running it without us. We stay available; we don't stay necessary.",
  },
];

const whyUs: { title: string; body: string }[] = [
  { title: "Deep expertise", body: "Senior engineers only: no bench, no juniors learning on your invoice." },
  {
    title: "Proven approach",
    body: "The Thin Slice Method: one real workflow, scoped and shipped before we talk about anything bigger.",
  },
  {
    // Was "Partner for life", which directly contradicted the method's own
    // promise that "we don't stay necessary". Retainers are still the commercial
    // point — the difference is that staying is the client's choice, not a lock-in.
    title: "Retained by choice, not by lock-in",
    body: "Most clients keep a standing pod once the first outcome lands. Rolling, thirty days' notice, cancel when it stops paying for itself.",
  },
  {
    title: "Cloud and AI, one roof",
    body: "Cloud foundations and agentic AI under one team, not two vendors who don't talk to each other.",
  },
];

/**
 * About. Every section after the hero is set the same way: its heading on the left, its
 * content on the right, so the page reads down two steady columns.
 */
export default function AboutContent() {
  return (
    <>
      <PageHero
        title="The team that makes AI pilots real"
        meta="Bengaluru · Rajkot"
        lead={
          <p>
            We&apos;re a team of senior cloud and AI engineers who believe most AI pilots fail for the same reason most
            infrastructure projects used to: too much ceremony before anything real ships. Whether you&apos;re at the
            idea stage or already running production infrastructure, we take the hard part off your shoulders and build
            alongside your team, not instead of it.
          </p>
        }
      />

      <section style={{ position: "relative", padding: "0 var(--pad-x)", borderBottom: "1px solid var(--color-line)" }}>
        <MetricsGrid bordered />
        <CornerDots />
      </section>

      <ClientsStrip variant="grid" />

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>Our mission</SectionEyebrow>
          <p className="sec-split-lead" style={{ marginTop: 16, maxWidth: "40ch" }}>
            Move businesses from cloud infrastructure to production AI, with solutions built for how they actually work,
            and a team that stays accountable for the outcome, not just the handoff.
          </p>
        </Reveal>
        <Reveal className="sec-split-body" delay={0.12}>
          <SectionEyebrow>Our vision</SectionEyebrow>
          <p className="sec-split-lead" style={{ marginTop: 16, maxWidth: "40ch" }}>
            To be the consulting partner of choice for businesses turning cloud infrastructure into production AI,
            worldwide, not just where we happen to have an office.
          </p>
        </Reveal>
        <CornerDots />
      </section>

      <FoundersNote />

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>Core values</SectionEyebrow>
        </Reveal>
        <RevealGroup className="sec-split-body sec-list" stagger={0.08}>
          {values.map((v) => (
            <RevealItem key={v.title} className="sec-list-item">
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <CornerDots />
      </section>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>Why work with us</SectionEyebrow>
        </Reveal>
        <RevealGroup className="sec-split-body sec-list" stagger={0.08}>
          {whyUs.map((w) => (
            <RevealItem key={w.title} className="sec-list-item">
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <CornerDots />
      </section>

      <section className="sec-split">
        <Reveal className="sec-split-head">
          <SectionEyebrow>Trusted &amp; certified</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1} className="sec-split-body" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-advanced-tier-partner.webp"
            alt="AWS Partner: Advanced Tier Services"
            width={92}
            height={92}
            style={{ display: "block", height: 92, width: "auto" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-well-architected-partner.webp"
            alt="AWS Partner: Well-Architected Partner Program"
            width={92}
            height={92}
            style={{ display: "block", height: 92, width: "auto" }}
          />
        </Reveal>
        <CornerDots />
      </section>

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
          Ready to see how we&apos;d scope your workflow?
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
