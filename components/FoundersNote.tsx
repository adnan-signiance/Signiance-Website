import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";

export default function FoundersNote() {
  return (
    <section
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div className="founders-note">
        <div style={{ marginBottom: 18 }}>
          <SectionEyebrow>From the founder</SectionEyebrow>
        </div>
        <span className="founders-note-quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <p className="founders-note-text">
          I started Signiance after watching too many AI pilots die in a slide deck instead of shipping. We
          don&apos;t hand you a roadmap and disappear for a quarter, we sit with your team, scope one real
          workflow, and build it. That&apos;s still how I run every engagement today, at the table with the
          people doing the work, not from a boardroom.
        </p>
        <div className="founders-note-sig">
          <span className="team-avatar" style={{ background: "#152F85" }}>
            B
          </span>
          <div>
            <div className="founders-note-name">Brijesh</div>
            <div className="founders-note-role">Founder &amp; CEO, Signiance</div>
          </div>
        </div>
      </div>
      <CornerDots />
    </section>
  );
}
