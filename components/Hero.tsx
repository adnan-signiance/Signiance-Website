import "../app/home-hero.css";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { ClientLogos } from "./ClientsStrip";
import CtaArrow from "./CtaArrow";
import Magnetic from "./Magnetic";
import PartnerMarks from "./PartnerMarks";
import HeroArt from "./HeroArt";
import { READINESS_HREF, subhead } from "@/lib/data";

type Word = { text: string; tail?: string; accent?: boolean };

const LEAD: Word[] = [
  { text: "Your" },
  { text: "AI" },
  { text: "pilot" },
  { text: "works." },
];

const PILOT: Word[] = [
  { text: "still", accent: true },
  { text: "a", accent: true },
  { text: "pilot", tail: ".", accent: true },
];

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

/**
 * A type-led first screen: the headline, one sentence under it, one action, and a picture of the
 * product. The three figures that used to sit under the buttons are gone: they repeated the proof
 * band and the guarantee further down, and made the first screen a list.
 */
export default function Hero() {
  return (
    <section className="hero-section hero-stage">
      <div className="hero-main">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-sentence">
              <span className="hero-line hero-line-struck">
                {LEAD.map((word, index) => (
                  <HeroWord key={word.text} word={word} index={index} last={index === LEAD.length - 1} />
                ))}
              </span>
              <span className="hero-line hero-line-promise">
                <HeroWord word={{ text: "It's" }} index={LEAD.length} />
                <span className="hero-swap">
                  <span className="hero-swap-a">
                    {PILOT.map((word, index) => (
                      <HeroWord
                        key={word.text}
                        word={word}
                        index={LEAD.length + 1 + index}
                        last={index === PILOT.length - 1}
                      />
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
              <Magnetic>
                <Link href="/#contact" className="btn-hero-primary">
                  <CtaArrow>Book a scoping call</CtaArrow>
                </Link>
              </Magnetic>
              <Link href={READINESS_HREF} className="hero-link">
                <CtaArrow>Check your AI production readiness</CtaArrow>
              </Link>
            </div>

          </div>

          <div className="hero-visual hero-rise" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <HeroArt />
          </div>
        </div>
      </div>

      <div className="hero-band">
        <div className="hero-credentials hero-rise" style={{ "--d": "0.46s" } as React.CSSProperties}>
          <PartnerMarks />
          <ClientLogos />
        </div>
        <CornerDots position="top" />
        <CornerDots />
      </div>
    </section>
  );
}
