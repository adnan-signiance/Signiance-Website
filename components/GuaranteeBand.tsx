import "../app/guarantee-band.css";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { Reveal, RevealHeading } from "./Reveal";
import { GUARANTEE_APPROVED } from "@/lib/data";

/**
 * The guarantee band: one promise, one line of proof, one link.
 *
 * It sits just before the FAQ, after the proof and the testimonials have made the case and
 * before the questions a buyer asks about risk. While the guarantee has not been approved
 * (GUARANTEE_APPROVED in lib/data.ts) the band carries the fallback offer instead, with a
 * button to the booking form; the terms page does not exist in that state, so nothing links
 * to it.
 */
const COPY = GUARANTEE_APPROVED
  ? {
      title: "We'll cut your AI inference bill by 30% in 30 days.",
      body: "Measured against your current baseline. If we don't hit it, you don't pay.",
      cta: "See how the guarantee works",
      href: "/guarantee",
    }
  : {
      title: "Fixed-fee scoping, credited to the build.",
      body: "If the numbers say don't build it, we'll tell you.",
      cta: "Book a scoping call",
      href: "/#contact",
    };

export default function GuaranteeBand() {
  return (
    <section id="guarantee" className="guarantee-band">
      <div className="guarantee-band-inner">
        <div className="guarantee-band-copy">
          <RevealHeading className="guarantee-band-title">{COPY.title}</RevealHeading>
          <Reveal as="p" className="guarantee-band-body" delay={0.12}>
            {COPY.body}
          </Reveal>
        </div>
        <Reveal className="guarantee-band-cta" delay={0.2}>
          <Link href={COPY.href} className="btn-hero-primary">
            <CtaArrow>{COPY.cta}</CtaArrow>
          </Link>
        </Reveal>
      </div>
      <CornerDots />
    </section>
  );
}
