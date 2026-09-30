import SectionEyebrow from "./SectionEyebrow";
import MetricsGrid from "./MetricsGrid";

/**
 * The one dark section on the homepage.
 *
 * Every other section was white with a hairline border, which made ten sections
 * read as one long undifferentiated scroll. The proof numbers are the strongest
 * content on the page and were the most visually forgettable, so they get the
 * tonal break.
 *
 * Full-bleed rather than inset: the page frame is capped at 1280px, and breaking
 * out of it is what makes this read as a deliberate band instead of a dark card.
 */
export default function MetricsSection() {
  return (
    <section id="proof" className="metrics-band">
      <div className="metrics-band-inner">
        <div className="section-head">
          <div className="section-head-main">
            <div style={{ marginBottom: 18 }}>
              <SectionEyebrow>Proof</SectionEyebrow>
            </div>
            <h2 className="metrics-band-title">Outcomes, not case-study theatre</h2>
          </div>
          <p className="metrics-band-note">
            Every engagement shipped to production
            <br />
            and measured against a number that mattered.
          </p>
        </div>

        <div className="metrics-band-rule" />

        <MetricsGrid style={{ marginTop: 28 }} />
      </div>
    </section>
  );
}
