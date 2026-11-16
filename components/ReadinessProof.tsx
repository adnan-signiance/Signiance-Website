import Image from "next/image";
import Link from "next/link";
import "../app/readiness.css";
import CornerDots from "./CornerDots";
import { RevealHeading } from "./Reveal";
import { hasCasePhoto } from "@/lib/caseMedia";
import { getCaseStudies, pickHome } from "@/lib/content/caseStudies";

/**
 * Proof beside the check: four real engagements, each with its photograph and the number the client
 * measured it by. It reads from the same place as the home page and the case studies page, so it follows
 * whatever is published there. Studies with no photograph or no headline figure are left out.
 */
export default async function ReadinessProof() {
  const studies = pickHome(await getCaseStudies(), 12)
    .filter((c) => hasCasePhoto(c.image) && c.statValue && c.statLabel)
    .slice(0, 4);
  if (studies.length === 0) return null;

  return (
    <section className="rc-section" aria-labelledby="rc-proof">
      <RevealHeading className="rc-title" id="rc-proof">
        What closing the gaps looks like
      </RevealHeading>
      <p className="rc-lead">Real engagements, each measured against a number the client cared about.</p>
      <ul className="rc-proof">
        {studies.map((c) => (
          <li key={c.slug}>
            <Link href={`/case-studies/${c.slug}`} className="rc-proof-card">
              <span className="rc-proof-photo">
                <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
              </span>
              <span className="rc-proof-industry">{c.industry}</span>
              <span className="rc-item-title">{c.title}</span>
              <span className="rc-proof-stat">
                <span className="rc-proof-value">{c.statValue}</span> {c.statLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <CornerDots />
    </section>
  );
}
