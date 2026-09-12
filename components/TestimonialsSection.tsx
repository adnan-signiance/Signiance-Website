import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import Testimonials from "./Testimonials";

export default function TestimonialsSection() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Testimonials</SectionEyebrow>
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
            What clients say after we ship
          </h2>
        </div>
        <p className="section-head-note">
          Real feedback from the people
          <br />
          who signed off on the work.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <Testimonials />

      <CornerDots />
    </section>
  );
}
