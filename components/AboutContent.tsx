import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import ClientsStrip from "./ClientsStrip";
import FeatureCard from "./FeatureCard";
import PracticeIcon, { type IconName } from "./PracticeIcon";
import { headline, metrics } from "@/lib/data";

const blueScale = ["#152F85", "#193DAA", "#2C55C4", "#4F6FDB", "#5C81DF"];

const values: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Trust & transparency",
    body: "Clear visibility into every stage of a project, with clients, partners, and each other.",
    icon: "shield",
  },
  {
    title: "Integrity",
    body: "Uncompromising honesty in everything we ship.",
    icon: "check-shield",
  },
  {
    title: "Accountability",
    body: "We own our work end to end — no handoffs into a void.",
    icon: "flag",
  },
  {
    title: "Innovation",
    body: "We chase the technical breakthroughs that actually move the needle for clients.",
    icon: "bolt",
  },
  {
    title: "Customer obsession",
    body: "Solutions built around what you need next, not what's easiest to sell.",
    icon: "target",
  },
];

const whyUs: { title: string; body: string; icon: IconName }[] = [
  { title: "Deep expertise", body: "Senior engineers only — no bench, no juniors learning on your invoice.", icon: "star" },
  {
    title: "Proven approach",
    body: "The Thin Slice Method: one real workflow, scoped and shipped before we talk about anything bigger.",
    icon: "compass",
  },
  {
    title: "Partner for life",
    body: "Most engagements start as a scoping sprint and grow into a retained partnership, not a one-off project.",
    icon: "link",
  },
  {
    title: "Cloud and AI, one roof",
    body: "Cloud foundations and agentic AI under one team, not two vendors who don't talk to each other.",
    icon: "layers",
  },
];

export default function AboutContent() {
  return (
    <>
      <section style={{ position: "relative", padding: "clamp(44px, 6vw, 64px) var(--pad-x) 0", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>About</SectionEyebrow>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: "16px 0 0",
            maxWidth: "20ch",
            textWrap: "balance",
          }}
        >
          {headline}
        </h1>
        <p style={{ maxWidth: 620, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
          We're a team of senior cloud and AI engineers who believe most AI pilots fail for the same reason
          most infrastructure projects used to — too much ceremony before anything real ships. Whether you're
          at the idea stage or already running production infrastructure, we take the hard part off your
          shoulders and build alongside your team, not instead of it.
        </p>
        <p style={{ maxWidth: 620, margin: "10px 0 0", fontSize: 14, color: "#6A6D71" }}>Bengaluru · Austin · Amsterdam</p>

        <div className="grid-cs-metrics" style={{ marginTop: 36, borderTop: "1px solid #C7CEE6" }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ padding: "18px 22px 22px 0", borderRight: "1px solid #E2E0DA" }}>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(24px, 2.6vw, 30px)",
                  letterSpacing: "-0.03em",
                  color: "#193DAA",
                }}
              >
                {m.value}
              </div>
              <div style={{ marginTop: 8, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B8E86" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <CornerDots />
      </section>

      <ClientsStrip variant="grid" />

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <div className="grid-3col" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ borderLeft: "3px solid #193DAA", paddingLeft: 22 }}>
            <PracticeIcon name="target" color="#193DAA" size={26} />
            <div style={{ marginTop: 14 }}>
              <SectionEyebrow>Our mission</SectionEyebrow>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A" }}>
              Move businesses from cloud infrastructure to production AI, with solutions built for how they
              actually work — and a team that stays accountable for the outcome, not just the handoff.
            </p>
          </div>
          <div style={{ borderLeft: "3px solid #4F6FDB", paddingLeft: 22 }}>
            <PracticeIcon name="compass" color="#4F6FDB" size={26} />
            <div style={{ marginTop: 14 }}>
              <SectionEyebrow>Our vision</SectionEyebrow>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A" }}>
              To be the consulting partner of choice for businesses turning cloud infrastructure into
              production AI — worldwide, not just where we happen to have an office.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA", background: "#EEF2FB" }}>
        <SectionEyebrow>Core values</SectionEyebrow>
        <div className="grid-3col" style={{ marginTop: 24 }}>
          {values.map((v, i) => (
            <div key={v.title} style={{ border: "1px solid #D6D3CB", borderRadius: 12, padding: "20px 20px 22px", background: "#FFFFFF" }}>
              <FeatureCard icon={v.icon} title={v.title} body={v.body} color={blueScale[i % blueScale.length]} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>Why work with us</SectionEyebrow>
        <div className="grid-3col" style={{ marginTop: 24, gridTemplateColumns: "repeat(2, 1fr)" }}>
          {whyUs.map((w, i) => (
            <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} color={blueScale[i % blueScale.length]} />
          ))}
        </div>
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>Trusted &amp; certified</SectionEyebrow>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-advanced-tier-partner.png"
            alt="AWS Partner — Advanced Tier Services"
            style={{ display: "block", height: 92, width: "auto" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/aws-well-architected-partner.png"
            alt="AWS Partner — Well-Architected Partner Program"
            style={{ display: "block", height: 92, width: "auto" }}
          />
        </div>
        <CornerDots />
      </section>

      <section style={{ padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderTop: "1px solid #E2E0DA" }}>
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
          Ready to see how we'd scope your workflow?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          30 minutes with the people who&apos;d do the work. You leave with a scoped plan either way.
        </p>
        <Link href="/#contact" className="btn-hero-primary" style={{ marginTop: 22, display: "inline-flex" }}>
          Get Your Scoped Plan
        </Link>
      </section>
    </>
  );
}
