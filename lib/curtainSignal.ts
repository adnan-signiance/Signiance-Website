// The page-transition curtain (PageTransition.tsx) fully covers the page for
// a beat after every internal navigation. A scroll-triggered animation whose
// target sits high enough on the new page can satisfy its IntersectionObserver
// threshold the instant the page mounts — while still hidden behind that
// curtain — so most of its motion plays off-screen and it looks like it
// "pops" instead of animating. Components gate their reveal on this signal
// instead of firing the moment they intersect.
type Listener = () => void;

let curtainActive = false;
const listeners = new Set<Listener>();

export function setCurtainActive(active: boolean) {
  curtainActive = active;
  if (!active) {
    listeners.forEach((l) => l());
  }
}

export function isCurtainActive() {
  return curtainActive;
}

// Fires once, the next time the curtain clears (or immediately if it's
// already clear). Returns an unsubscribe function for the pending case.
export function onCurtainClear(listener: Listener): () => void {
  if (!curtainActive) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}
