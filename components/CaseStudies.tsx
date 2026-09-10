const ArrowIcon = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
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
    <div style={{ position: "relative", margin: "20px -28px 0" }}>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          borderTop: "1px solid #D6D3CB",
          borderLeft: "1px solid #D6D3CB",
        }}
      >
        {/* 01 — Healthcare */}
        <div
          style={{
            gridColumn: "span 7",
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
          }}
        >
          {cornerDotAbs({ top: 0, right: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, left: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, right: 0 }, "#FFFFFF")}
          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
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
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: "auto", paddingTop: 14, fontSize: 12, fontWeight: 500, color: "#131417", whiteSpace: "nowrap" }}>
              View case study
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* 02 — Sales AI (dark) */}
        <div
          style={{
            gridColumn: "span 5",
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#0D184A",
          }}
        >
          {cornerDotAbs({ bottom: 0, right: 0 }, "#0D184A")}
          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/light-02.png" alt="" style={{ display: "block", width: "100%", height: 140, objectFit: "cover", opacity: 0.9 }} />
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9B8E4", marginTop: 6 }}>
              02 — SALES · AI
            </div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.02em",
                margin: "4px 0 0",
                color: "#FFFFFF",
              }}
            >
              Turning sales calls into actionable coaching
            </h3>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#C9C6C0" }}>
              An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to
              improve.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 4 }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 19, color: "#A9B8E4" }}>
                10K+
              </span>
              <span style={{ fontSize: 12, color: "#C9C6C0" }}>calls analyzed</span>
            </div>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: "auto", paddingTop: 14, fontSize: 12, fontWeight: 500, color: "#FFFFFF", whiteSpace: "nowrap" }}>
              View case study
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* 03 — Food AI */}
        <div
          style={{
            gridColumn: "span 5",
            position: "relative",
            borderRight: "1px solid #D6D3CB",
            borderBottom: "1px solid #D6D3CB",
            background: "#FFFFFF",
          }}
        >
          {cornerDotAbs({ top: 0, right: 0 }, "#FFFFFF")}
          {cornerDotAbs({ bottom: 0, right: 0 }, "#FFFFFF")}
          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6, height: "100%", boxSizing: "border-box" }}>
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
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: "auto", paddingTop: 14, fontSize: 12, fontWeight: 500, color: "#131417", whiteSpace: "nowrap" }}>
              View case study
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* 04 — Engineering / Cloud */}
        <div
          style={{
            gridColumn: "span 7",
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
          <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
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
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 10, fontSize: 12, fontWeight: 500, color: "#131417", whiteSpace: "nowrap" }}>
              View case study
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
