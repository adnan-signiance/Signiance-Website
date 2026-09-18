import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Services</SectionEyebrow>
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
            Where Cloud becomes Agentic AI
          </h2>
        </div>
        <p className="section-head-note">
          Five practices, one senior team.
          <br />
          Scoped in a week, delivered against outcomes.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div style={{ position: "relative", margin: "20px var(--bleed) 0", padding: "0 var(--pad-x)" }}>
        {services.map((sv, i) => (
          <a
            key={sv.id}
            href="#contact"
            className="service-row"
            style={i === 0 ? { borderTop: "none" } : undefined}
          >
            {i > 0 && (
              <>
                <span
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
                  style={{
                    position: "absolute",
                    right: -7.5,
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
              </>
            )}

            <div className="service-row-surface">
              <span className="service-num-large">{sv.no}</span>

              <div className="service-row-main">
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 6vw, 29px)",
                    letterSpacing: "-0.025em",
                    margin: 0,
                    color: "inherit",
                    textWrap: "balance",
                  }}
                >
                  {sv.title}
                </h3>
                <p className="service-row-body" style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#55585C", maxWidth: "100%" }}>
                  {sv.body}
                </p>
              </div>

              <svg
                className="service-arrow"
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 3 8 7 4 11" stroke="#193DAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
