import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { metrics } from "@/lib/data";

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

      <div className="grid-metrics" style={{ marginTop: 24 }}>
        {metrics.map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(34px, 3.8vw, 46px)",
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              {m.value}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "#43464A", maxWidth: "22ch" }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
