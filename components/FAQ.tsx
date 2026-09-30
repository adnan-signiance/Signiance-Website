"use client";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
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
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>FAQ</SectionEyebrow>
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
            Questions we get on the first call
          </h2>
        </div>
        <p className="section-head-note">
          What most prospects ask
          <br />
          before they book a scoping call.
        </p>
      </div>

      <div className="section-rule" />

      <div className="faq-list" style={{ marginTop: 18 }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const questionId = `faq-question-${i}`;
          const answerId = `faq-answer-${i}`;
          return (
            <div key={f.question} className={`faq-item${isOpen ? " is-open" : ""}`}>
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
            </div>
          );
        })}
      </div>

      <CornerDots />
    </section>
  );
}
