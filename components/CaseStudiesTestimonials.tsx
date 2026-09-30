import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import Testimonials from "./Testimonials";

export default function CaseStudiesTestimonials() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(38px, 5vw, 54px) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
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
      <Testimonials />
      <CornerDots />
    </section>
  );
}
