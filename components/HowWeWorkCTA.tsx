import CornerDots from "./CornerDots";
import CalBooking from "./CalBooking";
import { Reveal, RevealHeading } from "./Reveal";
import { bookingPromise } from "@/lib/data";

export default function HowWeWorkCTA() {
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
        <RevealHeading
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
          Start with the workflow that keeps breaking
        </RevealHeading>
        <Reveal as="p" delay={0.1} style={{ maxWidth: 440, margin: "14px auto 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
          {bookingPromise} You leave with a scoped plan either way.
        </Reveal>
        <Reveal delay={0.18} className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </Reveal>
      </div>
      <CornerDots />
    </section>
  );
}
