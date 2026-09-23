import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import MetricsGrid from "./MetricsGrid";

export default function MetricsSection() {
  return (
    <section
      id="proof"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        background: "#FFFFFF",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Proof</SectionEyebrow>
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
            Outcomes, not case-study theatre
          </h2>
        </div>
        <p className="section-head-note" style={{ maxWidth: 400 }}>
          Every engagement shipped to production
          <br />
          and measured against a number that mattered.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <MetricsGrid style={{ marginTop: 24 }} />

      <CornerDots />
    </section>
  );
}
