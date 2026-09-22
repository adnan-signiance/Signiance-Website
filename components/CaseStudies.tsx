import { Fragment } from "react";
import Link from "next/link";

type Dot = { top?: number; bottom?: number; left?: number; right?: number };

const cornerDotAbs = (pos: Dot, bg: string) => (
  <span
    style={{
      position: "absolute" as const,
      ...pos,
      width: 3,
      height: 3,
      borderRadius: "50%",
      background: "#A29E96",
      boxShadow: `0 0 0 6px ${bg}`,
      transform: `translate(${pos.right !== undefined ? "50%" : "-50%"},${pos.bottom !== undefined ? "50%" : "-50%"})`,
      zIndex: 2,
    }}
  />
);

const ctaArrow = (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
    <path d="M3 2.5 7 6 3 9.5" stroke="#131417" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
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
    <div
      className={`case-cell-${span} ${heightClass}`}
      style={{ position: "relative", background: "#FFFFFF", borderRight: "1px solid #D6D3CB", borderBottom: "1px solid #D6D3CB" }}
    >
      {dots.map((d, i) => (
        <Fragment key={i}>{cornerDotAbs(d, "#FFFFFF")}</Fragment>
      ))}
      {/* Inset from the cell's own border so the corner dots land on plain
          background instead of the photo — otherwise their white punch-box
          shows as a hard-edged square over the image. */}
      <div className="case-cell-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="case-cell-bg" />
        <div className="case-cell-scrim" />
        <Link href={`/case-studies/${slug}`} className="case-cell-overlay">
          <div>
            <div className="case-cell-tag">{tag}</div>
            <h3 className="case-cell-title" style={{ fontSize: titleSize }}>
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
          <span className="case-cell-cta">
            View case study
            {ctaArrow}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <div style={{ position: "relative", margin: "20px var(--bleed) 0" }}>
      {cornerDotAbs({ left: -7.5, top: -7.5 }, "#FFFFFF")}
      {cornerDotAbs({ right: -7.5, top: -7.5 }, "#FFFFFF")}
      {cornerDotAbs({ left: -7.5, bottom: -7.5 }, "#FFFFFF")}
      {cornerDotAbs({ right: -7.5, bottom: -7.5 }, "#FFFFFF")}

      <div className="grid-case">
        <CaseCard
          span={7}
          heightClass="case-cell-h-lg"
          image="/media/case-healthcare.jpg"
          tag="01 — HEALTHCARE"
          title="Making pathology reports easier to understand"
          titleSize={24}
          body="AI-powered analysis that turns complex pathology reports into clearer, structured insights."
          stat={{ value: "80%", label: "faster report review" }}
          slug="making-pathology-reports-easier-to-understand"
          dots={[{ top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }]}
        />

        <CaseCard
          span={5}
          heightClass="case-cell-h-lg"
          image="/media/case-sales.jpg"
          tag="02 — SALES · AI"
          title="Turning sales calls into actionable coaching"
          titleSize={20}
          body="An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to improve."
          stat={{ value: "10K+", label: "calls analyzed" }}
          slug="turning-sales-calls-into-actionable-coaching"
          dots={[{ bottom: 0, right: 0 }]}
        />

        <CaseCard
          span={5}
          heightClass="case-cell-h-md"
          image="/media/case-food.jpg"
          tag="03 — FOOD · AI"
          title="A conversational AI agent built to scale"
          titleSize={20}
          body="Secure, production-ready AI deployed across web and mobile, with authentication, scaling, and observability built in."
          slug="a-conversational-ai-agent-built-to-scale"
          dots={[{ top: 0, right: 0 }, { bottom: 0, right: 0 }]}
        />

        <CaseCard
          span={7}
          heightClass="case-cell-h-md"
          image="/media/case-engineering.jpg"
          tag="04 — ENGINEERING · CLOUD"
          title="Scaling engineering simulations with cloud HPC"
          titleSize={20}
          body="A high-performance AWS environment built for CPU-intensive CFD and GPU-accelerated DEM simulations."
          slug="scaling-engineering-simulations-with-cloud-hpc"
          dots={[]}
        />
      </div>
    </div>
  );
}
