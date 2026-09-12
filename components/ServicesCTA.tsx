import CornerDots from "./CornerDots";

export default function ServicesCTA() {
  return (
    <section
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
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(25px, 3.4vw, 36px)",
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Not sure which practice fits?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          Tell us the workflow. We&apos;ll tell you which of the five gets you there fastest.
        </p>
        <a href="/#contact" className="btn-hero-primary" style={{ marginTop: 22 }}>
          Book a Discovery Call
        </a>
      </div>
      <CornerDots />
    </section>
  );
}
