"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../app/case-index.css";
import type { CaseStudyEntry } from "@/lib/data";

/**
 * The work as an editorial index: each study is a line of type with its result set large on
 * the right, and the picture for the line you are on sits beside the list. Names carry the
 * section, so a photograph only ever appears one at a time. Hover or focus moves the picture and
 * the caption under it; below 900px each line carries its own picture instead.
 */
export default function CaseStudies({ entries }: { entries: CaseStudyEntry[] }) {
  const [active, setActive] = useState(0);
  if (entries.length === 0) return null;

  return (
    <div className="case-index">
      <ul className="case-index-list">
        {entries.map((cs, i) => (
          <li key={cs.id} className={i === active ? "case-index-item is-active" : "case-index-item"}>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="case-index-row"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="case-index-main">
                <span className="case-index-industry">{cs.industry}</span>
                <span className="case-index-title">{cs.title}</span>
                <span className="case-index-text">{cs.teaser}</span>
                <span className="case-index-more">
                  Read the case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              {cs.statValue && (
                <span className="case-index-result">
                  <span className="case-index-value">{cs.statValue}</span>
                  <span className="case-index-label">{cs.statLabel}</span>
                </span>
              )}
            </Link>
            <div className="case-index-inline">
              <Image src={cs.image} alt="" fill sizes="(max-width: 900px) 100vw, 1px" />
            </div>
          </li>
        ))}
      </ul>

      <figure className="case-index-preview" aria-hidden="true">
        <div className="case-index-frame">
          {entries.map((cs, i) => (
            <Image
              key={cs.id}
              src={cs.image}
              alt=""
              fill
              sizes="(max-width: 900px) 1px, 34vw"
              className={i === active ? "case-index-photo is-active" : "case-index-photo"}
            />
          ))}
        </div>
        <figcaption className="case-index-caption">
          {entries[active].client}. {entries[active].engagementLength}.
        </figcaption>
      </figure>
    </div>
  );
}
