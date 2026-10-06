"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { m, useInView } from "motion/react";
import { onCurtainClear } from "@/lib/curtainSignal";
import { trackSpotlight } from "@/lib/spotlight";
import { EASE_OUT, REVEAL_VIEWPORT, staggerItem, staggerParent, wordChild, wordParent } from "@/lib/motion";

/**
 * Scroll reveals.
 *
 * Every primitive here decides *when* to play through `useReveal`, which has two
 * conditions rather than one: the element is in view, AND the page-transition
 * curtain has cleared. A reveal that fired the instant it intersected would, on
 * a fresh navigation, play entirely behind the curtain and arrive already
 * finished — the same problem MetricsGrid solves with onCurtainClear.
 *
 * Elements render in their hidden state on the server (`initial="hidden"`), so
 * the layout's <noscript> rule is what keeps them visible with JavaScript off.
 * They carry `data-reveal` for that rule to target.
 */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, REVEAL_VIEWPORT);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!inView) return;
    return onCurtainClear(() => setShown(true));
  }, [inView]);

  return { ref, animate: shown ? "show" : "hidden" } as const;
}

type Common = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** The workhorse: fade up once, as the element scrolls into view. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 20,
  as = "div",
}: Common & { delay?: number; y?: number; as?: "div" | "p" | "span" | "section" | "li" }) {
  const { ref, animate } = useReveal<HTMLElement>();
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      data-reveal=""
      className={className}
      style={style}
      initial="hidden"
      animate={animate}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay } },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * A container that staggers its `RevealItem` children in. With `spotlight`, it
 * also tracks the pointer for the cursor glow on any `spotlight` items inside. It is a real element,
 * not a wrapper, so a grid can *be* the group and keep its own class and layout.
 */
export function RevealGroup({
  children,
  className,
  style,
  stagger = 0.08,
  delayChildren = 0,
  spotlight = false,
}: Common & { stagger?: number; delayChildren?: number; spotlight?: boolean }) {
  const { ref, animate } = useReveal<HTMLDivElement>();
  return (
    <m.div
      ref={ref}
      data-reveal=""
      className={className}
      style={style}
      initial="hidden"
      animate={animate}
      variants={staggerParent(stagger, delayChildren)}
      onPointerMove={spotlight ? trackSpotlight : undefined}
    >
      {children}
    </m.div>
  );
}

/** Child of a `RevealGroup`. Takes the group's stagger; plays no trigger of its own. */
export function RevealItem({ children, className, style, spotlight = false }: Common & { spotlight?: boolean }) {
  return (
    <m.div
      data-reveal=""
      data-spot={spotlight ? "" : undefined}
      className={className}
      style={style}
      variants={staggerItem}
    >
      {children}
    </m.div>
  );
}

/**
 * Heading with a word-by-word mask reveal: each word rises out of an
 * overflow-hidden box, 28ms after the one before.
 *
 * Words are separated by real space characters, not margin. Margin would look
 * identical but leave the text with no whitespace in it, so copy-paste and
 * screen readers would run the words together.
 */
export function RevealHeading({
  children,
  className,
  style,
  level = 2,
  id,
}: Common & { children: string; level?: 1 | 2 | 3; id?: string }) {
  const { ref, animate } = useReveal<HTMLSpanElement>();
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  const words = children.split(" ").filter(Boolean);

  return (
    <Tag className={className} style={style} id={id}>
      <m.span ref={ref} data-reveal="" className="rw" initial="hidden" animate={animate} variants={wordParent}>
        {words.map((word, i) => (
          <span key={i}>
            <span className="rw-mask">
              <m.span className="rw-word" variants={wordChild}>
                {word}
              </m.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
