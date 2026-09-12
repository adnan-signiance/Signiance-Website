import CornerDots from "./CornerDots";
import { services } from "@/lib/data";

export default function ServicesHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(48px, 6.4vw, 70px) var(--pad-x) clamp(40px, 5vw, 54px)",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
          background: "#193DAA",
          borderRadius: 10,
          padding: "10px 22px",
        }}
      >
        Services
      </span>
      <h1
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(30px, 4.6vw, 48px)",
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          margin: "22px 0 0",
          maxWidth: "16ch",
          textWrap: "balance",
        }}
      >
        Five practices, one senior team
      </h1>
      <p style={{ maxWidth: 560, margin: "16px 0 0", fontSize: 16, lineHeight: 1.6, color: "#43464A" }}>
        Scoped in a week, delivered against outcomes you define. Every engagement below is staffed by the
        people who build — not a bench.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 26,
          fontSize: 12.5,
          fontWeight: 500,
          color: "#131417",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#193DAA" strokeWidth="1.2" />
            <path d="M4.5 7.2 6.3 9l3.2-4" stroke="#193DAA" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Fixed-fee scoping, credited to the build
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="#193DAA" strokeWidth="1.2" />
            <circle cx="7" cy="7" r="1.8" fill="#193DAA" />
          </svg>
          Senior-only pods, no bench time
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 30, flexWrap: "wrap" }}>
        {services.map((sv) => (
          <a
            key={sv.id}
            href={`#${sv.id}`}
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              color: "#43464A",
              background: "#EEF2FB",
              borderRadius: 999,
              padding: "7px 14px",
              whiteSpace: "nowrap",
            }}
          >
            {sv.short}
          </a>
        ))}
      </div>
      <CornerDots />
    </section>
  );
}
