/**
 * The marker where a section's line meets the page's side rails: a solid dot with a soft halo, and
 * three tapered strokes that run out of it. The strokes are what make the line read as drawn, not
 * ruled: the horizontal line is darkest at the dot and fades to the page's line colour as it runs
 * away, outward across the margin to the edge of the screen and inward along the section; the rail
 * is darkest at the dot and fades up and down. All of it is CSS (see `.corner-dot` in globals.css).
 *
 * `position` says whether the dot sits on the top or the bottom edge of its section. A line is one
 * pixel and the two edges sit half a pixel apart, so the strokes need to know which.
 */
export default function CornerDots({ position = "bottom" }: { position?: "top" | "bottom"; bg?: string }) {
  const sideStyle = position === "top" ? { top: -9 } : { bottom: -9 };
  const dot = (side: "left" | "right") => (
    <div className={`corner-dot corner-dot-${side} corner-dot-${position}`} style={sideStyle} aria-hidden="true">
      <i className="cd-out" />
      <i className="cd-in" />
      <i className="cd-rail" />
    </div>
  );
  return (
    <>
      {dot("left")}
      {dot("right")}
    </>
  );
}
