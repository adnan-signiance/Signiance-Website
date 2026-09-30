"use client";

import Image from "next/image";

import { useRef } from "react";
import Link from "next/link";
import type { CaseStudyEntry } from "@/lib/data";

export default function RelatedCaseStudies({ cases }: { cases: CaseStudyEntry[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  if (cases.length === 0) return null;

  return (
    <div className="grid-related-cases" ref={gridRef}>
      {cases.map((r) => (
        <div key={r.id} className="related-case-cell">
          <div className="case-cell-frame">
            <Image src={r.image} alt="" fill className="case-cell-bg" sizes="(max-width: 900px) 100vw, 33vw" />
            <div className="case-cell-scrim" />
            <Link href={`/case-studies/${r.slug}`} className="case-cell-overlay" data-transition="none">
              <div className="case-cell-bottom-row">
                <div>
                  <div className="case-cell-tag">{r.tag}</div>
                  <h4 className="case-cell-title" style={{ fontSize: "var(--fs-lg)" }}>
                    {r.title}
                  </h4>
                </div>
                <span className="case-cell-cta">
                  <span className="case-cell-cta-arrow-in">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Read case study</span>
                  <span className="case-cell-cta-arrow-out">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
