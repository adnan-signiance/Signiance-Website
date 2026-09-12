import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { clients } from "@/lib/data";

export default function ClientsStrip() {
  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "26px var(--pad-x) 28px",
      }}
    >
      <p style={{ margin: "0 0 22px" }}>
        <SectionEyebrow>Our teams have delivered inside</SectionEyebrow>
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(26px, 4.5vw, 52px)",
          rowGap: 26,
          flexWrap: "wrap",
        }}
      >
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
