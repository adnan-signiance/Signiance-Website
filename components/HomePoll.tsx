"use client";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { Reveal, RevealHeading } from "./Reveal";

/**
 * "Does any of this sound like your AI project?" The page's one live thing: five plain sentences a
 * business owner will recognise, each one a tick box, and a count underneath that says what it means.
 * Nothing is stored or sent. Without script it reads as the same five sentences.
 */
const SIGNS: string[] = [
  "It worked in the demo, but breaks with real customers.",
  "Nobody can say whether the latest change made it better or worse.",
  "When it gets something wrong, nobody notices until a customer complains.",
  "The AI bill keeps growing and nobody owns it.",
  "A big customer sent a security questionnaire and the deal stalled.",
];

export default function HomePoll() {
  const [on, setOn] = useState<boolean[]>(() => SIGNS.map(() => false));
  const [touched, setTouched] = useState(false);
  const count = on.filter(Boolean).length;

  const toggle = (i: number) => {
    setTouched(true);
    setOn((s) => s.map((v, j) => (j === i ? !v : v)));
  };

  const line = !touched
    ? "Tick anything that sounds familiar."
    : count === 0
      ? "Nothing ticked. If your AI is already running smoothly you may not need us yet, and a short call will tell you either way."
      : `${count} of 5 sound like your project. These are exactly what the first week of our work fixes.`;

  return (
    <section id="gap" className="hp-sec hp-sec--tint">
      <div className="hp-grid hp-poll-head">
        <RevealHeading className="hp-title">Does any of this sound like your AI project?</RevealHeading>
        <Reveal as="p" className="hp-note" delay={0.1}>
          Most AI projects stall in the same few places. It takes ten seconds, and nothing you tick is stored.
        </Reveal>
      </div>

      <ul className="hp-checks">
        {SIGNS.map((s, i) => (
          <Reveal as="li" key={s} className="hp-check" delay={0.06 * i}>
            <div className="hp-check-row" data-on={on[i] ? "true" : "false"} onClick={() => toggle(i)}>
              <button type="button" className="hp-check-box" aria-pressed={on[i]} aria-labelledby={`sign-${i}`}>
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6.4 4.8 9 10 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="hp-check-text" id={`sign-${i}`}>
                {s}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="hp-grid hp-verdict" delay={0.1}>
        <p className="hp-verdict-figure" aria-live="polite">
          {count} of 5
        </p>
        <div className="hp-verdict-side">
          <p className="hp-statement">{line}</p>
          <Link href="/#contact" className="btn-hero-primary">
            Book a scoping call
          </Link>
        </div>
      </Reveal>

      <CornerDots bg="transparent" />
    </section>
  );
}
