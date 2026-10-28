import "../app/pilot-gap.css";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";

/**
 * "The gap": why AI pilots stall, between the logo strip and the services.
 *
 * It names the problem in the buyer's own words before the page starts selling the fix, so
 * the services below read as the answer to a list the visitor has just recognised. Five
 * failure modes in a hairline grid, with the closing line as a sixth cell so the grid ends
 * square instead of on a gap.
 */
const CARDS: { title: string; body: string }[] = [
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
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="pilot-gap-head">
        <Reveal style={{ marginBottom: 18 }}>
          <SectionEyebrow>The gap</SectionEyebrow>
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
          Most AI never makes it past the demo.
        </RevealHeading>
        <Reveal as="p" className="pilot-gap-intro" delay={0.15}>
          Building something that works once is easy. Building something that works every day, on real data, at a cost
          you can defend, is where most teams get stuck.
        </Reveal>
      </div>

      <div className="section-rule" />

      <RevealGroup className="grid-pilot-gap" style={{ marginTop: 24 }} stagger={0.07} spotlight>
        {CARDS.map((c, i) => (
          <RevealItem key={c.title} className="pilot-gap-cell" spotlight>
            <span className="pilot-gap-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="pilot-gap-title">{c.title}</h3>
            <p className="pilot-gap-body">{c.body}</p>
          </RevealItem>
        ))}
        <RevealItem className="pilot-gap-cell pilot-gap-cell--close">
          <p className="pilot-gap-close">
            That list is <span>what we fix.</span>
          </p>
        </RevealItem>
      </RevealGroup>

      <CornerDots />
    </section>
  );
}
