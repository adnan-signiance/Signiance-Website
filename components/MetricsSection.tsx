"use client";

import { useEffect, useRef, useState } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { metrics } from "@/lib/data";

const COUNT_MS = 1400;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Every metric's value is a leading integer plus a trailing unit — "3 wks",
// "30%", "50", "20+" — so the count-up only has to animate the number and
// leave the unit alone, instead of parsing/animating the string as a whole.
function parseMetric(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: null, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

function Counter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_MS, 1);
      setDisplay(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

export default function MetricsSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proof"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        background: "#FFFFFF",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Proof</SectionEyebrow>
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
            Outcomes, not case-study theatre
          </h2>
        </div>
        <p className="section-head-note" style={{ maxWidth: 400 }}>
          Every engagement shipped to production
          <br />
          and measured against a number that mattered.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div ref={gridRef} className="grid-metrics" style={{ marginTop: 24 }}>
        {metrics.map((m, i) => {
          const { target, suffix } = parseMetric(m.value);
          return (
            <div
              key={m.label}
              className={`reveal${visible ? " is-visible" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(34px, 3.8vw, 46px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {target === null ? m.value : <Counter target={target} suffix={suffix} start={visible} />}
              </div>
              <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "#43464A", maxWidth: "22ch" }}>
                {m.label}
              </div>
            </div>
          );
        })}
      </div>

      <CornerDots />
    </section>
  );
}
