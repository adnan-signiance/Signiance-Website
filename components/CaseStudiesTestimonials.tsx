import CornerDots from "./CornerDots";
import Testimonials from "./Testimonials";

export default function CaseStudiesTestimonials() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(38px, 5vw, 54px) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 22, letterSpacing: "-0.025em", margin: 0 }}>
        Testimonials
      </h3>
      <Testimonials />
      <CornerDots />
    </section>
  );
}
