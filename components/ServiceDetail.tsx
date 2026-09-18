import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import FeatureCard from "./FeatureCard";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
import { services, caseStudyEntries, type Service } from "@/lib/data";

const BackArrow = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M6.5 1 2.5 5l4 4" stroke="#6A6D71" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GoArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServiceDetail({ service }: { service: Service }) {
  const relatedCases = caseStudyEntries.filter((c) => c.category === service.short).slice(0, 3);
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);
  const accent = serviceColor[service.id];
  const icon = serviceIcon[service.id];

  return (
    <>
      <section style={{ position: "relative", padding: "clamp(32px, 5vw, 48px) var(--pad-x) 0", borderBottom: "1px solid #E2E0DA" }}>
        <Link
          href="/services"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6A6D71", textDecoration: "none" }}
        >
          <BackArrow />
          All services
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
            {service.no} / 05 · {service.short}
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
            maxWidth: "24ch",
            textWrap: "balance",
          }}
        >
          {service.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>{service.long}</p>

        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/#contact" className="btn-hero-primary">
            Get Your Scoped Plan
          </Link>
        </div>

        <div style={{ position: "relative", margin: "36px calc(var(--pad-x) * -1) 0", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt=""
            style={{ display: "block", width: "100%", height: "clamp(200px, 28vw, 380px)", objectFit: "cover" }}
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

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA" }}>
        <SectionEyebrow>What it is</SectionEyebrow>
        <p style={{ margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "#22252A", maxWidth: "68ch" }}>
          {service.whatIsIt}
        </p>

        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: "-0.02em", marginTop: 40 }}>
          What's included
        </h3>
        <div className="grid-3col" style={{ marginTop: 22 }}>
          {service.capabilities.map((c) => (
            <FeatureCard key={c.title} icon="check-shield" title={c.title} body={c.body} color={accent} />
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B8E86", marginBottom: 12 }}>
            Tech stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {service.techStack.map((t) => (
              <span key={t} className="cs-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)", borderBottom: "1px solid #E2E0DA", background: "#EEF2FB" }}>
        <SectionEyebrow>Who it's for</SectionEyebrow>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16, maxWidth: "62ch" }}>
          {service.whoItsFor.map((w) => (
            <div key={w} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.6, color: "#22252A" }}>
              <span style={{ flex: "0 0 auto", marginTop: 2 }}>
                <PracticeIcon name="check-shield" color={accent} size={18} />
              </span>
              {w}
            </div>
          ))}
        </div>
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
          <div className="grid-3col" style={{ marginTop: 24 }}>
            {relatedCases.map((r) => (
              <Link
                key={r.id}
                href={`/case-studies/${r.slug}`}
                className="cs-card"
                style={{ border: "1px solid #D6D3CB", borderRadius: 14, overflow: "hidden", display: "block", color: "inherit" }}
              >
                <div style={{ overflow: "hidden", height: 140 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="cs-img" src={r.image} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px 18px 20px" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71" }}>{r.tag}</div>
                  <h4
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      letterSpacing: "-0.02em",
                      margin: "6px 0 0",
                    }}
                  >
                    {r.title}
                  </h4>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12,
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "#193DAA",
                    }}
                  >
                    Read case study
                    <GoArrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <CornerDots />
        </section>
      )}

      <section style={{ padding: "var(--section-pt) var(--pad-x) var(--section-pb)" }}>
        <SectionEyebrow>Other practices</SectionEyebrow>
        <div className="grid-3col" style={{ marginTop: 20 }}>
          {otherServices.map((s) => {
            const otherAccent = serviceColor[s.id];
            return (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                style={{ display: "block", borderTop: `2px solid ${otherAccent}`, paddingTop: 16, color: "inherit" }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: `${otherAccent}17`,
                  }}
                >
                  <PracticeIcon name={serviceIcon[s.id]} color={otherAccent} size={16} />
                </span>
                <h4
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "-0.02em",
                    margin: "12px 0 0",
                  }}
                >
                  {s.title}
                </h4>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12.5, fontWeight: 500, color: otherAccent }}>
                  See details
                  <GoArrow />
                </span>
              </Link>
            );
          })}
        </div>
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
          Not sure this is the right practice?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          Tell us the workflow. We&apos;ll tell you which of the five gets you there fastest.
        </p>
        <Link href="/#contact" className="btn-hero-primary" style={{ marginTop: 22, display: "inline-flex" }}>
          Get Your Scoped Plan
        </Link>
      </section>
    </>
  );
}
