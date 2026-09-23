"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setCurtainActive } from "@/lib/curtainSignal";

const SWEEP_MS = 700;
const MIN_HOLD_MS = 350;

// Only the top-level section name is shown on the curtain — a case study or
// service detail page still reads as "Case Studies" / "Services", since a
// full article title would be too long to read in the half-second it's on
// screen.
function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/services")) return "Services";
  if (pathname.startsWith("/case-studies")) return "Case Studies";
  if (pathname.startsWith("/about")) return "About";
  return "";
}

function isTransitionable(anchor: HTMLAnchorElement, currentPath: string): string | null {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (anchor.getAttribute("data-transition") === "none") return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (href.includes("#")) return null;
  if (href === currentPath) return null;
  if (!href.startsWith("/")) return null;
  return href;
}

// A single panel only ever moves left-to-right: it starts parked off-screen
// left, sweeps in to cover the screen, holds, then continues in the same
// direction off-screen right — never reverses. Once fully exited, it snaps
// back to the left edge with transitions disabled for that one frame, so the
// next transition has somewhere to sweep in from without a visible jump.
type Phase = "idle" | "entering" | "covered" | "exiting";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pendingHref = useRef<string | null>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = isTransitionable(anchor, pathname);
      if (!href) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return; // let the normal Link navigation happen untouched

      e.preventDefault();
      pendingHref.current = href;
      setLabel(getPageLabel(href));
      setPhase("entering");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  // The panel finishes sweeping in SWEEP_MS after it starts — that's when
  // the route swap happens, hidden behind it instead of visible to the user.
  useEffect(() => {
    if (phase !== "entering") return;
    const t = setTimeout(() => {
      if (pendingHref.current) router.push(pendingHref.current);
      setPhase("covered");
    }, SWEEP_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  // Once the new route has actually mounted, hold a beat so the label is
  // legible even on an instant navigation, then continue sweeping right.
  useEffect(() => {
    if (phase === "covered" && pathname !== prevPathname.current) {
      pendingHref.current = null;
      prevPathname.current = pathname;
      const t = setTimeout(() => setPhase("exiting"), MIN_HOLD_MS);
      return () => clearTimeout(t);
    }
    prevPathname.current = pathname;
  }, [pathname, phase]);

  // Fully off-screen to the right — snap back to the left with no
  // transition, ready for the next click to sweep in the same direction.
  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("idle"), SWEEP_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // The page is actually hidden from the user for "entering" and "covered" —
  // scroll-triggered reveals elsewhere gate on this instead of firing the
  // moment they satisfy their own IntersectionObserver, which the curtain's
  // opaque overlay doesn't affect at all.
  useEffect(() => {
    setCurtainActive(phase === "entering" || phase === "covered");
  }, [phase]);

  const transform = phase === "idle" ? "translateX(-100%)" : phase === "exiting" ? "translateX(100%)" : "translateX(0%)";

  return (
    <div className={`page-curtain${phase !== "idle" ? " is-active" : ""}`} aria-hidden="true">
      <div className="curtain-panel" style={{ transform, transition: phase === "idle" ? "none" : undefined }}>
        <div className="curtain-label">{label}</div>
      </div>
    </div>
  );
}
