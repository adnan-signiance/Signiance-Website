import "../app/page-hero.css";
import type { ReactNode } from "react";
import CornerDots from "./CornerDots";
import HeroHeading from "./HeroHeading";

/**
 * The first screen of every page but the home page: the title at the largest size on the page,
 * across the full width, and under it the introduction on the left with something that closes
 * the right-hand side (`aside`: a list, a fact sheet, a document). With no aside the
 * introduction itself moves to the right column, so the hero never leaves half the screen empty.
 *
 * `meta` is one quiet line above the introduction for what used to sit in a label over the
 * title (a category, a date). `children` follow the introduction: buttons, a short list.
 */
export default function PageHero({
  title,
  lead,
  meta,
  aside,
  children,
  flush = false,
  compact = false,
}: {
  title: string;
  lead?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  /** Drops the bottom padding and line, for a hero that carries more of its own below. */
  flush?: boolean;
  /** A step down in size, for long titles such as a case study's or a post's. */
  compact?: boolean;
}) {
  const intro = (
    <>
      {meta ? <p className="page-hero-meta hero-rise hero-d1">{meta}</p> : null}
      {lead ? <div className="page-hero-lead hero-rise hero-d1">{lead}</div> : null}
      {children ? <div className="page-hero-more hero-rise hero-d2">{children}</div> : null}
    </>
  );

  return (
    <section className={flush ? "page-hero page-hero--flush" : "page-hero"}>
      <HeroHeading className={compact ? "page-hero-title page-hero-title--compact" : "page-hero-title"}>{title}</HeroHeading>
      <div className="page-hero-row">
        {aside ? (
          <>
            <div className="page-hero-intro">{intro}</div>
            <div className="page-hero-aside hero-rise hero-d2">{aside}</div>
          </>
        ) : (
          <div className="page-hero-intro page-hero-intro--right">{intro}</div>
        )}
      </div>
      {flush ? null : <CornerDots />}
    </section>
  );
}
