import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { clients, aboutClients } from "@/lib/data";

const GRID_COLS = 3;
const ROW_H = 108;

function logoImg(c: (typeof clients)[number]) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={c.src}
      alt={c.alt}
      className={c.invert ? "client-logo client-logo-invert" : "client-logo"}
      style={{ height: c.height }}
    />
  );
}

// Every point where an internal divider meets another line — including
// where it runs into the outer edge — gets the site's dot marker, the same
// treatment CornerDots gives a section's top/bottom border. The four true
// corners of the grid are already covered by the CornerDots above and below
// it, so only the interior crossings and edge-interior points are listed
// here to avoid painting the same corner twice.
//
// Each dot is centered on its line the exact same way CornerDots centers
// its own — a literal -7.5px offset (half the 15px box) — rather than a
// transform, so every dot on the page rasterizes identically instead of
// interior ones landing on a different sub-pixel offset and looking smaller.
function GridDots({ rows }: { rows: number }) {
  const xs = Array.from({ length: GRID_COLS - 1 }, (_, i) => ((i + 1) / GRID_COLS) * 100);
  const ys = Array.from({ length: rows - 1 }, (_, i) => (i + 1) * ROW_H);
  const points: { style: React.CSSProperties }[] = [];
  const at = (horiz: React.CSSProperties, y: number) => ({ style: { ...horiz, top: `${y - 7.5}px` } });

  ys.forEach((y) => {
    points.push(at({ left: -7.5 }, y));
    points.push(at({ right: -7.5 }, y));
    xs.forEach((x) => points.push(at({ left: `calc(${x}% - 7.5px)` }, y)));
  });
  xs.forEach((x) => {
    points.push(at({ left: `calc(${x}% - 7.5px)` }, 0));
    points.push(at({ left: `calc(${x}% - 7.5px)` }, rows * ROW_H));
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {points.map((p, i) => (
        <span key={i} className="corner-dot" style={p.style} />
      ))}
    </div>
  );
}

function ClientsGrid() {
  const rows = Math.ceil(aboutClients.length / GRID_COLS);
  return (
    <section style={{ position: "relative" }}>
      <h2
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(22px, 2.6vw, 28px)",
          letterSpacing: "-0.03em",
          textAlign: "center",
          margin: 0,
          padding: "clamp(36px, 5vw, 48px) var(--pad-x) 0",
        }}
      >
        Our teams have delivered inside
      </h2>
      <div style={{ position: "relative", marginTop: "clamp(28px, 4vw, 40px)" }}>
        <div className="grid-logos">
          {aboutClients.map((c) => (
            <div key={c.alt} className="grid-logos-cell">
              {logoImg(c)}
            </div>
          ))}
        </div>
        <GridDots rows={rows} />
        <CornerDots position="top" />
      </div>
      <CornerDots />
    </section>
  );
}

export default function ClientsStrip({ variant = "row" }: { variant?: "row" | "grid" }) {
  if (variant === "grid") return <ClientsGrid />;

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
        className="clients-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(26px, 4.5vw, 52px)",
          rowGap: 26,
          flexWrap: "wrap",
        }}
      >
        {clients.map((c) => (
          <div key={c.alt}>{logoImg(c)}</div>
        ))}
      </div>
      {/* Mobile-only: the same logos as a continuous right-to-left marquee.
          The track is the list twice back to back, so animating it exactly
          -50% loops seamlessly with no visible reset. */}
      <div className="clients-marquee" aria-hidden="true">
        <div className="clients-marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="clients-marquee-item">
              {logoImg(c)}
            </div>
          ))}
        </div>
      </div>
      <CornerDots />
    </section>
  );
}
