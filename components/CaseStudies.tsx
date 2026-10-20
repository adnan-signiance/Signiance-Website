import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { RevealGroup, RevealItem } from "./Reveal";
import type { CaseStudyEntry } from "@/lib/data";

type Dot = { top?: number; bottom?: number; left?: number; right?: number; responsive?: "desktop-only" | "mobile-only" };

const cornerDotAbs = (pos: Dot, bg: string) => (
  <span
    className={pos.responsive === "desktop-only" ? "case-dot-desktop-only" : pos.responsive === "mobile-only" ? "case-dot-mobile-only" : undefined}
    style={{
      position: "absolute" as const,
      top: pos.top,
      bottom: pos.bottom,
      left: pos.left,
      right: pos.right,
      width: 15,
      height: 15,
      display: "grid",
      placeItems: "center",
      background: bg,
      pointerEvents: "none" as const,
      transform: `translate(${pos.right !== undefined ? "50%" : "-50%"},${pos.bottom !== undefined ? "50%" : "-50%"})`,
      zIndex: 2,
    }}
  >
    <span className="plus-mark" />
  </span>
);

const ctaArrow = (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <path d="M3 2.5 7 6 3 9.5" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// The pill is the card's only link: the photo and copy are not clickable, so a
// stray click on the card does not navigate.
const ViewCta = ({ slug, title }: { slug: string; title: string }) => (
  <Link href={`/case-studies/${slug}`} className="case-cell-cta" aria-label={`View case study: ${title}`}>
    <span className="case-cell-cta-arrow-in">{ctaArrow}</span>
    <span>View</span>
    <span className="case-cell-cta-arrow-out">{ctaArrow}</span>
  </Link>
);

// Every card is a full-bleed photo with the tag, title, copy and CTA laid
// over it — a bottom scrim keeps the white text legible regardless of how
// light the underlying image is, rather than reserving a separate text
// block below the image.
function CaseCard({
  span,
  heightClass,
  image,
  tag,
  title,
  titleSize,
  body,
  stat,
  slug,
  dots,
}: {
  span: 5 | 7;
  heightClass: "case-cell-h-lg" | "case-cell-h-md";
  image: string;
  tag: string;
  title: string;
  titleSize: number;
  body: string;
  stat?: { value: string; label: string };
  slug: string;
  dots: Dot[];
}) {
  return (
    <RevealItem
      className={`case-cell-${span} ${heightClass}`}
      style={{ position: "relative", background: "var(--color-white)", borderRight: "1px solid var(--color-line-strong)", borderBottom: "1px solid var(--color-line-strong)" }}
    >
      {dots.map((d, i) => (
        <Fragment key={i}>{cornerDotAbs(d, "var(--color-white)")}</Fragment>
      ))}
      {/* Inset from the cell's own border so the corner dots land on plain
          background instead of the photo — otherwise their white punch-box
          shows as a hard-edged square over the image. */}
      <div className="case-cell-frame">
        {/* `fill` matches what .case-cell-bg already did (absolutely positioned,
            100%/100%, object-fit: cover) so the CSS is unchanged — this adds
            responsive srcset and lazy loading below the fold. */}
        <Image src={image} alt="" fill className="case-cell-bg" sizes="(max-width: 900px) 100vw, 60vw" />
        <div className="case-cell-scrim" />
        <div className="case-cell-overlay case-cell-overlay--static">
          <div className="case-cell-bottom-row">
            <div>
              <div className="case-cell-tag">{tag}</div>
              <h3 className="case-cell-title" style={{ fontSize: `calc(var(--type-scale, 1) * ${titleSize}px)` }}>
                {title}
              </h3>
              <p className="case-cell-body">{body}</p>
              {stat && (
                <div className="case-cell-stat">
                  <span className="case-cell-stat-value">{stat.value}</span>
                  <span className="case-cell-stat-label">{stat.label}</span>
                </div>
              )}
            </div>
            <ViewCta slug={slug} title={title} />
          </div>
        </div>
      </div>
    </RevealItem>
  );
}

// The grid is a fixed editorial layout: each slot has its own width, height, title
// size and corner marks. The studies shown are chosen in the CMS (homeSlot); the
// layout belongs to the slot, not to the study that happens to fill it.
const SLOTS: {
  span: 5 | 7;
  heightClass: "case-cell-h-lg" | "case-cell-h-md";
  titleSize: number;
  dots: Dot[];
}[] = [
  { span: 7, heightClass: "case-cell-h-lg", titleSize: 24, dots: [{ top: 0, right: 0, responsive: "desktop-only" }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }] },
  { span: 5, heightClass: "case-cell-h-lg", titleSize: 20, dots: [{ bottom: 0, left: 0 }, { bottom: 0, right: 0 }] },
  { span: 5, heightClass: "case-cell-h-md", titleSize: 20, dots: [{ top: 0, right: 0 }, { bottom: 0, left: 0, responsive: "mobile-only" }, { bottom: 0, right: 0 }] },
  { span: 7, heightClass: "case-cell-h-md", titleSize: 20, dots: [] },
];

export default function CaseStudies({ entries }: { entries: CaseStudyEntry[] }) {
  return (
    <div style={{ position: "relative", margin: "20px var(--bleed) 0" }}>
      {cornerDotAbs({ left: 0, top: 0 }, "var(--color-white)")}
      {cornerDotAbs({ right: 0, top: 0 }, "var(--color-white)")}
      {cornerDotAbs({ left: 0, bottom: 0 }, "var(--color-white)")}
      {cornerDotAbs({ right: 0, bottom: 0 }, "var(--color-white)")}

      <RevealGroup className="grid-case case-home" stagger={0.1}>
        {entries.slice(0, SLOTS.length).map((cs, i) => (
          <CaseCard
            key={cs.id}
            {...SLOTS[i]}
            image={cs.image}
            tag={cs.tag}
            title={cs.title}
            body={cs.teaser}
            stat={cs.statValue && cs.statLabel ? { value: cs.statValue, label: cs.statLabel } : undefined}
            slug={cs.slug}
          />
        ))}
      </RevealGroup>
    </div>
  );
}
