export default function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
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
        background: "linear-gradient(90deg, #152F85 0%, #193DAA 45%, #4F6FDB 78%, #FFFFFF 100%)",
        textShadow: "0 0 5px rgba(10,24,80,0.55), 0 1px 2px rgba(10,24,80,0.45)",
        borderRadius: 3,
        padding: "5px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
