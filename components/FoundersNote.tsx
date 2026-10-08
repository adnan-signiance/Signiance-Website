import Image from "next/image";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal } from "./Reveal";

export default function FoundersNote() {
  return (
    <section
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        background: "var(--color-white)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="founders-note-layout">
      <div className="founders-note">
        <Reveal style={{ marginBottom: 18 }}>
          <SectionEyebrow>From the founder</SectionEyebrow>
        </Reveal>
        <span className="founders-note-quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <Reveal as="p" className="founders-note-text" delay={0.1}>
          I started Signiance after watching too many AI pilots die in a slide deck instead of shipping. We
          don&apos;t hand you a roadmap and disappear for a quarter, we sit with your team, scope one real
          workflow, and build it. That&apos;s still how I run every engagement today, at the table with the
          people doing the work, not from a boardroom.
        </Reveal>
        <Reveal className="founders-note-sig" delay={0.22}>
          <div>
            <div className="founders-note-name">Brijesh</div>
            <div className="founders-note-role">Founder &amp; CEO, Signiance</div>
          </div>
        </Reveal>
      </div>
      {/* Framed the way the page's own blocks are: a hairline border with the
          signature dot at each corner. The clip layer keeps the portrait inside the
          frame while the corner dots sit half outside it. */}
      <Reveal className="founders-note-photo" delay={0.15}>
        <div className="founders-note-photo-clip">
          <Image src="/media/founder-brijesh.webp" alt="Brijesh, Founder & CEO of Signiance" width={840} height={916} sizes="(max-width: 900px) 260px, 380px" />
        </div>
        <CornerDots position="top" />
        <CornerDots />
      </Reveal>
      </div>
      <CornerDots />
    </section>
  );
}
