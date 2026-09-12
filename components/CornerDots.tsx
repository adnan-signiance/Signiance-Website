export default function CornerDots({
  position = "bottom",
  bg = "#FFFFFF",
}: {
  position?: "top" | "bottom";
  bg?: string;
}) {
  const sideStyle = position === "top" ? { top: -7.5 } : { bottom: -7.5 };
  return (
    <>
      <div className="corner-dot corner-dot-left" style={{ ...sideStyle, background: bg }} />
      <div className="corner-dot corner-dot-right" style={{ ...sideStyle, background: bg }} />
    </>
  );
}
