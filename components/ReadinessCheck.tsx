import "../app/readiness-check.css";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { Reveal, RevealHeading } from "./Reveal";
import { READINESS_HREF } from "@/lib/data";

/**
 * The readiness check: a low-commitment offer for the visitor who is not ready to book a
 * call. It sits after the founder's note and just before the booking form, as the softer
 * alternative to it. The link target is READINESS_HREF in lib/data.ts, shared with the hero.
 */
export default function ReadinessCheck() {
  return (
    <section id="readiness" className="readiness">
      <RevealHeading className="readiness-title">Is your AI ready for production?</RevealHeading>
      <Reveal as="p" className="readiness-body" delay={0.1}>
        Score your system across reliability, evals, observability, cost and security in 5 minutes. Free, no call
        required.
      </Reveal>
      <Reveal className="readiness-cta" delay={0.18}>
        <Link href={READINESS_HREF} className="btn-hero-primary">
          <CtaArrow>Take the readiness check</CtaArrow>
        </Link>
      </Reveal>
      <CornerDots />
    </section>
  );
}
