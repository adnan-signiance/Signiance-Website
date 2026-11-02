import Link from "next/link";
import CornerDots from "./CornerDots";
import { GUARANTEE_APPROVED } from "@/lib/data";

/**
 * The close: one word is the button. The whole band is a single link to the booking form. The
 * sentence says what happens next; while the guarantee is not approved (GUARANTEE_APPROVED in
 * lib/data.ts) it carries the fixed-fee scoping fallback instead.
 */
const SENTENCE = GUARANTEE_APPROVED
  ? "Book a free scoping call. We'll cut your AI inference bill by 30% in 30 days, or you don't pay."
  : "Book a scoping call. Fixed fee, credited to the build. If the numbers say don't build it, we'll tell you.";

export default function HomeClose() {
  return (
    <section id="guarantee" className="hp-close">
      <span id="readiness" />
      <Link href="/#contact" className="hp-close-link">
        <span className="hp-close-sentence">{SENTENCE}</span>
        <svg className="hp-close-arrow" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M14 34 34 14M18 14h16v16" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        </svg>
        <span className="hp-close-word" aria-hidden="true">
          Start
        </span>
      </Link>
      <CornerDots bg="transparent" />
    </section>
  );
}
