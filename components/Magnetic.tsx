"use client";

import type { PointerEvent, ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Pulls its child a little toward the pointer, on a spring. Wraps rather than
 * replaces the element, so it works around a Next `<Link>` without needing the
 * link itself to be a motion component.
 *
 * Mouse only: a touch has no hover to attract, and the pointer position at the
 * moment of a tap would just nudge the button off-centre.
 */
export default function Magnetic({ children, strength = 0.18 }: { children: ReactNode; strength?: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 22, mass: 0.5 });

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      style={{ display: "inline-flex", x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </m.span>
  );
}
