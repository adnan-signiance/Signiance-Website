import Image from "next/image";
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
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        {/* The hero backdrop is the largest image on the site and sits above the
            fold, so it is the LCP candidate: `priority` preloads it instead of
            letting it load lazily. Intrinsic dimensions are declared so the box
            is reserved before the file arrives (no layout shift). */}
        <Image
          src="/media/hero-portal.webp"
          alt=""
          width={1920}
          height={1072}
          priority
          sizes="100vw"
          className="hero-portal"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: "100%",
            aspectRatio: "2752 / 1536",
            objectFit: "contain",
            objectPosition: "center",
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
        <div
          className="hero-wash"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 24%, rgba(255,255,255,0.62) 42%, rgba(255,255,255,0.18) 58%, rgba(255,255,255,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 80% at 50% 50%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.55) 82%, var(--color-white) 100%)",
          }}
        />
      </div>

      <div
        className="hero-content-in"
        style={{
          position: "relative",
          zIndex: 2,
          // Widened from 620px. At the old width the headline broke into four
          // cramped lines while occupying under half the 1280px frame. 760px
          // still sits inside the white wash over the backdrop image (which
          // fades out around 72%), so the text stays fully legible.
          maxWidth: 760,
          margin: 0,
          textAlign: "left",
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

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-h1)",
            // Tighter than the shared 1.08 because the hero runs at the largest
            // size on the site, where generous leading reads as loose.
            lineHeight: 1.04,
            letterSpacing: "var(--tracking-tight)",
            margin: "clamp(18px, 4vw, 28px) 0 0",
            textWrap: "balance",
          }}
        >
          <span
            style={{
              color: "var(--color-muted)",
              textDecoration: "line-through",
              textDecorationColor: "var(--color-border-ui)",
              textDecorationThickness: 2,
            }}
          >
            Skip the 12-month AI roadmap.
          </span>{" "}
          Ship the first working agent{" "}
          <span style={{ color: "var(--color-accent)" }}>in weeks</span>.
        </h1>

        <p
          style={{
            maxWidth: 520,
            margin: "clamp(12px, 3vw, 20px) 0 0",
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
            justifyContent: "flex-start",
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
          <Link href="/#work" className="btn-hero-outline">
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
