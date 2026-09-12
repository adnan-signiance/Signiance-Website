"use client";

import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "clamp(52px, 7vw, 74px) var(--pad-x)",
        textAlign: "center",
        overflow: "hidden",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -240,
          width: 800,
          height: 420,
          marginLeft: -400,
          filter: "blur(90px)",
          opacity: 0.34,
          borderRadius: "50%",
          background:
            "radial-gradient(48% 58% at 34% 50%, #4F6EC6 0%, transparent 68%), radial-gradient(48% 58% at 70% 50%, #152F85 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={{ marginBottom: 18 }}>
          <SectionEyebrow>Scoping call</SectionEyebrow>
        </div>
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "var(--fs-h2-sm)",
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Tell us the workflow that keeps breaking
        </h2>
        <p style={{ maxWidth: 470, margin: "16px auto 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
          30 minutes with the people who&apos;d do the work. You leave with a scoped plan — whether or not you
          hire us.
        </p>
        <form
          style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 26, flexWrap: "wrap" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="email" placeholder="you@company.com" className="email-input" required />
          <button type="submit" className="book-call-btn">
            Book a scoping call
          </button>
        </form>
        <p style={{ margin: "14px 0 0", fontSize: 12, color: "#64676B" }}>
          Or email hello@signiance.com — we reply within a business day.
        </p>
      </div>
      <CornerDots />
    </section>
  );
}
