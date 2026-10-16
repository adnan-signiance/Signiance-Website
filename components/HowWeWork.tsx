"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { m } from "motion/react";
import CornerDots from "./CornerDots";
import HowWeWorkSlides from "./HowWeWorkSlides";
import { useRevisit } from "./RouteMemory";
import { springSnappy } from "@/lib/motion";
import { steps } from "@/lib/data";

// The rail pill slides by exactly one item plus one gap per step, so both are
// defined once here and handed to the CSS as custom properties.
const RAIL_ITEM = 64;
const RAIL_GAP = 8;

const markerColors = ["var(--color-accent-pale)", "var(--color-accent-lighter)", "var(--color-accent-mid)", "var(--color-accent-deep)"];

// The week labels are text, so they cannot use the marker blues: the first two
// measure 2.0:1 and 3.7:1 on white against the 4.5:1 AA needs at this size. Same
// light-to-deep progression as the markers, starting at the first blue that passes.
const labelColors = ["var(--color-accent-mid)", "var(--color-accent-mid)", "var(--color-accent)", "var(--color-accent-deep)"];

/**
 * The homepage section is the pinned, slide-style layout in HowWeWorkSlides.
 * `variant="page"` (the /how-we-work page) keeps the full vertical timeline with
 * its sticky rail, since the page hero already carries the eyebrow and the
 * method's name and there is room to read every step in sequence.
 */
export default function HowWeWork({ variant = "section" }: { variant?: "section" | "page" }) {
  return variant === "page" ? <HowWeWorkTimeline /> : <HowWeWorkSlides />;
}

function HowWeWorkTimeline() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // A repeat view of the page shows every step straight away instead of re-revealing them.
  const revisit = useRevisit();
  const [visible, setVisible] = useState<boolean[]>(() => steps.map(() => revisit));
  const [active, setActive] = useState(0);

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

  // Which step is mid-screen, for the sticky rail. The band is a thin slice
  // across the middle of the viewport so only one row is in it at a time.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.5, 1] }
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
      <div
        className="work-split"
        style={{ "--rail-item": `${RAIL_ITEM}px`, "--rail-gap": `${RAIL_GAP}px` } as CSSProperties}
      >
        {/* Decorative: the timeline beside it carries the same four steps in
            full, so this only needs to be hidden from assistive technology. */}
        <aside className="work-rail" aria-hidden="true">
          <ol>
            <m.span
              className="work-rail-pill"
              animate={{ y: active * (RAIL_ITEM + RAIL_GAP) }}
              transition={springSnappy}
            />
            {steps.map((st, i) => (
              <li key={st.n} className={i === active ? "is-active" : undefined}>
                <span className="work-rail-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="work-rail-text">
                  <span className="work-rail-week">{st.week}</span>
                  <span className="work-rail-title">{st.title}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="vtimeline" style={{ marginTop: 0 }}>
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
                    color: labelColors[i % labelColors.length],
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
      </div>

      <CornerDots />
    </section>
  );
}
