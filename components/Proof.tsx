import CornerDots from "./CornerDots";
import CaseStudies from "./CaseStudies";
import Testimonials from "./Testimonials";
import { metrics } from "@/lib/data";

export default function Proof() {
  return (
    <section
      id="proof"
      style={{ position: "relative", borderBottom: "1px solid #E2E0DA", padding: "58px 28px 60px" }}
    >
      <div style={{ maxWidth: 620, marginBottom: 38 }}>
        <div style={{ marginBottom: 18 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.17em",
              textTransform: "uppercase",
              color: "#64676B",
              whiteSpace: "nowrap",
            }}
          >
            Proof
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.04,
            letterSpacing: "-0.038em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Outcomes, not case-study theatre
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ paddingTop: 16, borderTop: "1px solid #C7CEE6" }}>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 46,
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

      <h3
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.025em",
          margin: "44px 0 0",
        }}
      >
        Case studies
      </h3>
      <CaseStudies />

      <h3
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.025em",
          margin: "48px 0 0",
        }}
      >
        Testimonials
      </h3>
      <Testimonials />

      <CornerDots />
    </section>
  );
}
