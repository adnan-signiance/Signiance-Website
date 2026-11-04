"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import CornerDots from "./CornerDots";
import HowWeWorkDoc from "./HowWeWorkDocs";
import { Reveal, RevealHeading } from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { steps } from "@/lib/data";

const COUNT = steps.length;

/** "WEEK 01" reads as "Week 1"; "AFTER" as "After launch". */
const weekLabel = (week: string) => {
  const m = week.match(/^WEEK\s*0*(\d+)$/i);
  return m ? `Week ${m[1]}` : "After launch";
};

/**
 * Homepage "How we work", laid out like a slide deck.
 *
 * The whole section — heading and slide together — pins under the header and
 * lets ordinary page scroll step through it, so there is never a blank band above
 * or below the content while it is pinned. The slide is one framed unit: a
 * contents column on the left listing the steps, the current step in full on the
 * right, and a segmented meter along the bottom that fills as you scroll.
 *
 * Nothing hijacks the scroll. The track is simply tall and the content inside it
 * is `position: sticky`, so wheel speed, momentum and the scrollbar behave as
 * usual.
 *
 * Below 860px (or in a short window) the pinning is dropped and the steps stack
 * as plain blocks, which reads better on a phone; without JavaScript the same
 * stacked layout comes from the <noscript> block in the root layout.
 */
export default function HowWeWorkSlides() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frame = 0;

    // Progress through the pinned stretch, 0..1. The content sticks while the
    // track's top travels from `stickyTop` down to (track height - sticky height)
    // above it, so that distance is the range; each step owns an equal share.
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const range = track.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return; // unpinned (narrow screens): the steps are simply stacked

      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const raw = (stickyTop - track.getBoundingClientRect().top) / range;
      const progress = Math.min(1, Math.max(0, raw));

      sticky.style.setProperty("--hw-p", progress.toFixed(4));
      setActive((prev) => {
        const next = Math.min(COUNT - 1, Math.floor(progress * COUNT));
        return prev === next ? prev : next;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Clicking a step scrolls to the middle of that step's share of the track.
  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const range = track.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return; // unpinned: the pane is hidden here anyway
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;

      const top = trackTop - stickyTop + ((index + 0.5) / COUNT) * range;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion]
  );

  return (
    <section
      id="work"
      style={{
        position: "relative",
        borderBottom: "1px solid var(--color-line)",
        // No bottom padding: the pinned block carries its own, so the slide ends
        // flush with the section's bottom rule when the pin releases.
        padding: "var(--section-pt) var(--pad-x) 0",
      }}
    >
      <div ref={trackRef} className="hw-track" style={{ "--hw-n": COUNT } as CSSProperties}>
        <div ref={stickyRef} className="hw-sticky" data-step={active} style={{ "--hw-active": active } as CSSProperties}>
          <div className="section-head">
            <div className="section-head-main">
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
                The Thin Slice Method
              </RevealHeading>
            </div>
            <Reveal as="p" className="section-head-note" delay={0.15}>
              No pyramid staffing. The people who scope it also build it, and can run it after.
            </Reveal>
          </div>

          <div className="hw-slide">
            <aside className="hw-pane" aria-label="Steps">
              <ol className="hw-pane-list">
                {steps.map((st, i) => {
                  const state = i === active ? " is-active" : i < active ? " is-done" : "";
                  return (
                    <li key={st.n} className={`hw-step${state}`} style={{ "--i": i } as CSSProperties}>
                      <button
                        type="button"
                        className="hw-step-item"
                        aria-current={i === active ? "step" : undefined}
                        onClick={() => goTo(i)}
                      >
                        <span className="hw-pane-text">
                          <span className="hw-pane-week">{weekLabel(st.week)}</span>
                          <span className="hw-pane-title">{st.title}</span>
                        </span>
                        {/* Finished steps are ticked off. */}
                        <svg className="hw-step-done" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                          <circle cx="9" cy="9" r="8.25" fill="currentColor" />
                          <path d="m5.4 9.3 2.5 2.5 4.7-5.2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {/* A joint on the divider below, pointing on to the next step. */}
                      {i < COUNT - 1 && (
                        <span className="hw-step-joint" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2v7m0 0L3 6.2M6 9l3-2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </aside>

            <div className="hw-panels">
              {steps.map((st, i) => {
                const state = i === active ? "is-active" : i < active ? "is-past" : "";
                const next = steps[i + 1];
                return (
                  <article key={st.n} className={`hw-panel ${state}`} data-index={i}>
                    <div className="hw-panel-main">
                      <div className="hw-panel-top">
                        <span className="hw-panel-week">{weekLabel(st.week)}</span>
                      </div>
                      <h3 className="hw-panel-title">{st.title}</h3>
                      <p className="hw-panel-body">{st.body}</p>
                      <ul className="hw-lands">
                        {st.lands.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {next && (
                        <span className="hw-panel-next" aria-hidden="true">
                          <span className="hw-panel-next-label">Next</span>
                          <span className="hw-panel-next-title">{next.title}</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2.5v8m0 0L3.8 7.4M7 10.5l3.2-3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
                    </div>
                    {/* What lands that week, drawn as the document itself. Decorative: the copy
                        beside it says the same in words. */}
                    <div className="hw-panel-art" aria-hidden="true">
                      <HowWeWorkDoc index={i} />
                    </div>
                  </article>
                );
              })}

              {/* One segment per step; the current one fills as you scroll through it. */}
              <div className="hw-meter" aria-hidden="true">
                {steps.map((st, i) => (
                  <span key={st.n} className="hw-meter-seg" style={{ "--i": i } as CSSProperties} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CornerDots />
    </section>
  );
}
