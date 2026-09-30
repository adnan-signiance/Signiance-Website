import { useSyncExternalStore } from "react";

// Never changes after hydration, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * `false` during server render and the hydration pass, `true` afterwards.
 *
 * Used to defer rendering UI that depends on client-only state (such as a
 * cookie) until hydration has finished, which avoids both a hydration mismatch
 * and a flash of content aimed at first-time visitors being shown to returning
 * ones.
 *
 * Implemented with `useSyncExternalStore` rather than the more familiar
 * `useState` + `useEffect` so that it never calls setState from inside an
 * effect — that pattern forces a second render pass and is flagged by
 * `react-hooks/set-state-in-effect`.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
