import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import Testimonials from "./Testimonials";

export default function TestimonialsSection() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
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
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-tight)",
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

      <div className="section-rule" />

      <Testimonials />

      <CornerDots />
    </section>
  );
}
