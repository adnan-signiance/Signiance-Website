import "../app/home-hero.css";
import Image from "next/image";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { ClientLogos } from "./ClientsStrip";
import CtaArrow from "./CtaArrow";
import Magnetic from "./Magnetic";
import PartnerMarks from "./PartnerMarks";
import { GUARANTEE_APPROVED, READINESS_HREF, subhead } from "@/lib/data";

/**
 * Headline words, in reading order, so the stagger runs continuously from the
 * first word of the lead line to the last of the punchline instead of restarting
 * per line. Punctuation stays attached to its word, or it would rise on its own.
 */
type Word = { text: string; tail?: string; accent?: boolean };

const LEAD: Word[] = [
  { text: "Your" },
  { text: "AI" },
  { text: "pilot" },
  { text: "works." },
];

/** The end of the punchline: what the page says at rest. Scrolling swaps it, see HeroSwap. */
const PILOT: Word[] = [
  { text: "still", accent: true },
  { text: "a", accent: true },
  { text: "pilot", tail: ".", accent: true },
];

/**
 * One word inside its clipping mask, rising on a CSS delay of 28ms per word.
 *
 * CSS rather than motion: the hero is the first thing painted, and a JS-driven
 * entrance would wait for hydration before showing the headline, pushing the
 * largest paint later. A keyframe animation starts with the first frame, runs on
 * the compositor, and needs no script at all.
 */
function HeroWord({ word, index, last = false }: { word: Word; index: number; last?: boolean }) {
  return (
    <>
      <span className="rw-mask">
        <span
          className="hero-word"
          style={
            {
              "--i": index,
              color: word.accent ? "var(--color-accent)" : undefined,
            } as React.CSSProperties
          }
        >
          {word.text}
          {word.tail ? <span style={{ color: "var(--color-ink)" }}>{word.tail}</span> : null}
        </span>
      </span>
      {!last ? " " : null}
    </>
  );
}

/** Three figures that carry the offer, set large; each is a claim the rest of the page makes. */
const FIGURES = [
  { value: "1 wk", label: "Fixed-fee scoping sprint on one workflow" },
  GUARANTEE_APPROVED
    ? { value: "30%", label: "Off your inference bill in 30 days, or you don't pay" }
    : { value: "50", label: "Workflows shipped and handed over" },
  { value: "12 yrs", label: "Keeping cloud systems running in production" },
];

/**
 * The first screen is the sentence: two lines, with the supporting copy, the actions and the
 * figures underneath, and the artwork beside it. The hero is exactly the browser's first
 * screen under the header; credentials run along its foot and the line pattern starts below it.
 */
export default function Hero() {
  return (
    <section className="hero-section hero-stage">
      <div className="hero-main">
        <div className="hero-copy">
          <div
            className="hero-badge hero-rise"
            style={{
              "--d": "0s",
              display: "inline-flex",
              alignItems: "center",
              gap: 11,
              maxWidth: "100%",
              padding: "6px 7px 6px 12px",
              border: "1px solid rgba(19,20,23,0.1)",
              borderRadius: 999,
              background: "rgba(255,255,255,0.62)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 1px 2px rgba(19,20,23,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
            } as React.CSSProperties}
          >
            <span style={{ position: "relative", display: "grid", placeItems: "center", width: 6, height: 6 }}>
              <span
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  animation: "sigpulse 2.6s ease-out infinite",
                }}
              />
              <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)" }} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-xs)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                whiteSpace: "nowrap",
              }}
            >
              AI-Native Engineering for Startups
            </span>
            <span className="hero-badge-aside" style={{ width: 1, height: 12, background: "rgba(19,20,23,0.12)" }} />
            <span
              className="hero-badge-aside"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: "var(--fs-xs)",
                lineHeight: 1,
                color: "var(--color-ink-soft)",
                whiteSpace: "nowrap",
                paddingRight: 9,
              }}
            >
              Priced on Outcomes
            </span>
          </div>

          {/* Two deliberate lines. The lead line is one step down and muted, the punchline is the
              largest type on the page. At rest the punchline reads "It's still a pilot."; as the
              page scrolls away from the hero the end of it turns into "in production." (the second
              version is decoration for the eye, hidden from assistive technology). */}
          <h1 className="hero-sentence">
            <span className="hero-line hero-line-struck">
              {LEAD.map((w, i) => (
                <HeroWord key={w.text} word={w} index={i} last={i === LEAD.length - 1} />
              ))}
            </span>
            <span className="hero-line hero-line-promise">
              <HeroWord word={{ text: "It's" }} index={LEAD.length} />
              <span className="hero-swap">
                <span className="hero-swap-a">
                  {PILOT.map((w, i) => (
                    <HeroWord key={w.text} word={w} index={LEAD.length + 1 + i} last={i === PILOT.length - 1} />
                  ))}
                </span>
                <span className="hero-swap-b" aria-hidden="true">
                  in production<span style={{ color: "var(--color-ink)" }}>.</span>
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-rise hero-subline" style={{ "--d": "0.14s" } as React.CSSProperties}>
            {subhead}
          </p>

          <div className="hero-rise hero-ctas" style={{ "--d": "0.26s" } as React.CSSProperties}>
            {/* Absolute (`/#…`) rather than bare (`#…`): a bare fragment only resolves on whichever
                page the component happens to render on. */}
            <Magnetic>
              <Link href="/#contact" className="btn-hero-primary">
                <CtaArrow>Book a scoping call</CtaArrow>
              </Link>
            </Magnetic>
            <Link href={READINESS_HREF} className="hero-link">
              <CtaArrow>Check your AI production readiness</CtaArrow>
            </Link>
          </div>

          <ul className="hero-figures hero-rise" style={{ "--d": "0.34s" } as React.CSSProperties}>
            {FIGURES.map((f) => (
              <li key={f.value}>
                <span className="hero-figure-value">{f.value}</span>
                <span className="hero-figure-label">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-home-art hero-rise" style={{ "--d": "0.2s" } as React.CSSProperties}>
          <Image
            src="/media/hero-art.webp"
            alt=""
            width={500}
            height={500}
            priority
            sizes="(max-width: 1100px) 32vw, 440px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* Credentials along the foot of the first screen: who we are partnered with, and who has
          trusted us. This band is where the line pattern begins: rails down both sides, a line
          above and below, a + at each corner. */}
      <div className="frame-rails hero-band">
        <div className="hero-credentials hero-rise" style={{ "--d": "0.5s" } as React.CSSProperties}>
          <PartnerMarks />
          <ClientLogos />
        </div>
        <CornerDots position="top" />
        <CornerDots />
      </div>
    </section>
  );
}
