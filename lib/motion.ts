import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Everything that animates on scroll draws its timing
 * from here, so a reveal in one section moves like a reveal in every other.
 *
 * Reduced motion is handled once, by <MotionConfig reducedMotion="user"> in
 * MotionProvider, rather than each component checking for itself.
 */

/** Expressive decelerate: the house curve for anything entering the viewport. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springSnappy: Transition = { type: "spring", stiffness: 320, damping: 24, mass: 0.5 };

/**
 * When a reveal fires.
 *
 * `amount: "some"` with a negative bottom margin, rather than a fraction of the
 * element's height. A fractional threshold can never be met by an element taller
 * than 1/fraction of the viewport — a 4x-viewport grid with `amount: 0.25` would
 * simply never appear. This fires once the element's top has risen 12% of the
 * viewport above the bottom edge, whatever its height.
 */
export const REVEAL_VIEWPORT = { once: true, amount: "some", margin: "0px 0px -12% 0px" } as const;

/** Parent that staggers its children. Pair with `staggerItem`. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

/** Word-level heading reveal: each word rises out of an overflow-hidden mask. */
export const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.04 } },
};

export const wordChild: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: EASE_OUT } },
};
