import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";

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
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <SectionEyebrow rise={0}>{eyebrow}</SectionEyebrow>
        <HeroHeading
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(29px, 4.4vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: "14px 0 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          {title}
        </HeroHeading>
        <p className="hero-rise hero-d1" style={{ margin: "16px 0 0", fontSize: "var(--fs-xs)", letterSpacing: "normal", color: "var(--color-muted)" }}>
          Last updated {updated}
        </p>
        <p className="hero-rise hero-d2" style={{ maxWidth: 620, margin: "16px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.6, color: "var(--color-text)" }}>
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
