import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealHeading } from "./Reveal";
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
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Testimonials</SectionEyebrow>
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
            What clients say after we ship
          </RevealHeading>
        </div>
        <Reveal as="p" className="section-head-note" delay={0.15}>
          Real feedback from the people
          <br />
          who signed off on the work.
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <Testimonials />
      </Reveal>
      <CornerDots />
    </section>
  );
}
