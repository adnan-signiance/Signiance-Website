import Link from "next/link";
import CornerDots from "./CornerDots";
import { Reveal } from "./Reveal";
import { GUARANTEE_APPROVED } from "@/lib/data";

/**
 * The four questions a business owner asks before hiring anyone, answered in plain words. No
 * heading before the lead: the lead reads as the opening of a text. Each column opens with a bold
 * run-in phrase, and nothing else marks them.
 */
export default function HomeIntro() {
  return (
    <section className="hp-sec" id="about">
      <h2 className="sr-only">What you can expect from us</h2>
      <Reveal as="p" className="hi-lead" y={16}>
        You don&apos;t need to understand AI to benefit from it. You need it to work with real customers, cost what you
        expect, and have someone accountable.
      </Reveal>

      <div className="hi-cols">
        <Reveal className="hi-col" delay={0.05}>
          <p>
            <strong>Will it work?</strong> We test it against your own real data before anything goes live, and we check
            every change after, so it never quietly gets worse.
          </p>
        </Reveal>
        <Reveal className="hi-col" delay={0.1}>
          <p>
            <strong>What will it cost?</strong> A fixed fee for the first week, credited to the build. Our clients pay about
            30% less to run their AI.{" "}
            {GUARANTEE_APPROVED ? (
              <Link href="/guarantee" className="hi-link">
                See the guarantee.
              </Link>
            ) : null}
          </p>
        </Reveal>
        <Reveal className="hi-col" delay={0.15}>
          <p>
            <strong>Who is responsible?</strong> The senior people who plan it also build it, and stay on call. Or you take
            it over: you own the code and the instructions to run it.
          </p>
        </Reveal>
        <Reveal className="hi-col" delay={0.2}>
          <p>
            <strong>How long will it take?</strong> About five weeks from the first call to live, starting with one real
            workflow so you see results early.
          </p>
        </Reveal>
      </div>

      <CornerDots bg="transparent" />
    </section>
  );
}
