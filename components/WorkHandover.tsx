import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";

/**
 * The counterpart to the timeline above it: the method explains the four weeks,
 * this explains what is left behind once they are over. It reuses the bordered
 * cell grid from the service detail pages rather than introducing a fourth
 * card treatment.
 */
const handover = [
  "The code, in your repositories, with the commit history intact — not a black box we keep the keys to.",
  "The runbook and the eval suite, so your team can operate it and prove it still works after we step back.",
  "A support window after handover. We stay available; we don't stay necessary.",
];

export default function WorkHandover() {
  return (
    <section
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <SectionEyebrow>What you own at the end</SectionEyebrow>
      <div className="grid-who-for" style={{ marginTop: 20 }}>
        {handover.map((h) => (
          <div key={h} className="who-for-cell">
            {h}
          </div>
        ))}
      </div>
      <CornerDots />
    </section>
  );
}
