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
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
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
      <div style={{ padding: "clamp(36px, 5vw, 48px) var(--pad-x) 0" }}>
        <SectionEyebrow>Clients</SectionEyebrow>
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
        borderBottom: "1px solid var(--color-line)",
        padding: "26px var(--pad-x) 28px",
      }}
    >
      {/* This strip sits inside the first screen, so it joins the hero's page-load
          sequence (CSS, no script) instead of waiting on a scroll reveal. */}
      <p className="hero-rise hero-d3" style={{ margin: "0 0 22px" }}>
        <SectionEyebrow>Trusted By Teams At</SectionEyebrow>
      </p>
      {/* A continuous right-to-left marquee at every width, not just on mobile.
          The track is the list rendered twice back to back, so translating it
          exactly -50% returns to an identical frame and loops with no visible
          reset.

          The logos are decorative repetition here, so the visible track is
          aria-hidden and the real list is exposed once to assistive technology
          below. */}
      <div className="clients-marquee hero-rise hero-d3" aria-hidden="true">
        <div className="clients-marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <div key={`${c.alt}-${i}`} className="clients-marquee-item">
              {logoImg(c)}
            </div>
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.alt}>{c.alt}</li>
        ))}
      </ul>
      <CornerDots />
    </section>
  );
}
