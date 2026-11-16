"use client";

import "../app/pilot-gap.css";
import { useState } from "react";
import CornerDots from "./CornerDots";
import { GAP_ARTEFACTS } from "./GapArtefacts";
import { Reveal, RevealHeading } from "./Reveal";

/**
 * "The gap": why AI pilots stall, between the hero and the services.
 *
 * It names the problem in the buyer's own words before the page starts selling the fix, so the
 * services below read as the answer to a list the visitor has just recognised. Five failure
 * modes, each with the screen where it shows up: pick one (hover, focus or tap) and that screen
 * opens beside the list. That is also why the heading has no sentence beside it: the right-hand
 * side is the example. The closing line is a field of brand blue that runs to the foot of the
 * section.
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
  const [active, setActive] = useState(0);

  return (
    <section
      id="gap"
      className="home-section home-gap"
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
      </div>

      <Reveal className="gap-ex">
        <div className="gap-ex-list" role="tablist" aria-label="Why AI stalls" aria-orientation="vertical">
          {FAILURES.map((f, i) => {
            const Art = GAP_ARTEFACTS[i];
            const on = i === active;
            return (
              <div key={f.title} className={`gap-ex-item${on ? " is-active" : ""}`}>
                <button
                  type="button"
                  role="tab"
                  id={`gap-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`gap-panel-${i}`}
                  className="gap-ex-tab"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <h3 className="gap-ex-title">{f.title}</h3>
                  <p className="gap-ex-body">{f.body}</p>
                </button>
                {/* On a phone the example opens inside its own row, so it is next to the words that
                    name it instead of far below the list. */}
                <div className="gap-ex-inline" aria-hidden="true">
                  <Art />
                </div>
              </div>
            );
          })}
        </div>

        <div className="gap-ex-panel">
          {GAP_ARTEFACTS.map((Art, i) => (
            <div
              key={i}
              id={`gap-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`gap-tab-${i}`}
              className={`gap-ex-art${i === active ? " is-active" : ""}`}
              hidden={false}
              aria-hidden={i !== active}
            >
              <Art />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="gap-close">
        <p className="gap-close-line">
          That list is <span>what we fix.</span>
        </p>
      </Reveal>

      <CornerDots />
    </section>
  );
}
