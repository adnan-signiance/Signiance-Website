/**
 * `rise` is a delay in seconds. Given one, the badge fades up on page load, on
 * the same CSS entrance as the page title beside it (see .hero-rise). It is for
 * eyebrows above the fold; those further down are revealed by <Reveal> instead.
 */
export default function SectionEyebrow({ children, rise }: { children: React.ReactNode; rise?: number }) {
  return (
    <span
      className={rise === undefined ? "section-eyebrow" : "section-eyebrow hero-rise"}
      style={{
        ...(rise === undefined ? null : ({ "--d": `${rise}s` } as React.CSSProperties)),
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-xs)",
        fontWeight: 500,
        letterSpacing: "normal",
        textTransform: "uppercase",
        color: "var(--color-white)",
        // Stops entirely within the blue range — the previous gradient faded
        // to white at the trailing edge, which left white text unreadable
        // wherever it landed on that end of the badge.
        //
        // One style for every section, including the dark proof band: a separate
        // light-on-dark variant made that badge look like a different component.
        // White on the gradient measures 9.2:1 at its darkest stop, so it stays
        // readable against the navy behind it.
        background:
          "linear-gradient(90deg, var(--color-accent-strong) 0%, var(--color-accent) 50%, var(--color-accent-mid) 100%)",
        textShadow: "0 0 5px rgba(10,24,80,0.55), 0 1px 2px rgba(10,24,80,0.45)",
        borderRadius: "var(--radius-sm)",
        padding: "6px 13px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
