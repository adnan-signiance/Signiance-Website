import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { subhead } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        padding: "clamp(32px, 7vw, 78px) var(--pad-x) clamp(28px, 6vw, 58px)",
        borderBottom: "1px solid var(--color-line)",
        minHeight: "clamp(460px, calc(100vh - 226px), 860px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="hero-content-in"
        style={{
          position: "relative",
          zIndex: 2,
          // Wide enough that the headline's second line holds on one line at
          // desktop widths, which is the whole point of the two-line split. The
          // lead paragraph keeps its own 520px measure, so only the headline and
          // the single-row proof points actually use this width.
          maxWidth: 1120,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="hero-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 11,
            maxWidth: "100%",
            padding: "6px 7px 6px 12px",
            border: "1px solid rgba(19,20,23,0.1)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 1px 2px rgba(19,20,23,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              width: 6,
              height: 6,
            }}
          >
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
            <span
              style={{
                position: "relative",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-accent)",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-2xs)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
            }}
          >
            Cloud &amp; AI Engineering
          </span>
          <span
            className="hero-badge-aside"
            style={{
              width: 1,
              height: 12,
              background: "rgba(19,20,23,0.12)",
            }}
          />
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

        {/* Two deliberate lines, not one wrapping block. The struck-through
            premise is set smaller and the promise larger, so the size jump
            between them does the work: the thing being dismissed is visibly
            diminished and the thing being offered dominates. */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            // Tighter than the shared 1.08 because the hero runs at the largest
            // size on the site, where generous leading reads as loose.
            lineHeight: 1.04,
            // Tracking is set on each line below, not here. An em letter-spacing
            // resolves against the font-size of the element it is declared on and
            // then inherits as an absolute length — declared here it would resolve
            // against this h1's own (unset, 32px) size and hand both lines the
            // same flat pixel value regardless of how large they actually render.
            margin: "clamp(18px, 4vw, 28px) 0 0",
            textWrap: "balance",
          }}
        >
          <span
            style={{
              display: "block",
              // 0.9x the promise below it through the fluid range (4.5vw against
              // 5vw), so the pair keeps a fixed relationship as the viewport
              // changes. The floor is lower than that ratio would give: at 24px
              // this line wrapped to two on a phone, which with the promise's
              // own two lines made a four-line hero.
              fontSize: "clamp(21px, 4.5vw, 52px)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--color-muted)",
              textDecoration: "line-through",
              textDecorationColor: "var(--color-border-ui)",
              textDecorationThickness: 2,
            }}
          >
            Skip the 12-month AI roadmap.
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(30px, 5vw, 58px)",
              letterSpacing: "var(--tracking-display)",
              marginTop: "clamp(6px, 1.2vw, 12px)",
            }}
          >
            Ship the first working agent{" "}
            <span style={{ color: "var(--color-accent)" }}>in weeks</span>.
          </span>
        </h1>

        <p
          style={{
            maxWidth: 520,
            margin: "clamp(12px, 3vw, 20px) auto 0",
            fontSize: "var(--fs-lead)",
            lineHeight: 1.6,
            color: "var(--color-ink-soft)",
            fontWeight: 400,
            textWrap: "pretty",
          }}
        >
          {subhead}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: "clamp(16px, 4vw, 32px)",
            flexWrap: "wrap",
          }}
        >
          {/* Absolute (`/#…`) rather than bare (`#…`): a bare fragment only
              resolves on whichever page the component happens to render on, so
              the link silently breaks the moment the section is reused. */}
          <Link href="/#contact" className="btn-hero-primary">
            <CtaArrow>Book a scoping call</CtaArrow>
          </Link>
          <Link href="/how-we-work" className="btn-hero-outline">
            <CtaArrow>See how we work</CtaArrow>
          </Link>
        </div>

        {/* One wrapping row rather than three stacked lines. These are the most
            differentiated lines of copy in the hero, and stacking them at 11.5px
            buried them under the CTAs while eating the vertical space that made
            the section feel crowded. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 20,
            rowGap: 10,
            marginTop: "clamp(18px, 3.5vw, 30px)",
            fontSize: "var(--fs-xs)",
            fontWeight: 500,
            color: "var(--color-ink)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="var(--color-accent)" strokeWidth="1.2" />
              <path d="M4.5 7.2 6.3 9l3.2-4" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Fixed-fee scoping, credited to the build
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <circle cx="7" cy="7" r="5.5" stroke="var(--color-accent)" strokeWidth="1.2" />
              <circle cx="7" cy="7" r="1.8" fill="var(--color-accent)" />
            </svg>
            Senior-only pods, no bench time
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <path
                d="M7 1.8 12 4v4c0 2.2-2.2 3.6-5 4.2C4.2 11.6 2 10.2 2 8V4l5-2.2Z"
                stroke="var(--color-accent)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            You own the code and runbook
          </span>
        </div>
      </div>

      {/* The "Scroll" cue was removed: it was a sixth element competing for
          attention in the hero, rendered at 9px, hidden below 820px anyway, and
          telling visitors something a scrollable page already communicates. */}

      <CornerDots />
    </section>
  );
}
