import CornerDots from "./CornerDots";
import { clients, aboutClients } from "@/lib/data";

// The width/height attributes carry the file's aspect ratio at its rendered height, so the
// browser reserves each logo's box before the file arrives and the row does not reflow.
// The inline style still sets the size, with width auto so CSS stays in control.
function logoImg(c: (typeof clients)[number], height = c.height) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={c.src}
      alt={c.alt}
      className={c.invert ? "client-logo client-logo-invert" : "client-logo"}
      width={Math.round((height * c.intrinsicWidth) / c.intrinsicHeight)}
      height={height}
      decoding="async"
      style={{ height, width: "auto" }}
    />
  );
}

function ClientsGrid() {
  return (
    <section style={{ position: "relative" }}>
      <div style={{ padding: "var(--sp-open-top) var(--pad-x) 0" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-h2)",
            lineHeight: 1.04,
            letterSpacing: "var(--tracking-tight)",
            margin: "16px 0 0",
            textWrap: "balance",
          }}
        >
          Our teams have delivered inside
        </h2>
      </div>
      <div style={{ position: "relative", marginTop: "var(--sp-block)" }}>
        <div className="grid-logos">
          {aboutClients.map((c) => (
            <div key={c.alt} className="grid-logos-cell">
              {logoImg(c)}
            </div>
          ))}
        </div>
        <CornerDots position="top" />
      </div>
      <CornerDots />
    </section>
  );
}

/**
 * "Trusted by" and the rolling logos. Used at the foot of the home hero.
 *
 * A continuous right-to-left marquee at every width. The track is the list rendered twice back
 * to back, so translating it exactly -50% returns to an identical frame and loops with no visible
 * reset. The logos are decorative repetition, so the visible track is aria-hidden and the real
 * list is exposed once to assistive technology.
 */
export function ClientLogos() {
  return (
    <div className="client-logos">
      <p className="client-logos-label">Trusted by startups and growing teams at</p>
      <div className="clients-marquee" aria-hidden="true">
        <div className="clients-marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <div key={`${c.alt}-${i}`} className="clients-marquee-item">
              {logoImg(c, c.stripHeight)}
            </div>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.alt}>{c.alt}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ClientsStrip({ variant = "row" }: { variant?: "row" | "grid" }) {
  if (variant === "grid") return <ClientsGrid />;

  return (
    <section
      style={{
        position: "relative",
        // The line pattern starts here on the home page: a first line and its marks above the strip.
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
        padding: "26px var(--pad-x) 28px",
      }}
    >
      <ClientLogos />
      <CornerDots />
    </section>
  );
}
