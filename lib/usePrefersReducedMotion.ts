import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Server render has no media queries; assume motion is allowed so the markup
// matches the common client case and hydration stays stable.
function getServerSnapshot() {
  return false;
}

/**
 * Reads `prefers-reduced-motion` as reactive state.
 *
 * Uses `useSyncExternalStore` rather than the usual effect-plus-setState so
 * that reading the preference never schedules a synchronous state update from
 * inside an effect (which causes cascading re-renders and is flagged by
 * `react-hooks/set-state-in-effect`). It also stays live: a user toggling the
 * OS setting updates components without a reload.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
