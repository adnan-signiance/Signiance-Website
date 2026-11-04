import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { models } from "@/lib/data";

export default function Engagements() {
  return (
    <section
      id="engage"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Engagements</SectionEyebrow>
          </Reveal>
          <RevealHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-tight)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Three ways to work with us
          </RevealHeading>
        </div>
        <Reveal as="p" className="section-head-note" delay={0.15}>
          Start small, scale only if the outcome lands.
          <br />
          No annual lock-in, no bench time on your invoice.
        </Reveal>
      </div>

      <div className="section-rule" />

      <div style={{ position: "relative", margin: "24px var(--bleed) 0", padding: "0 var(--pad-x)" }}>
        <RevealGroup className="grid-engagements" stagger={0.12}>
          {models.map((m, i) => (
            <RevealItem key={m.name} className="engagement-col">
              {i > 0 && (
                <>
                  <span
                    className="engagement-col-dot engagement-col-dot-start"
                    style={{
                      position: "absolute",
                      left: -7.5,
                      top: -7.5,
                      width: 15,
                      height: 15,
                      background: "var(--color-white)",
                      display: "grid",
                      placeItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span className="plus-mark" />
                  </span>
                  <span
                    className="engagement-col-dot engagement-col-dot-end"
                    style={{
                      position: "absolute",
                      left: -7.5,
                      bottom: -7.5,
                      width: 15,
                      height: 15,
                      background: "var(--color-white)",
                      display: "grid",
                      placeItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span className="plus-mark" />
                  </span>
                </>
              )}
              <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "var(--fs-h3)",
                    letterSpacing: "var(--tracking-snug)",
                    margin: 0,
                  }}
                >
                  {m.name}
                </h3>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--fs-xs)",
                    fontWeight: 500,
                    letterSpacing: "normal",
                    textTransform: "uppercase",
                    color: m.badgeFg,
                    background: m.badgeBg,
                    textShadow: "0 0 5px rgba(10,24,80,0.55), 0 1px 2px rgba(10,24,80,0.45)",
                    borderRadius: 3,
                    padding: "5px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.badge}
                </span>
              </div>
              <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: "var(--fs-xs)", color: "var(--color-text-soft)" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.4" stroke="var(--color-accent)" strokeWidth="1.2" />
                  <path d="M7 4.2V7l2 1.4" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span style={{ whiteSpace: "nowrap" }}>{m.duration}</span>
              </div>
              <p style={{ flex: "0 0 auto", margin: 0, fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-text)" }}>{m.body}</p>
              <div
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  paddingTop: 14,
                  borderTop: "1px solid var(--color-line)",
                }}
              >
                {m.includes.map((i) => (
                  <div key={i} style={{ flex: "0 0 auto", display: "flex", gap: 9, alignItems: "flex-start", fontSize: "var(--fs-sm)", lineHeight: 1.5, color: "var(--color-ink-soft)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 4 }}>
                      <path d="M2 6.4 4.4 8.8 10 3.2" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span>{i}</span>
                  </div>
                ))}
              </div>
              {/* Root-relative, not a bare `#contact`: the booking section lives
                  on the homepage, and this block now renders on /how-we-work
                  where that anchor has no target. */}
              <Link href="/#contact" className="btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                <span className="btn-primary-arrow-in">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-tint)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="btn-primary-label">{m.cta}</span>
                <span className="btn-primary-arrow-out">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-tint)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <CornerDots />
    </section>
  );
}
