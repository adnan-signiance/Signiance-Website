import CornerDots from "./CornerDots";
import PageHero from "./PageHero";

export type LegalSection = {
  heading: string;
  body: (string | { list: string[] })[];
};

/**
 * A legal or policy page: the title, when it was last updated and what it covers, then each
 * clause with its heading on the left and its text on the right, on the same columns as the hero.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  /** Kept so existing pages need no change; the title already says what the page is. */
  eyebrow?: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} meta={`Last updated ${updated}`} lead={<p>{intro}</p>} />

      {sections.map((s) => (
        <section key={s.heading} className="legal-section">
          <h2>{s.heading}</h2>
          <div className="legal-body">
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
          <CornerDots />
        </section>
      ))}
    </>
  );
}
