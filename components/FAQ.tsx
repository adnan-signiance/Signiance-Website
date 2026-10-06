"use client";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>FAQ</SectionEyebrow>
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
            Questions we get on the first call
          </RevealHeading>
        </div>
        <Reveal as="p" className="section-head-note" delay={0.15}>
          What most prospects ask
          <br />
          before they book a scoping call.
        </Reveal>
      </div>

      <div className="section-rule" />

      <RevealGroup className="faq-list" style={{ marginTop: 18 }} stagger={0.07}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const questionId = `faq-question-${i}`;
          const answerId = `faq-answer-${i}`;
          return (
            <RevealItem key={f.question} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                id={questionId}
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.question}
                <span className="faq-icon">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {/* `inert` keeps the collapsed answer out of the accessibility
                  tree and the tab order while still allowing the CSS
                  grid-rows transition to animate it — `hidden` would remove it
                  from layout and kill the animation. */}
              <div className="faq-answer" id={answerId} role="region" aria-labelledby={questionId} inert={!isOpen}>
                <div className="faq-answer-inner">
                  <p>{f.answer}</p>
                  {f.link && (
                    <p className="faq-answer-link">
                      <Link href={f.link.href}>{f.link.label}</Link>
                    </p>
                  )}
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <CornerDots />
    </section>
  );
}
