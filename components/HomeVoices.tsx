import Image from "next/image";
import CornerDots from "./CornerDots";
import { Reveal } from "./Reveal";

/**
 * A client's letter, set to be read, then the founder's word. The client's testimonial is given whole
 * and unaltered, with the first sentence pulled up as the opening line. The founder's note sits before
 * the booking form on purpose: the strongest trust copy on the page must be read before the ask.
 */
export default function HomeVoices() {
  return (
    <>
      <section className="hp-sec">
        <h2 className="sr-only">What a client says</h2>
        <div className="hp-grid hv-letter">
          <Reveal className="hv-portrait" y={0}>
            <Image
              src="/media/testimonial-bryn-nicholls.webp"
              alt="Bryn Nicholls, COO of 1300 Group"
              width={128}
              height={128}
              sizes="120px"
            />
          </Reveal>
          <div className="hv-letter-text">
            <Reveal as="p" className="hv-open" y={16}>
              Consistently relying on their services, I find their ability to collaborate effectively noteworthy.
            </Reveal>
            <Reveal as="p" className="hv-rest" delay={0.1}>
              They adeptly complete tasks within the designated timelines, meeting all requirements with efficiency.
            </Reveal>
            <Reveal className="hv-sign" delay={0.18}>
              <strong>Bryn Nicholls</strong>
              COO, 1300 Group
            </Reveal>
          </div>
        </div>
        <CornerDots bg="transparent" />
      </section>

      <section className="hp-sec hp-sec--tint">
        <h2 className="sr-only">From the founder</h2>
        <div className="hp-grid hv-founder">
          <Reveal className="hv-photo" y={0}>
            <Image
              src="/media/founder-brijesh.webp"
              alt="Brijesh, Founder & CEO of Signiance"
              width={840}
              height={916}
              sizes="(max-width: 960px) 60vw, 380px"
            />
          </Reveal>
          <div className="hv-text">
            <Reveal as="p" className="hp-statement" delay={0.1}>
              &ldquo;I started Signiance after watching too many AI pilots die in a slide deck instead of shipping.&rdquo;
            </Reveal>
            <Reveal as="p" className="hp-body" delay={0.18} style={{ marginTop: 20, maxWidth: "52ch" }}>
              We don&apos;t hand you a roadmap and disappear for a quarter, we sit with your team, scope one real
              workflow, and build it. That&apos;s still how I run every engagement today, at the table with the people
              doing the work, not from a boardroom.
            </Reveal>
            <Reveal className="hv-sign" delay={0.24}>
              <strong>Brijesh</strong>
              Founder &amp; CEO, Signiance
            </Reveal>
          </div>
        </div>
        <CornerDots bg="transparent" />
      </section>
    </>
  );
}
