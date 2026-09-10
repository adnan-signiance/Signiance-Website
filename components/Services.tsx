import CornerDots from "./CornerDots";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      style={{ position: "relative", borderBottom: "1px solid #E2E0DA", padding: "58px 28px 60px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
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
            whiteSpace: "nowrap",
          }}
        >
          Services
        </span>
        <p style={{ maxWidth: 330, margin: 0, fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          Five practices, one senior team. Scoped in a week, delivered against outcomes you define.
        </p>
      </div>

      <div style={{ position: "relative", margin: "34px -28px 0", padding: "0 28px" }}>
        {services.map((sv) => (
          <a key={sv.no} href="#contact" className="service-row">
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
              }}
            >
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
            </span>

            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12,
                color: "#A29E96",
              }}
            >
              {sv.no}
            </span>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "inherit",
                textWrap: "balance",
              }}
            >
              {sv.title}
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#55585C", textWrap: "pretty" }}>
              {sv.body}
            </p>
            <svg
              className="service-arrow"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 9h11M10 4.5 14.5 9 10 13.5" stroke="#193DAA" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </a>
        ))}
        <div style={{ position: "relative", borderTop: "1px solid #E2E0DA" }}>
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
            }}
          >
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#A29E96" }} />
          </span>
        </div>
      </div>

      <CornerDots />
    </section>
  );
}
