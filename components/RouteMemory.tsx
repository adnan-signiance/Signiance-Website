"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { markRouteSeen, wasRouteSeen } from "@/lib/routeMemory";

const RevisitContext = createContext(false);

/** True when the current page has already been shown during this visit. */
export function useRevisit() {
  return useContext(RevisitContext);
}

/**
 * Wraps a page's content and says whether it is a repeat view.
 *
 * The answer is read once, when the page mounts, and only then is the route marked as
 * seen, so a page never counts as a repeat of itself. On a first load it is always
 * false, which also keeps server and client markup identical.
 *
 * Repeat views set `data-revisit` on a wrapper that takes no part in layout, which the
 * stylesheet uses to skip the CSS entrance animations (.hero-rise, .hero-word); the
 * scroll-triggered reveals read `useRevisit()` and start already revealed.
 */
export default function RouteMemory({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [revisit] = useState(() => wasRouteSeen(pathname));

  useEffect(() => {
    markRouteSeen(pathname);
  }, [pathname]);

  return (
    <RevisitContext.Provider value={revisit}>
      <div data-revisit={revisit ? "" : undefined} style={{ display: "contents" }}>
        {children}
      </div>
    </RevisitContext.Provider>
  );
}
