import "../app/why-signiance.css";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealHeading } from "./Reveal";

/**
 * "Why Signiance": the positioning statement, set after the services so the visitor has seen
 * what we do before being told why we are the ones to do it. Words only, on purpose: it is
 * the one place on the page that makes the argument in sentences.
 */
export default function WhySigniance() {
  return (
    <section
      id="why"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <Reveal style={{ marginBottom: 18 }}>
        <SectionEyebrow>Why Signiance</SectionEyebrow>
      </Reveal>
      <RevealHeading className="why-title">
        Most AI shops have never run production. We&apos;ve been running it for twelve years.
      </RevealHeading>

      <div className="section-rule" />

      <Reveal as="p" className="why-body" delay={0.1}>
        AI prototype shops build impressive demos and move on. Large consultancies arrive in six months with a staffing
        pyramid. We&apos;re a senior team that has spent over a decade keeping cloud systems up, now applying that same
        discipline to AI: evals instead of vibes, dashboards instead of guesswork, and an owner when something breaks.
      </Reveal>

      <CornerDots />
    </section>
  );
}
