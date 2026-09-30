"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const COUNT = testimonials.length;
const SLOT_STEP = 100;
const CENTER_Y = 150;
const REEL_HEIGHT = 300;
const INTERVAL_MS = 7500;
const ROLL_MS = 700;
const RISE_OFFSET = 40;
const QUOTE_ANIM_MS = 400;

// Every testimonial cycles through 3 visible slots (top/mid/bottom) plus,
// once there are more than 3 of them, a "waiting" spot just past the bottom
// slot. "age" is how many ticks ago this testimonial was last focused (0 =
// focused now); age determines its slot, so each tick every item's position
// is recomputed fresh from tIdx. The bottom item always continues sliding
// down past the visible area (clipped, no fade) — it just goes down and
// disappears. The item newly arriving at top does the opposite: it starts
// a little further down than the top slot and rises up into place, instead
// of sliding the long way across from wherever it used to be.
function slotFor(i: number, tIdx: number) {
  const age = (((tIdx - i) % COUNT) + COUNT) % COUNT;
  if (age === 0) return 0;
  if (age === 1) return 1;
  if (age === COUNT - 1) return -1;
  return 2;
}

function Avatar({
  initials,
  name,
  role,
  photo,
  focused,
}: {
  initials: string;
  name: string;
  role: string;
  photo?: string;
  focused: boolean;
}) {
  const size = focused ? 52 : 34;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            boxShadow: focused ? "0 0 0 2px var(--color-white), 0 0 0 4px var(--color-accent)" : "none",
            transition: `width ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), height ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), box-shadow ${ROLL_MS}ms ease`,
          }}
        />
      ) : (
        <span
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: focused ? "var(--color-accent)" : "var(--color-line-strong)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: focused ? 16 : 12,
            color: focused ? "var(--color-white)" : "var(--color-text-soft)",
            transition: `width ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), height ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), background-color ${ROLL_MS}ms ease, font-size ${ROLL_MS}ms ease, color ${ROLL_MS}ms ease`,
          }}
        >
          {initials}
        </span>
      )}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: focused ? 14 : 12,
            fontWeight: focused ? 600 : 500,
            color: focused ? "var(--color-ink)" : "var(--color-ink-soft)",
            whiteSpace: "nowrap",
            transition: `font-size ${ROLL_MS}ms ease, color ${ROLL_MS}ms ease`,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: focused ? 12 : 11,
            color: "var(--color-muted)",
            marginTop: 2,
            whiteSpace: "nowrap",
            transition: `font-size ${ROLL_MS}ms ease`,
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [tIdx, setTIdx] = useState(0);
  const [settled, setSettled] = useState(true);
  /** Explicit choice via the pause button. Sticky until pressed again. */
  const [userPaused, setUserPaused] = useState(false);
  /** Transient: the pointer is over the widget, or focus is inside it. */
  const [interacting, setInteracting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const prefersReducedMotion = usePrefersReducedMotion();

  // These are kept separate deliberately. Folding hover into the same flag as
  // the button meant focusing the button counted as a pause, so clicking it
  // immediately toggled back to playing.
  const autoplay = !userPaused && !interacting && !prefersReducedMotion;

  const goTo = (index: number) => {
    setTIdx(((index % COUNT) + COUNT) % COUNT);
    setSettled(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSettled(true));
    });
  };

  // Photos and logos are real image files — swapping an <img>'s src doesn't
  // clear the old pixels until the new file finishes loading, so without
  // this the previous photo/logo would visibly linger for a beat on every
  // rotation. Preloading everything up front means it's all already in the
  // browser cache before its testimonial ever comes up.
  useEffect(() => {
    testimonials.forEach((t) => {
      if (t.photo) new window.Image().src = t.photo;
      if (t.logo) new window.Image().src = t.logo;
    });
  }, []);

  // One single mechanism drives every visual change on a tick: content swaps
  // instantly (avatars move to their new slots, the quote/company swap to
  // the new testimonial) while "settled" is momentarily false, snapping the
  // entering-top avatar and the quote/company to their pre-animation state
  // with no transition; two rAFs later "settled" flips true and everything
  // eases into place together, in lockstep, over the same window. There's no
  // separate timer-based handoff for the quote, so it can't drift out of
  // sync with the avatars or flicker between two competing transitions.
  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => {
      setTIdx((i) => (i + 1) % COUNT);
      setSettled(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSettled(true));
      });
    }, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [autoplay]);

  const avMid = testimonials[tIdx];

  return (
    <div
      style={{ position: "relative", marginTop: 30, padding: "10px 0 48px" }}
      // Rotation stops while a visitor is reading or interacting, so a quote is
      // never pulled away mid-sentence.
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      {/* Announces each change to screen readers without moving focus. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Testimonial ${tIdx + 1} of ${COUNT}: ${avMid.name}, ${avMid.role} at ${avMid.company}`}
      </div>
      <div className="grid-testimonial">
        <div className="testimonial-reel" style={{ position: "relative", height: REEL_HEIGHT, overflow: "hidden" }}>
          {testimonials.map((t, i) => {
            const slot = slotFor(i, tIdx);
            const isEnteringTop = slot === -1 && !settled;
            // Slot 2 is "waiting, off past the bottom" — however many
            // testimonials share it, they must all sit fully below the
            // clipped viewport, or their tops would stack into a visible,
            // unreadable overlap right at the clip line.
            const y =
              slot === 2
                ? CENTER_Y + REEL_HEIGHT
                : CENTER_Y + slot * SLOT_STEP + (isEnteringTop ? RISE_OFFSET : 0);
            return (
              <div
                key={t.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: y,
                  transform: "translate(-50%, -50%)",
                  transition: isEnteringTop ? "none" : `top ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1)`,
                }}
              >
                <Avatar initials={t.initials} name={t.name} role={t.role} photo={t.photo} focused={slot === 0} />
              </div>
            );
          })}
        </div>
        <div>
          <div
            className={`testimonial-mobile-focus${settled ? " is-settled" : ""}`}
            style={{ opacity: settled ? 1 : 0, transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none" }}
          >
            <Avatar initials={avMid.initials} name={avMid.name} role={avMid.role} photo={avMid.photo} focused />
          </div>
          <div style={{ height: 56, display: "flex", alignItems: "center", marginBottom: 22 }}>
            {avMid.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avMid.logo}
                alt={avMid.company}
                style={{
                  display: "block",
                  height: 56,
                  width: "auto",
                  maxWidth: 260,
                  objectFit: "contain",
                  objectPosition: "left center",
                  opacity: settled ? 1 : 0,
                  transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none",
                }}
              />
            ) : (
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-lg)",
                  fontWeight: 600,
                  letterSpacing: "normal",
                  color: "var(--color-ink-soft)",
                  opacity: settled ? 1 : 0,
                  transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none",
                }}
              >
                {avMid.company}
              </div>
            )}
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--fs-quote)",
              lineHeight: 1.45,
              letterSpacing: "var(--tracking-snug)",
              margin: 0,
              minHeight: "calc(var(--fs-quote) * 1.45 * 3)",
              color: "var(--color-ink-soft)",
              maxWidth: "48ch",
              textWrap: "pretty",
              opacity: settled ? 1 : 0,
              transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none",
            }}
          >
            {avMid.quoteBefore}{" "}
            <span style={{ background: "var(--color-accent)", color: "var(--color-white)", fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>
              {avMid.quoteHighlight}
            </span>
            {avMid.quoteAfter}
          </p>
        </div>
      </div>
      <div className="testimonial-controls">
        {/* The pause / previous / next buttons were removed by design request.
            The dots remain the control surface: selecting one both navigates and
            stops the auto-advance, which keeps a mechanism to halt the movement
            (WCAG 2.2.2) alongside pause-on-hover, pause-on-focus, and the
            prefers-reduced-motion gate. */}
        <div className="testimonial-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`testimonial-dot${i === tIdx ? " is-active" : ""}`}
              onClick={() => {
                // Picking a testimonial deliberately also stops the rotation, so
                // the visitor's choice is not overwritten a few seconds later.
                setUserPaused(true);
                goTo(i);
              }}
              aria-label={`Show testimonial from ${t.name}, ${t.company}`}
              aria-current={i === tIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
