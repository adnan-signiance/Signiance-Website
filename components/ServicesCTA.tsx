import CornerDots from "./CornerDots";
import CalBooking from "./CalBooking";
import { Reveal, RevealHeading } from "./Reveal";

export default function ServicesCTA() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(52px, 7vw, 74px) var(--pad-x)",
        textAlign: "center",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <CornerDots position="top" />
      <div style={{ position: "relative" }}>
        <RevealHeading className="cta-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(25px, 3.4vw, 36px)",
            lineHeight: 1.08,
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Not sure which practice fits?
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 560, margin: "14px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
          Tell us the workflow, or the AI pilot that&apos;s stuck. We&apos;ll tell you which practice gets it to
          production fastest, and if it&apos;s not worth building, we&apos;ll say so.
        </Reveal>
        <Reveal delay={0.18} className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking primaryLabel="Book a scoping call" />
        </Reveal>
      </div>
      <CornerDots />
    </section>
  );
}
