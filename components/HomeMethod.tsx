import Link from "next/link";
import CornerDots from "./CornerDots";
import { Reveal, RevealHeading } from "./Reveal";
import { services } from "@/lib/data";

// The sequence is written, not counted: each stage is a clause that begins with its order word.
const STAGES: { line: string; body: string }[] = [
  {
    line: "First, we pick one workflow.",
    body: "We sit with the people who do the work, measure how it goes today, and agree what better looks like in numbers.",
  },
  {
    line: "Then we build a small, working version.",
    body: "It runs on your real data and stays out of your customers' sight until you say so, with your own team checking it from day one.",
  },
  {
    line: "Then it goes live with real customers.",
    body: "Alerts and checks watch it around the clock, and your team is trained, so nothing about it is a mystery.",
  },
  {
    line: "After that, it's yours, or we run it.",
    body: "Take the code and the instructions and run it yourselves, or let us look after it. You can switch any time.",
  },
];

// Agentic AI leads and the cloud foundation comes last, as the layer under the four AI practices.
const HOME_ORDER = [
  "agentic-ai-development",
  "gen-ai-rag-solutions",
  "ai-poc-mvp-development",
  "copilots-conversational-ai",
  "cloud-architecture-devops",
];
const practices = [...services].sort((a, b) => HOME_ORDER.indexOf(a.slug) - HOME_ORDER.indexOf(b.slug));

/**
 * How it works, as four lines stepping down the page like the weeks they take. The first line is
 * the section's heading. The practices are linked in the corner the staircase leaves, so each
 * practice page keeps an inbound link from the home page.
 */
export default function HomeMethod() {
  return (
    <section id="work" className="hp-sec">
      <div className="hm-stages">
        {STAGES.map((st, i) => (
          <Reveal key={st.line} className="hm-stage" style={{ "--i": i } as React.CSSProperties} delay={0.06 * i}>
            {i === 0 ? (
              <RevealHeading className="hm-line">{st.line}</RevealHeading>
            ) : (
              <p className="hm-line" data-last={i === STAGES.length - 1 ? "true" : "false"}>
                {st.line}
              </p>
            )}
            <p className="hp-body">{st.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="hm-note" delay={0.1}>
        <p className="hp-note">
          We call this the Thin Slice Method. What we build most often:
        </p>
        <ul className="hm-practices">
          {practices.map((sv) => (
            <li key={sv.id}>
              <Link href={`/services/${sv.slug}`}>{sv.homeTitle ?? sv.title}</Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <CornerDots bg="transparent" />
    </section>
  );
}
