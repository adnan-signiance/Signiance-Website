export default function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "Geist, sans-serif",
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: "0.01em",
        textTransform: "uppercase",
        color: "#FFFFFF",
        // Stops entirely within the blue range — the previous gradient faded
        // to white at the trailing edge, which left white text unreadable
        // wherever it landed on that end of the badge.
        background: "linear-gradient(90deg, #152F85 0%, #193DAA 50%, #2C55C4 100%)",
        textShadow: "0 0 5px rgba(10,24,80,0.55), 0 1px 2px rgba(10,24,80,0.45)",
        borderRadius: 4,
        padding: "6px 13px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
