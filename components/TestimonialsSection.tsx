import CornerDots from "./CornerDots";
import { Reveal, RevealHeading } from "./Reveal";
import Testimonials from "./Testimonials";

export default function TestimonialsSection() {
  return (
    <section
      className="home-section home-testimonials"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
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
      </div>

      <Reveal delay={0.1}>
        <Testimonials />
      </Reveal>

      <CornerDots />
    </section>
  );
}
