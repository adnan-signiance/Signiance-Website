import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * The counterpart to the timeline above it: the method explains the four weeks,
 * this explains what is left behind once they are over. Heading on the left, the
 * three things on the right, like every other section of the inner pages.
 */
const handover: { title: string; body: string }[] = [
  {
    title: "The code",
    body: "In your repositories, with the commit history intact — not a black box we keep the keys to.",
  },
  {
    title: "The runbook and the eval suite",
    body: "So your team can operate it and prove it still works after we step back.",
  },
  {
    title: "A support window after handover",
    body: "We stay available; we don't stay necessary.",
  },
];

export default function WorkHandover() {
  return (
    <section className="sec-split">
      <Reveal className="sec-split-head">
        <SectionEyebrow>What you own at the end</SectionEyebrow>
      </Reveal>
      <RevealGroup className="sec-split-body sec-list" stagger={0.1}>
        {handover.map((h) => (
          <RevealItem key={h.title} className="sec-list-item">
            <h3>{h.title}</h3>
            <p>{h.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      <CornerDots />
    </section>
  );
}
