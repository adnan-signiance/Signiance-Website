"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import ScrollProgress from "./ScrollProgress";

/**
 * One provider for every animated component.
 *
 * `LazyMotion` with the `domAnimation` feature set loads the animation engine on
 * demand and keeps the initial bundle to the small `m` components, rather than
 * shipping the full `motion` component (roughly five times the size) to every
 * page. `strict` makes any accidental import of the full `motion` component
 * throw in development instead of silently undoing that saving.
 *
 * `reducedMotion="user"` is the single place the OS "reduce motion" setting is
 * honoured for everything below, so no component has to check for itself.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
