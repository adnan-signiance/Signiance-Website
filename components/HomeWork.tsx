import Image from "next/image";
import Link from "next/link";
import CornerDots from "./CornerDots";
import { Reveal, RevealHeading } from "./Reveal";
import { getCaseStudies, pickHome } from "@/lib/content/caseStudies";

/**
 * Three real projects, each as a picture, what changed for the business and the one number that
 * shows it. A business owner reads this as "someone like me, and what they got".
 */
export default async function HomeWork() {
  const entries = pickHome(await getCaseStudies()).slice(0, 3);

  return (
    <section id="case-studies" className="hp-sec">
      <div className="hp-grid hk-head">
        <RevealHeading className="hp-title">What it looks like when it works</RevealHeading>
        <Reveal as="p" className="hp-note" delay={0.1}>
          Three recent projects, in the words of what changed for the business.
        </Reveal>
      </div>

      <div className="hk-rows">
        {entries.map((cs, i) => (
          <Reveal key={cs.id} className="hk-row" delay={0.05}>
            <Link href={`/case-studies/${cs.slug}`} className="hk-img" aria-hidden="true" tabIndex={-1}>
              <Image src={cs.image} alt="" fill sizes="(max-width: 960px) 100vw, 560px" />
            </Link>
            <div className="hk-text">
              <h3 className="hk-title">
                <Link href={`/case-studies/${cs.slug}`}>{cs.title}</Link>
              </h3>
              <p className="hp-body">{cs.teaser}</p>
              {cs.statValue && cs.statLabel ? (
                <p className="hk-stat">
                  <strong>{cs.statValue}</strong> {cs.statLabel}
                </p>
              ) : null}
              <p className="hk-tag">{cs.tag.replace(/^[0-9]+ *[·.-] */, "")}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="hk-more" delay={0.1}>
        <Link href="/case-studies" className="hp-link">
          See all case studies
        </Link>
      </Reveal>
      <CornerDots bg="transparent" />
    </section>
  );
}
