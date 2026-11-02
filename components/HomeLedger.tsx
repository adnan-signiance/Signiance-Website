import CornerDots from "./CornerDots";
import { Reveal } from "./Reveal";
import { metrics } from "@/lib/data";

// The digits and the unit are separate text nodes, so the real number is in the prerendered HTML on
// its own ("5", then "wks"), the way the metric counters render it, and the figures line up as one shape.
function whole(value: string) {
  const m = value.match(/^([0-9]+)(.*)$/);
  return m ? { digits: m[1], tail: m[2].trim() } : { digits: value, tail: "" };
}

// The cost figure leads: it is the number a business owner can hold us to.
const ORDER = [1, 0, 2, 3];

/**
 * The results, set like a ledger: the heading on the left, the four figures on the right at poster
 * size so the numerals form one clean column, each with its caption beside it.
 */
export default function HomeLedger() {
  return (
    <section id="proof" className="hp-sec hp-sec--tint">
      <div className="hp-grid hl-grid">
        <div className="hl-side">
          <Reveal>
            <h2 className="hp-title hl-title">
              <span className="hl-soft">Results, not</span> promises.
            </h2>
          </Reveal>
          <Reveal as="p" className="hp-note" delay={0.1} style={{ marginTop: 20 }}>
            Every project we take on goes live with real customers and is measured against a number that matters to the
            business.
          </Reveal>
        </div>

        <ol className="hl-rows">
          {ORDER.map((idx, n) => {
            const m = metrics[idx];
            const w = whole(m.value);
            return (
              <Reveal as="li" key={m.label} className="hl-row" delay={0.08 * n}>
                <span className="hl-figure">
                  <span>{w.digits}</span>
                  {w.tail ? <span className="hl-tail">{w.tail}</span> : null}
                </span>
                <span className="hl-caption">{m.label}</span>
              </Reveal>
            );
          })}
        </ol>
      </div>
      <CornerDots bg="transparent" />
    </section>
  );
}
