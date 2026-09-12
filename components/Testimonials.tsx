"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

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
  focused,
}: {
  initials: string;
  name: string;
  role: string;
  focused: boolean;
}) {
  const size = focused ? 52 : 34;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: focused ? "#193DAA" : "#D6D3CB",
          display: "grid",
          placeItems: "center",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: focused ? 16 : 12,
          color: focused ? "#FFFFFF" : "#55585C",
          transition: `width ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), height ${ROLL_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1), background-color ${ROLL_MS}ms ease, font-size ${ROLL_MS}ms ease, color ${ROLL_MS}ms ease`,
        }}
      >
        {initials}
      </span>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: focused ? 14 : 12,
            fontWeight: focused ? 600 : 500,
            color: focused ? "#131417" : "#22252A",
            whiteSpace: "nowrap",
            transition: `font-size ${ROLL_MS}ms ease, color ${ROLL_MS}ms ease`,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: focused ? 12 : 11,
            color: "#6A6D71",
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
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // The logos are external images (Wikimedia URLs) — swapping an <img>'s src
  // doesn't clear the old pixels until the new file finishes downloading, so
  // without this the previous logo would visibly linger for a beat on every
  // rotation. Preloading all of them up front means every logo is already in
  // the browser cache long before its testimonial ever comes up, so the swap
  // is instant.
  useEffect(() => {
    testimonials.forEach((t) => {
      const img = new window.Image();
      img.src = t.logo;
    });
  }, []);

  // One single mechanism drives every visual change on a tick: content swaps
  // instantly (avatars move to their new slots, the quote/logo swap to the
  // new testimonial) while "settled" is momentarily false, snapping the
  // entering-top avatar and the quote/logo to their pre-animation state with
  // no transition; two rAFs later "settled" flips true and everything eases
  // into place together, in lockstep, over the same window. There's no
  // separate timer-based handoff for the quote, so it can't drift out of
  // sync with the avatars or flicker between two competing transitions.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTIdx((i) => (i + 1) % COUNT);
      setSettled(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSettled(true));
      });
    }, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  const avMid = testimonials[tIdx];

  return (
    <div style={{ position: "relative", marginTop: 30, padding: "10px 0 48px" }}>
      <div className="grid-testimonial">
        <div className="testimonial-reel" style={{ position: "relative", height: REEL_HEIGHT, overflow: "hidden" }}>
          {testimonials.map((t, i) => {
            const slot = slotFor(i, tIdx);
            const isEnteringTop = slot === -1 && !settled;
            const y = CENTER_Y + slot * SLOT_STEP + (isEnteringTop ? RISE_OFFSET : 0);
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
                <Avatar initials={t.initials} name={t.name} role={t.role} focused={slot === 0} />
              </div>
            );
          })}
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avMid.logo}
            alt={avMid.logoAlt}
            style={{
              display: "block",
              height: 22,
              marginBottom: 20,
              opacity: settled ? 1 : 0,
              transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none",
            }}
          />
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: "var(--fs-quote)",
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
              margin: 0,
              color: "#22252A",
              maxWidth: "48ch",
              textWrap: "pretty",
              opacity: settled ? 1 : 0,
              transition: settled ? `opacity ${QUOTE_ANIM_MS}ms ease` : "none",
            }}
          >
            {avMid.quoteBefore}{" "}
            <span style={{ background: "#EEF2FB", color: "#131417", padding: "1px 6px", borderRadius: 3 }}>
              {avMid.quoteHighlight}
            </span>
            {avMid.quoteAfter}
          </p>
        </div>
      </div>
      <div style={{ position: "absolute", right: 0, bottom: 10, display: "flex", gap: 6 }}>
        {testimonials.map((t, i) => (
          <span
            key={t.name}
            style={{
              width: i === tIdx ? 22 : 8,
              height: 4,
              borderRadius: 2,
              background: i === tIdx ? "#193DAA" : "#D6D3CB",
              transition: "all .35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
