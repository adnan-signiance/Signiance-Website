import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { models } from "@/lib/data";

export default function Engagements() {
  return (
    <section
      id="engage"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Engagements</SectionEyebrow>
          </div>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "-0.038em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Three ways to work with us
          </h2>
        </div>
        <p className="section-head-note">
          Start small, scale only if the outcome lands.
          <br />
          No annual lock-in, no bench time on your invoice.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div style={{ position: "relative", margin: "24px var(--bleed) 0", padding: "0 var(--pad-x)" }}>
        <div className="grid-engagements">
          {models.map((m, i) => (
            <div key={m.name} className="engagement-col">
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
                      background: "#FFFFFF",
                      display: "grid",
                      placeItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
                  </span>
                  <span
                    className="engagement-col-dot engagement-col-dot-end"
                    style={{
                      position: "absolute",
                      left: -7.5,
                      bottom: -7.5,
                      width: 15,
                      height: 15,
                      background: "#FFFFFF",
                      display: "grid",
                      placeItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
                  </span>
                </>
              )}
              <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {m.name}
                </h3>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "Geist, sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
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
              <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#55585C" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="5.4" stroke="#193DAA" strokeWidth="1.2" />
                  <path d="M7 4.2V7l2 1.4" stroke="#193DAA" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span style={{ whiteSpace: "nowrap" }}>{m.duration}</span>
              </div>
              <p style={{ flex: "0 0 auto", margin: 0, fontSize: 14, lineHeight: 1.6, color: "#43464A" }}>{m.body}</p>
              <div
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  paddingTop: 14,
                  borderTop: "1px solid #E2E0DA",
                }}
              >
                {m.includes.map((i) => (
                  <div key={i} style={{ flex: "0 0 auto", display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, lineHeight: 1.5, color: "#22252A" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 4 }}>
                      <path d="M2 6.4 4.4 8.8 10 3.2" stroke="#193DAA" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span>{i}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }}>
                <span className="btn-primary-arrow-in">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="btn-primary-label">{m.cta}</span>
                <span className="btn-primary-arrow-out">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                    <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <CornerDots />
    </section>
  );
}
