"use client";

import { useEffect, useRef, useState } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { steps } from "@/lib/data";

const markerColors = ["var(--color-accent-pale)", "var(--color-accent-lighter)", "var(--color-accent-mid)", "var(--color-accent-deep)"];

/**
 * `variant="page"` drops the section head. On /how-we-work the page hero already
 * carries the eyebrow and the method's name, so rendering them again here put
 * two identical eyebrows and two headings within a screen of each other.
 */
export default function HowWeWork({ variant = "section" }: { variant?: "section" | "page" }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      {variant === "section" && (
        <>
          <div className="section-head">
            <div className="section-head-main">
              <div style={{ marginBottom: 18 }}>
                <SectionEyebrow>How we work</SectionEyebrow>
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
                The Thin Slice Method
              </h2>
            </div>
            <p className="section-head-note">
              No pyramid staffing.
              <br />
              The people who scope it also build it.
            </p>
          </div>

          <div className="section-rule" />
        </>
      )}

      <div className="vtimeline" style={{ marginTop: variant === "page" ? 0 : 40 }}>
        {steps.map((st, i) => (
          <div
            key={st.n}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            data-index={i}
            className={`vtimeline-row reveal${visible[i] ? " is-visible" : ""}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="vtimeline-node-col">
              <span
                className="vtimeline-marker"
                style={{ "--marker-color": markerColors[i % markerColors.length] } as React.CSSProperties}
              />
            </div>
            <div className="vtimeline-content">
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 700,
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color: markerColors[i % markerColors.length],
                }}
              >
                {st.week}
              </span>
              <h3 className="vtimeline-title">{st.title}</h3>
              <p className="vtimeline-body">{st.body}</p>
            </div>
          </div>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
