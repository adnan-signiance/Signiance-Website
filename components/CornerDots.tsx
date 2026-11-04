export default function CornerDots({
  position = "bottom",
  bg = "var(--color-white)",
}: {
  position?: "top" | "bottom";
  bg?: string;
}) {
  // A mark is 16px wide with 2px strokes, so an offset of 9 centres each stroke on the edge of the rail and the line it sits on, and both land on whole pixels.
  const sideStyle = position === "top" ? { top: -9 } : { bottom: -9 };
  return (
    <>
      <div className="corner-dot corner-dot-left" style={{ ...sideStyle, background: bg }} />
      <div className="corner-dot corner-dot-right" style={{ ...sideStyle, background: bg }} />
    </>
  );
}
