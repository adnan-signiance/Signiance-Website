import CornerDots from "./CornerDots";
import HowWeWorkDoc from "./HowWeWorkDocs";
import HowWeWorkSlides from "./HowWeWorkSlides";
import { Reveal } from "./Reveal";
import { steps } from "@/lib/data";

/** "WEEK 01" reads as "Week 1"; "AFTER" as "After launch". */
const weekLabel = (week: string) => {
  const m = week.match(/^WEEK\s*0*(\d+)$/i);
  return m ? `Week ${m[1]}` : "After launch";
};

/**
 * The homepage section is the pinned, slide-style layout in HowWeWorkSlides.
 * `variant="page"` (the /how-we-work page) sets the four steps out in full, one under the
 * other: when and what on the left, what happens and the document that lands that week on
 * the right. Nothing is hidden behind a step you have to select.
 */
export default function HowWeWork({ variant = "section" }: { variant?: "section" | "page" }) {
  return variant === "page" ? <HowWeWorkSteps /> : <HowWeWorkSlides />;
}

function HowWeWorkSteps() {
  return (
    <div id="work">
      {steps.map((st, i) => (
        <section key={st.n} className="sec-split">
          <Reveal className="sec-split-head">
            <p className="work-step-when">{weekLabel(st.week)}</p>
            <h2 className="section-label">{st.title}</h2>
            <ul className="hero-checks" style={{ marginTop: 20 }}>
              {st.lands.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="sec-split-body" delay={0.1}>
            <p className="sec-split-lead">{st.body}</p>
            {/* The document that lands that week. Decorative: the list beside it says the same. */}
            <div className="work-step-doc" aria-hidden="true">
              <HowWeWorkDoc index={i} />
            </div>
          </Reveal>
          <CornerDots />
        </section>
      ))}
    </div>
  );
}
