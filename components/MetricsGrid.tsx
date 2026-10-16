"use client";

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/lib/data";
import { onCurtainClear } from "@/lib/curtainSignal";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useHydrated } from "@/lib/useHydrated";
import { useRevisit } from "./RouteMemory";

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

function Counter({ target, suffix, start, skip }: { target: number; suffix: string; start: boolean; skip: boolean }) {
  const [animated, setAnimated] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hydrated = useHydrated();

  // Server render and the hydration pass show the real figure, so crawlers and
  // visitors without JavaScript see "5 wks" rather than "0 wks". Only once the
  // client has taken over does the value reset to zero ready to count up — which
  // happens well before the section scrolls into view.
  // `skip`: a repeat view of the page shows the final figure without counting up again.
  const display = !hydrated || prefersReducedMotion || skip ? target : animated;

  useEffect(() => {
    if (!start || prefersReducedMotion || skip) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_MS, 1);
      setAnimated(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, prefersReducedMotion, skip]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

export default function MetricsGrid({ style, bordered }: { style?: React.CSSProperties; bordered?: boolean }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const revisit = useRevisit();
  const [visible, setVisible] = useState(revisit);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    let cancelCurtainWait: (() => void) | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          // Satisfying the threshold doesn't mean a human can see it yet —
          // the page-transition curtain may still be covering the page.
          cancelCurtainWait = onCurtainClear(() => setVisible(true));
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelCurtainWait?.();
    };
  }, []);

  return (
    <div ref={gridRef} className={bordered ? "grid-cs-metrics-bordered" : "grid-metrics"} style={style}>
      {metrics.map((m, i) => {
        const { target, suffix } = parseMetric(m.value);
        const revealContent = (
          <>
            <div
              className="metric-value"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(34px, 3.8vw, 46px)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {target === null ? m.value : <Counter target={target} suffix={suffix} start={visible} skip={revisit} />}
            </div>
            <div className="metric-label" style={{ marginTop: 10, fontSize: "var(--fs-sm)", lineHeight: 1.5, color: "var(--color-text)", maxWidth: "22ch" }}>
              {m.label}
            </div>
          </>
        );

        // In bordered mode, the reveal fade/rise transform lives on an inner
        // wrapper, never on `.metric-cell` itself — the dots above are
        // measured from that cell's own rect once, on mount, and a transform
        // on the measured element would bake in whatever offset it happened
        // to be mid- (or pre-) animation at that instant, since a CSS
        // transform alone never triggers the ResizeObserver that would
        // otherwise recompute them.
        if (bordered) {
          return (
            <div key={m.label} className="metric-cell">
              <div className={`reveal${visible ? " is-visible" : ""}`} style={{ transitionDelay: `${i * 80}ms` }}>
                {revealContent}
              </div>
            </div>
          );
        }

        return (
          <div
            key={m.label}
            className={`reveal${visible ? " is-visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {revealContent}
          </div>
        );
      })}
    </div>
  );
}
