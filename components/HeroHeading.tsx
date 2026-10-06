import type { CSSProperties } from "react";

/**
 * A page title that rises in word by word on load, each word out of a clipping
 * mask 28ms after the one before. It is the page-header counterpart to
 * RevealHeading, and the same motion as the homepage hero.
 *
 * This is a server component driven by CSS keyframes (.hero-word) rather than
 * motion, deliberately: a title is above the fold on every page, so it has to
 * start on the first painted frame. A JS-driven entrance would hold the title
 * back until hydration, which delays the largest paint on every page.
 *
 * Words are separated by real spaces, not margin, so copy-paste and screen
 * readers keep their word breaks.
 */
export default function HeroHeading({
  children,
  style,
  className,
  level = 1,
  startAt = 0,
}: {
  children: string;
  style?: CSSProperties;
  className?: string;
  level?: 1 | 2;
  /** Index of the first word, so a title can continue a stagger begun elsewhere. */
  startAt?: number;
}) {
  const Tag = `h${level}` as "h1" | "h2";
  const words = children.split(" ").filter(Boolean);
  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="rw-mask">
            <span className="hero-word" style={{ "--i": startAt + i } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
