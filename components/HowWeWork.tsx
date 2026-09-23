"use client";

import { useEffect, useRef, useState } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { steps } from "@/lib/data";

const markerColors = ["#9DB8EE", "#5C81DF", "#2C55C4", "#132C7A"];

export default function HowWeWork() {
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
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>How we work</SectionEyebrow>
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
            The Thin Slice Method
          </h2>
        </div>
        <p className="section-head-note">
          No pyramid staffing.
          <br />
          The people who scope it also build it.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div className="vtimeline" style={{ marginTop: 40 }}>
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
                  fontFamily: "Geist, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
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
