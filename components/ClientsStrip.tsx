import CornerDots from "./CornerDots";
import { clients } from "@/lib/data";

export default function ClientsStrip() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "26px 28px 28px",
      }}
    >
      <p style={{ margin: "0 0 22px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "Geist, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            background:
              "linear-gradient(90deg, #193DAA 0%, #193DAA 45%, #FFFFFF 82%, #FFFFFF 100%)",
            borderRadius: 3,
            padding: "5px 10px",
            whiteSpace: "nowrap",
          }}
        >
          Our teams have delivered inside
        </span>
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 52, flexWrap: "wrap" }}>
        {clients.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.alt}
            src={c.src}
            alt={c.alt}
            className={c.invert ? "client-logo client-logo-invert" : "client-logo"}
            style={{ height: c.height }}
          />
        ))}
      </div>
      <CornerDots />
    </section>
  );
}
