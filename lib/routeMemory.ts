/**
 * Which routes have already been shown during this visit.
 *
 * Page entrance animations (word reveals, fade-ups, count-ups) are for the first time
 * a visitor sees a page. Coming back to a page they have already seen, via a link or
 * the browser's back button, should show it as it was, not replay the whole entrance.
 *
 * Kept in module memory rather than storage on purpose: it lasts for the client-side
 * navigation session, and a full reload (a new visit) plays the entrance again.
 */
const seen = new Set<string>();

export function wasRouteSeen(path: string): boolean {
  return seen.has(path);
}

export function markRouteSeen(path: string) {
  seen.add(path);
}
