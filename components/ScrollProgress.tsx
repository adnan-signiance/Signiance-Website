"use client";

import { m, useScroll, useSpring } from "motion/react";

/** A 2px bar across the top of the viewport that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // The spring smooths the bar over wheel-click scrolling, which otherwise
  // advances it in visible steps.
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
