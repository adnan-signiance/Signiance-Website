"use client";

import { useEffect, useState } from "react";

export type GridDotPoint = { x: number; y: number };

// Reads the actual rendered cells rather than assuming a fixed row/column
// count, so a dot lands at every real border intersection whether the grid
// is a full, even layout or a ragged, odd-count row, and stays correct
// across responsive breakpoints that change the column count.
export function useGridIntersectionDots(
  containerRef: React.RefObject<HTMLDivElement | null>,
  cellSelector: string,
  deps: unknown[]
) {
  const [dots, setDots] = useState<GridDotPoint[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const rect = container.getBoundingClientRect();
      const cells = Array.from(container.querySelectorAll<HTMLElement>(cellSelector));
      const uniq = new Map<string, GridDotPoint>();
      cells.forEach((cell) => {
        const r = cell.getBoundingClientRect();
        const left = Math.round(r.left - rect.left);
        const right = Math.round(r.right - rect.left);
        const top = Math.round(r.top - rect.top);
        const bottom = Math.round(r.bottom - rect.top);
        [
          { x: left, y: top },
          { x: right, y: top },
          { x: left, y: bottom },
          { x: right, y: bottom },
        ].forEach((p) => uniq.set(`${p.x},${p.y}`, p));
      });
      setDots(Array.from(uniq.values()));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return dots;
}

export function GridDotsOverlay({ dots }: { dots: GridDotPoint[] }) {
  return (
    <>
      {dots.map((d) => (
        <span
          key={`${d.x},${d.y}`}
          className="corner-dot"
          style={{ top: d.y, left: d.x, bottom: "auto", right: "auto", transform: "translate(-50%, -50%)" }}
        />
      ))}
    </>
  );
}
