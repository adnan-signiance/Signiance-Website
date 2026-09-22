import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";

export type LegalSection = {
  heading: string;
  body: (string | { list: string[] })[];
};

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section
        style={{
          position: "relative",
          padding: "clamp(44px, 6vw, 64px) var(--pad-x) clamp(32px, 5vw, 48px)",
          borderBottom: "1px solid #E2E0DA",
        }}
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: "14px 0 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          {title}
        </h1>
        <p style={{ margin: "16px 0 0", fontSize: 12.5, letterSpacing: "0.02em", color: "#6A6D71" }}>
          Last updated {updated}
        </p>
        <p style={{ maxWidth: 620, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
          {intro}
        </p>
        <CornerDots />
      </section>

      <section style={{ position: "relative", padding: "clamp(40px, 6vw, 58px) var(--pad-x)" }}>
        <div className="legal-body">
          {sections.map((s) => (
            <div key={s.heading} className="legal-section">
              <h2>{s.heading}</h2>
              {s.body.map((block, i) =>
                typeof block === "string" ? (
                  <p key={i}>{block}</p>
                ) : (
                  <ul key={i}>
                    {block.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </div>
          ))}
        </div>
        <CornerDots />
      </section>
    </>
  );
}
