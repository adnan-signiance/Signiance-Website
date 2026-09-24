"use client";

import { useState } from "react";
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
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <SectionEyebrow>FAQ</SectionEyebrow>
      </div>
      <h2
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: "var(--fs-h2)",
          lineHeight: 1.04,
          letterSpacing: "-0.038em",
          margin: 0,
          textWrap: "balance",
        }}
      >
        Questions we get on the first call
      </h2>

      <div className="faq-list" style={{ marginTop: 32 }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.question} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.question}
                <span className="faq-icon">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{f.answer}</p>
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
