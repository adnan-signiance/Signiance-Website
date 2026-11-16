import CornerDots from "./CornerDots";
import { Reveal, RevealGroup, RevealHeading, RevealItem } from "./Reveal";

/**
 * "Why Signiance": the positioning claim, set after the services so the visitor has seen what we
 * do before being told why we are the ones to do it. The claim is the heading on the left. On the
 * right, the argument is laid out as the comparison it is: the two other places a buyer would
 * look, and us, with what we do about it. Nothing here is a new claim; it is the same paragraph,
 * taken apart.
 */
const OTHERS = [
  { name: "AI prototype shops", line: "Build impressive demos and move on." },
  { name: "Large consultancies", line: "Arrive in six months with a staffing pyramid." },
];

const POINTS = ["Evals instead of vibes", "Dashboards instead of guesswork", "An owner when something breaks"];

export default function WhySigniance() {
  return (
    <section id="why" className="home-section home-why sec-split">
      <div className="sec-split-head">
        <RevealHeading className="section-label why-claim">We&apos;ve been running production for twelve years.</RevealHeading>
      </div>

      <div className="sec-split-body why-body">
        <Reveal as="p" className="why-lead" delay={0.1}>
          Most AI shops have never run production.
        </Reveal>

        <RevealGroup className="why-compare" stagger={0.1}>
          {OTHERS.map((o) => (
            <RevealItem key={o.name} className="why-col">
              <h3 className="why-col-name">{o.name}</h3>
              <p className="why-col-line">{o.line}</p>
            </RevealItem>
          ))}
          <RevealItem className="why-col why-col--us">
            <h3 className="why-col-name">Signiance</h3>
            <p className="why-col-line">A senior team that has spent over a decade keeping cloud systems up, now applying that same discipline to AI.</p>
            <ul className="why-points">
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>

      <CornerDots />
    </section>
  );
}
