import CornerDots from "./CornerDots";
import CalBooking from "./CalBooking";

export default function CaseStudiesCTA() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(52px, 7vw, 74px) var(--pad-x)",
        textAlign: "center",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <CornerDots position="top" />
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
          Want outcomes like this for your workflow?
        </h2>
        <p style={{ maxWidth: 440, margin: "14px auto 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          30 minutes with the people who&apos;d do the work. You leave with a scoped plan either way.
        </p>
        <div className="cal-frame" style={{ marginTop: 24 }}>
          <CalBooking />
        </div>
      </div>
      <CornerDots />
    </section>
  );
}
