import CornerDots from "./CornerDots";
import { subhead } from "@/lib/data";

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        padding: "clamp(32px, 7vw, 78px) var(--pad-x) clamp(28px, 6vw, 58px)",
        borderBottom: "1px solid #E2E0DA",
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/hero-portal.png"
          alt=""
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
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 5%, #000 14%, #000 86%, rgba(0,0,0,0.6) 95%, rgba(0,0,0,0) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 5%, #000 15%, #000 85%, rgba(0,0,0,0.6) 95%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 5%, #000 14%, #000 86%, rgba(0,0,0,0.6) 95%, rgba(0,0,0,0) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 5%, #000 15%, #000 85%, rgba(0,0,0,0.6) 95%, rgba(0,0,0,0) 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            maskRepeat: "no-repeat",
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
              "radial-gradient(120% 80% at 50% 50%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.55) 82%, #FFFFFF 100%)",
          }}
        />
      </div>

      <div
        className="hero-content-in"
        style={{ position: "relative", zIndex: 2, maxWidth: 620, margin: 0, textAlign: "left" }}
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
                background: "#193DAA",
                animation: "sigpulse 2.6s ease-out infinite",
              }}
            />
            <span
              style={{
                position: "relative",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#193DAA",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6A6D71",
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
              fontSize: 12,
              lineHeight: 1,
              color: "#22252A",
              whiteSpace: "nowrap",
              paddingRight: 9,
            }}
          >
            Priced on Outcomes
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "var(--fs-h1)",
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            margin: "clamp(16px, 4vw, 24px) 0 0",
            textWrap: "balance",
          }}
        >
          <span
            style={{
              color: "#6A6D71",
              textDecoration: "line-through",
              textDecorationColor: "#B5B1A7",
              textDecorationThickness: 2,
            }}
          >
            Skip the 12-month AI roadmap.
          </span>{" "}
          Ship the first working agent{" "}
          <span style={{ color: "#193DAA" }}>in weeks</span>.
        </h1>

        <p
          style={{
            maxWidth: 520,
            margin: "clamp(12px, 3vw, 20px) 0 0",
            fontSize: "var(--fs-lead)",
            lineHeight: 1.6,
            color: "#22252A",
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
          <a href="#contact" className="btn-hero-primary">
            Get Your Scoped Plan
          </a>
          <a href="#work" className="btn-hero-outline">
            See how we engage
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(8px, 2vw, 12px)",
            marginTop: "clamp(16px, 5vw, 38px)",
            fontSize: "clamp(11.5px, 3vw, 12.5px)",
            fontWeight: 500,
            color: "#131417",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#193DAA" strokeWidth="1.2" />
              <path d="M4.5 7.2 6.3 9l3.2-4" stroke="#193DAA" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Fixed-fee scoping, credited to the build
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <circle cx="7" cy="7" r="5.5" stroke="#193DAA" strokeWidth="1.2" />
              <circle cx="7" cy="7" r="1.8" fill="#193DAA" />
            </svg>
            Senior-only pods, no bench time
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1.8 12 4v4c0 2.2-2.2 3.6-5 4.2C4.2 11.6 2 10.2 2 8V4l5-2.2Z"
                stroke="#193DAA"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            You own the code and runbook
          </span>
        </div>
      </div>

      <div
        className="hero-scroll-cue"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 22,
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6A6D71",
          }}
        >
          Scroll
        </span>
        <svg width="13" height="8" viewBox="0 0 14 9" fill="none" aria-hidden="true">
          <path d="M1.5 1.5 7 7l5.5-5.5" stroke="#6A6D71" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <CornerDots />
    </section>
  );
}
