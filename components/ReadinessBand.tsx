import "../app/readiness.css";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { RevealHeading } from "./Reveal";
import { READINESS_HREF } from "@/lib/data";

/**
 * The readiness check, offered at the end of a blog post: the reader has just read about shipping AI, so
 * the next question is whether theirs is ready. It is the softer offer, ahead of the booking section.
 */
export default function ReadinessBand() {
  return (
    <section className="rc-section" aria-labelledby="rb-title">
      <div className="rc-cta">
        <div>
          <RevealHeading className="rc-title" id="rb-title">
            Is your AI ready for production?
          </RevealHeading>
          <p className="rc-lead">Ten questions, five minutes, free. Score your system and see what to fix first.</p>
        </div>
        <Link href={READINESS_HREF} className="btn-hero-primary">
          <CtaArrow>Take the readiness check</CtaArrow>
        </Link>
      </div>
      <CornerDots />
    </section>
  );
}
