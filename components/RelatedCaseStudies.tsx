"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGridIntersectionDots, GridDotsOverlay } from "./useGridIntersectionDots";
import type { CaseStudyEntry } from "@/lib/data";

export default function RelatedCaseStudies({ cases }: { cases: CaseStudyEntry[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dots = useGridIntersectionDots(gridRef, ".related-case-cell", [cases.length]);

  if (cases.length === 0) return null;

  return (
    <div className="grid-related-cases" ref={gridRef}>
      <GridDotsOverlay dots={dots} />
      {cases.map((r) => (
        <div key={r.id} className="related-case-cell">
          <div className="case-cell-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.image} alt="" className="case-cell-bg" />
            <div className="case-cell-scrim" />
            <Link href={`/case-studies/${r.slug}`} className="case-cell-overlay" data-transition="none">
              <div className="case-cell-bottom-row">
                <div>
                  <div className="case-cell-tag">{r.tag}</div>
                  <h4 className="case-cell-title" style={{ fontSize: 17 }}>
                    {r.title}
                  </h4>
                </div>
                <span className="case-cell-cta">
                  <span className="case-cell-cta-arrow-in">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M3 2.5 7 6 3 9.5" stroke="#131417" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Read case study</span>
                  <span className="case-cell-cta-arrow-out">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
                      <path d="M3 2.5 7 6 3 9.5" stroke="#131417" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
