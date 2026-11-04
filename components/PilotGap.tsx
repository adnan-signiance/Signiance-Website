import "../app/pilot-gap.css";
import CornerDots from "./CornerDots";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";

/**
 * "The gap": why AI pilots stall, between the hero and the services.
 *
 * It names the problem in the buyer's own words before the page starts selling the fix, so
 * the services below read as the answer to a list the visitor has just recognised. Five
 * failure modes set as large lines of type, each with its consequence beside it, and the
 * closing line as a field of brand blue that runs to the foot of the section.
 */
const FAILURES: { title: string; body: string }[] = [
  {
    title: "It breaks on real data.",
    body: "Worked perfectly on the test set. Falls apart on the messy inputs real users send.",
  },
  {
    title: "Every change is a gamble.",
    body: "No evals, no regression tests. Nobody knows if the new prompt made things better or worse.",
  },
  {
    title: "Failures are invisible.",
    body: "When it gives a bad answer, nobody can see why, or even that it happened.",
  },
  {
    title: "The inference bill keeps climbing.",
    body: "Model costs grew faster than usage, and nobody owns the line item.",
  },
  {
    title: "Security review stopped it cold.",
    body: "An enterprise customer sent a questionnaire your team can't answer yet.",
  },
];

export default function PilotGap() {
  return (
    <section
      id="gap"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        // No bottom padding: the closing field is flush with the section's foot.
        padding: "var(--section-pt) var(--pad-x) 0",
      }}
    >
      <div className="pilot-gap-head">
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
          Most AI never makes it past the demo.
        </RevealHeading>
        <Reveal as="p" className="pilot-gap-intro" delay={0.15}>
          Building something that works once is easy. Building something that works every day, on real data, at a cost
          you can defend, is where most teams get stuck.
        </Reveal>
      </div>

      <RevealGroup className="gap-rows" stagger={0.07}>
        {FAILURES.map((f) => (
          <RevealItem key={f.title} className="gap-row">
            <h3 className="gap-row-title">{f.title}</h3>
            <p className="gap-row-body">{f.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="gap-close">
        <p className="gap-close-line">
          That list is <span>what we fix.</span>
        </p>
      </Reveal>

      <CornerDots />
    </section>
  );
}
