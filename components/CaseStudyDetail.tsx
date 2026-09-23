"use client";

import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import FeatureCard from "./FeatureCard";
import RelatedCaseStudies from "./RelatedCaseStudies";
import PracticeIcon, { serviceIcon, serviceColor, type IconName } from "./PracticeIcon";
import { caseStudyEntries, services, type CaseStudyEntry } from "@/lib/data";

const benefitIcons: IconName[] = ["target", "bolt", "star"];

const BackArrow = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M6.5 1 2.5 5l4 4" stroke="#6A6D71" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CaseStudyDetail({ entry }: { entry: CaseStudyEntry }) {
  const related = caseStudyEntries.filter((c) => c.id !== entry.id).slice(0, 3);
  const matchedService = services.find((s) => s.short === entry.category);
  const accent = matchedService ? serviceColor[matchedService.id] : "#193DAA";
  const icon = matchedService ? serviceIcon[matchedService.id] : "target";

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid #E2E0DA" }}>
        <Link
          href="/case-studies"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6A6D71", textDecoration: "none" }}
        >
          <BackArrow />
          All case studies
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: accent,
              flex: "0 0 auto",
              boxShadow: `0 10px 24px ${accent}40`,
            }}
          >
            <PracticeIcon name={icon} color="#FFFFFF" size={26} />
          </span>
          <SectionEyebrow>
            {entry.category} · {entry.industry}
          </SectionEyebrow>
        </div>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: "20px 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          {entry.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>{entry.teaser}</p>

        <div className="grid-3col" style={{ marginTop: 36, borderTop: "1px solid #C7CEE6", gap: 0 }}>
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

        <div style={{ position: "relative", margin: "36px calc(var(--pad-x) * -1) 0", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.image}
            alt=""
            style={{ display: "block", width: "100%", height: "clamp(220px, 32vw, 420px)", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, ${accent}00 55%, ${accent}55 100%)`,
            }}
          />
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

        <div style={{ marginTop: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71", marginBottom: 12 }}>
            Tech stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {entry.techStack.map((t) => (
              <span key={t} className="cs-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA", background: "#EEF2FB" }}>
        <SectionEyebrow>Results</SectionEyebrow>
        <p style={{ margin: "16px 0 28px", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A", maxWidth: "62ch" }}>
          {entry.result}
        </p>
        <div className="grid-3col" style={{ marginTop: 22 }}>
          {entry.benefits.map((b, i) => (
            <div key={b.title} style={{ border: "1px solid #D6D3CB", borderRadius: 12, padding: "22px 20px", background: "#FFFFFF" }}>
              <FeatureCard icon={benefitIcons[i % benefitIcons.length]} title={b.title} body={b.body} color={accent} />
            </div>
          ))}
        </div>
        <CornerDots bg="#EEF2FB" />
      </section>

      <section style={{ position: "relative", padding: "clamp(44px, 6vw, 60px) var(--pad-x)", borderBottom: "1px solid #E2E0DA" }}>
        <div style={{ maxWidth: 560 }}>
          <SectionEyebrow>Unlock the case study</SectionEyebrow>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(22px, 2.8vw, 28px)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "16px 0 0",
              textWrap: "balance",
            }}
          >
            Get the full write-up sent to your inbox
          </h2>
          <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "#43464A" }}>
            Send yourself a copy of this case study — challenge, approach, and results — to share with your team.
          </p>
          <form
            style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="you@company.com" className="email-input" required />
            <button type="submit" className="btn-hero-primary contact-submit-btn" style={{ border: "none", cursor: "pointer" }}>
              Access Now
            </button>
          </form>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12, color: "#6A6D71" }}>
            <input type="checkbox" required style={{ margin: 0 }} />
            <span>
              I confirm that I have read and agree to the{" "}
              <Link href="/privacy" style={{ color: "#193DAA", textDecoration: "underline" }}>
                Privacy Policy
              </Link>
            </span>
          </label>
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

      <section style={{ position: "relative", padding: "clamp(52px, 7vw, 74px) var(--pad-x)", textAlign: "center", borderBottom: "1px solid #E2E0DA" }}>
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
        <Link href="/#contact" className="btn-hero-primary" style={{ marginTop: 22, display: "inline-flex" }}>
          Get Your Scoped Plan
        </Link>
        <CornerDots />
      </section>
    </>
  );
}
