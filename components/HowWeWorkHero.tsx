import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";

const points = [
  "Fixed-fee scoping, credited to the build",
  "Senior-only pods, no bench time",
  "You own the code and runbook",
];

export default function HowWeWorkHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(48px, 6.4vw, 70px) var(--pad-x) clamp(40px, 5vw, 54px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <SectionEyebrow>How we work</SectionEyebrow>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(29px, 4.4vw, 46px)",
          lineHeight: 1.05,
          letterSpacing: "var(--tracking-tight)",
          margin: "16px 0 0",
          maxWidth: "20ch",
          textWrap: "balance",
        }}
      >
        The Thin Slice Method
      </h1>
      <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
        Ship one workflow before you commit to a roadmap. Every engagement starts the same way: one workflow,
        measured against a number you pick, scoped in a week. You leave that week with a baseline, a build
        plan and a go / no-go — and if the answer is no, the plan is still yours.
      </p>
      <p style={{ maxWidth: 560, margin: "12px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
        No pyramid staffing. The people who scope it also build it.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 26,
          fontSize: "var(--fs-xs)",
          fontWeight: 500,
          color: "var(--color-ink)",
        }}
      >
        {points.map((p) => (
          <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
              <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="var(--color-accent)" strokeWidth="1.2" />
              <path d="M4.5 7.2 6.3 9l3.2-4" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {p}
          </span>
        ))}
      </div>
      <CornerDots />
    </section>
  );
}
