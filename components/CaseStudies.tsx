import Link from "next/link";

const ViewButton = ({ slug }: { slug: string }) => (
  <Link href={`/case-studies/${slug}`} className="btn-icon" aria-label="View case study">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 3 8 6l-3.5 3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Link>
);

const cornerDotAbs = (pos: { top?: number; bottom?: number; left?: number; right?: number }, bg: string) => (
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

export default function CaseStudies() {
  return (
    <div style={{ position: "relative", margin: "20px var(--bleed) 0" }}>
      <span
        style={{
          position: "absolute",
          left: -7.5,
          top: -7.5,
          width: 15,
          height: 15,
          background: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
      </span>
      <span
        style={{
          position: "absolute",
          right: -7.5,
          top: -7.5,
          width: 15,
          height: 15,
          background: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
      </span>
      <span
        style={{
          position: "absolute",
          left: -7.5,
          bottom: -7.5,
          width: 15,
          height: 15,
          background: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
      </span>
      <span
        style={{
          position: "absolute",
          right: -7.5,
          bottom: -7.5,
          width: 15,
          height: 15,
          background: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
      </span>

      <div className="grid-case">
        {/* 01 — Healthcare */}
        <div
          className="case-cell-7"
          style={{
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
          }}
        >
          {cornerDotAbs({ top: 0, right: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, left: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, right: 0 }, "#FFFFFF")}
          <div style={{ padding: "18px 50px 50px 18px", display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/light-01.png" alt="" style={{ display: "block", width: "100%", height: 200, objectFit: "cover" }} />
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71", marginTop: 6 }}>
              01 — HEALTHCARE
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: "-0.025em",
                margin: "4px 0 0",
              }}
            >
              Making pathology reports easier to understand
            </h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#43464A", maxWidth: "42ch" }}>
              AI-powered analysis that turns complex pathology reports into clearer, structured insights.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 6 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 21, color: "#193DAA" }}>
                80%
              </span>
              <span style={{ fontSize: 12, color: "#55585C" }}>faster report review</span>
            </div>
          </div>
          <ViewButton slug="making-pathology-reports-easier-to-understand" />
        </div>

        {/* 02 — Sales AI */}
        <div
          className="case-cell-5"
          style={{
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
          }}
        >
          {cornerDotAbs({ bottom: 0, right: 0 }, "#FFFFFF")}
          <div style={{ padding: "18px 50px 50px 18px", display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/light-02.png" alt="" style={{ display: "block", width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71", marginTop: 6 }}>
              02 — SALES · AI
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.02em",
                margin: "4px 0 0",
              }}
            >
              Turning sales calls into actionable coaching
            </h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#43464A" }}>
              An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to
              improve.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 4 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 19, color: "#193DAA" }}>
                10K+
              </span>
              <span style={{ fontSize: 12, color: "#55585C" }}>calls analyzed</span>
            </div>
          </div>
          <ViewButton slug="turning-sales-calls-into-actionable-coaching" />
        </div>

        {/* 03 — Food AI */}
        <div
          className="case-cell-5"
          style={{
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
          }}
        >
          {cornerDotAbs({ top: 0, right: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, right: 0 }, "#FFFFFF")}
          <div style={{ padding: "18px 50px 50px 18px", display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/eng-01.png" alt="" style={{ display: "block", width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71", marginTop: 6 }}>
              03 — FOOD · AI
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.02em",
                margin: "4px 0 0",
              }}
            >
              A conversational AI agent built to scale
            </h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#43464A" }}>
              Secure, production-ready AI deployed across web and mobile, with authentication, scaling, and
              observability built in.
            </p>
          </div>
          <ViewButton slug="a-conversational-ai-agent-built-to-scale" />
        </div>

        {/* 04 — Engineering / Cloud */}
        <div
          className="case-cell-7 case-cell-split"
          style={{
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            alignItems: "stretch",
          }}
        >
          <div style={{ padding: "18px 0 18px 18px", boxSizing: "border-box" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/light-03.png" alt="" style={{ display: "block", width: "100%", height: "100%", minHeight: 160, objectFit: "cover" }} />
          </div>
          <div style={{ padding: "22px 50px 22px 24px", display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71" }}>
              04 — ENGINEERING · CLOUD
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.025em",
                margin: "4px 0 0",
              }}
            >
              Scaling engineering simulations with cloud HPC
            </h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#43464A" }}>
              A high-performance AWS environment built for CPU-intensive CFD and GPU-accelerated DEM simulations.
            </p>
          </div>
          <ViewButton slug="scaling-engineering-simulations-with-cloud-hpc" />
        </div>
      </div>
    </div>
  );
}
