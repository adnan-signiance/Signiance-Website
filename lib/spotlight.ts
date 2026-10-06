import type { PointerEvent } from "react";

/**
 * Cursor-following glow. Attach to a *grid* as its `onPointerMove`; it finds the
 * `[data-spot]` cell under the pointer and writes that cell's `--mx` / `--my`.
 *
 * One listener per grid rather than one per cell, and it only writes two CSS
 * custom properties — the gradient itself lives in CSS, so nothing re-renders as
 * the pointer moves.
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType === "touch") return;
  const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
  if (!cell) return;
  const r = cell.getBoundingClientRect();
  cell.style.setProperty("--mx", `${e.clientX - r.left}px`);
  cell.style.setProperty("--my", `${e.clientY - r.top}px`);
}
