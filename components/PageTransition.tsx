"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setCurtainActive } from "@/lib/curtainSignal";

// The curtain covers the viewport for SWEEP_MS + MIN_HOLD_MS on every internal
// navigation, during which the destination is invisible and clicks are
// swallowed. It was 1050ms, then 580ms; at 320 + 90 the effect is still legible
// but a click reaches its destination in well under a second. Routes are
// prefetched on hover, focus and touch (below), so the swap behind the curtain
// is normally instant and the sweeps are the only wait.
const SWEEP_MS = 320;
const MIN_HOLD_MS = 90;

// Only the top-level section name is shown on the curtain — a case study or
// service detail page still reads as "Case Studies" / "Services", since a
// full article title would be too long to read in the half-second it's on
// screen.
function getPageLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/services")) return "Services";
  if (pathname.startsWith("/case-studies")) return "Case Studies";
  if (pathname.startsWith("/how-we-work")) return "How We Work";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/blog")) return "Blog";
  if (pathname.startsWith("/careers")) return "Careers";
  return "";
}

type Link =
  | { kind: "page"; href: string; path: string; hash: string }
  | { kind: "scroll"; id: string; href: string };

/**
 * Classifies a clicked anchor.
 *  - "page":   an internal link to another route (with or without a #section). It gets
 *              the curtain, and a #section is scrolled to behind it.
 *  - "scroll": a #section on the page already open ("/#contact" while on "/"). No
 *              navigation is needed, so it glides there instead of jumping.
 *  - null:     anything else, left to the browser.
 */
function classifyLink(anchor: HTMLAnchorElement, currentPath: string): Link | null {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (anchor.getAttribute("data-transition") === "none") return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  if (!href.startsWith("/")) return null; // also leaves bare "#fragment" links (the skip link) alone

  const hashAt = href.indexOf("#");
  const path = hashAt === -1 ? href : href.slice(0, hashAt) || "/";
  const hash = hashAt === -1 ? "" : href.slice(hashAt + 1);

  if (path === currentPath) {
    return hash ? { kind: "scroll", id: hash, href } : null;
  }
  return { kind: "page", href, path, hash };
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
      const link = classifyLink(anchor, pathname);
      if (!link) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (link.kind === "scroll") {
        const el = document.getElementById(link.id);
        if (!el) return;
        e.preventDefault();
        // scroll-margin-top on the target keeps it clear of the fixed header.
        el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        window.history.pushState(null, "", link.href);
        return;
      }

      if (reduceMotion) return; // let the normal Link navigation happen untouched

      e.preventDefault();
      pendingHref.current = link.href;
      setLabel(link.hash === "contact" ? "Contact" : getPageLabel(link.path));
      setPhase("entering");
    };

    // Fetch the destination while the pointer is still on its way to the click, so by
    // the time the curtain has covered the page the route is already there.
    const warm = (e: Event) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const link = classifyLink(anchor, pathname);
      if (link?.kind === "page") router.prefetch(link.path);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("touchstart", warm, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("touchstart", warm);
    };
  }, [pathname, router]);

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
        <div className="curtain-label">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/signiance-dark.webp" alt="" className="curtain-logo" />
          <div>{label}</div>
        </div>
      </div>
    </div>
  );
}
