"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, caseStudyEntries, services } from "@/lib/data";
import CornerDots from "./CornerDots";
import "../app/header.css";

type MenuName = "services" | "resources";

const RESOURCES = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blogs", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

/** The result each practice is shown with: its first case study that has a headline figure. */
function resultFor(practice: string) {
  const c = caseStudyEntries.find((e) => e.category === practice && e.statValue && e.statLabel);
  return c ? { value: c.statValue as string, label: c.statLabel as string, title: c.title, href: `/case-studies/${c.slug}` } : null;
}

const ArrowIcon = () => (
  <svg className="site-panel-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6h8M6.5 2.5 10 6 6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`site-chevron${open ? " is-open" : ""}`}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
  >
    <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The wordmark. When the page has scrolled it folds down to the mark alone. */
function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className={`site-logo${compact ? " is-compact" : ""}`} aria-label={brand}>
      <span className="site-logo-clip">
        <Image
          src="/media/logo_2_blue.svg"
          alt=""
          // Intrinsic size of the source file; the style below controls the rendered size.
          width={538}
          height={125}
          priority
          className="site-logo-img"
        />
      </span>
    </Link>
  );
}

export default function Header({ plain = false }: { plain?: boolean }) {
  const pathname = usePathname();
  const isServicesPage = pathname.startsWith("/services");
  const isResourcesPage =
    pathname.startsWith("/case-studies") || pathname.startsWith("/blog") || pathname.startsWith("/careers");
  const isHowWeWorkPage = pathname.startsWith("/how-we-work");
  const isAboutPage = pathname.startsWith("/about");

  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"light" | "navy">("light");
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  // The menu whose content is mounted: it follows the open one at once and lets go shortly after the
  // panel has faded, so a closed menu leaves no hidden text on the page.
  const [rendered, setRendered] = useState<MenuName | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [resourcesLeft, setResourcesLeft] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesTriggerRef = useRef<HTMLSpanElement>(null);
  const resourcesTriggerRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<Record<MenuName, HTMLDivElement | null>>({ services: null, resources: null });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Scroll behaviour, one pass per frame: the bar stays where it is, turns solid once the page
  // moves, folds its wordmark to the mark, and takes the tone of the section behind it.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const bar = headerRef.current;
      const h = bar ? bar.offsetHeight : 70;

      setScrolled(y > 16);

      let next: "light" | "navy" = "light";
      document.querySelectorAll<HTMLElement>("[data-nav-tone]").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top <= h / 2 && b.bottom > h / 2) next = el.dataset.navTone === "navy" ? "navy" : "light";
      });
      setTone(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (activeMenu) return;
    const t = setTimeout(() => setRendered(null), 320);
    return () => clearTimeout(t);
  }, [activeMenu]);

  useEffect(() => {
    if (!activeMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMenu]);

  // Close the sheet on navigation (React's documented "reset state when a prop changes" pattern).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
    setActiveMenu(null);
  }

  // Back above the breakpoint the sheet must not stay mounted but hidden.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1080) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
        setMobileResourcesOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openMenu = (name: MenuName) => {
    clearTimeout(closeTimer.current);
    if (name === "resources") {
      const bar = headerRef.current;
      const trigger = resourcesTriggerRef.current;
      if (bar && trigger) setResourcesLeft(trigger.getBoundingClientRect().left - bar.getBoundingClientRect().left - 14);
    }
    setRendered(name);
    setActiveMenu(name);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 220);
  };

  const keepOpen = () => clearTimeout(closeTimer.current);

  const toggleMenu = (name: MenuName) => {
    if (activeMenu === name) setActiveMenu(null);
    else openMenu(name);
  };

  const focusFirstIn = (name: MenuName) => {
    // The panel is visibility:hidden while closed and cannot take focus until it is shown.
    requestAnimationFrame(() => panelRefs.current[name]?.querySelector<HTMLAnchorElement>("a")?.focus());
  };

  /** Disclosure pattern for the triggers: Escape closes, Arrow Down opens and moves in. */
  const onTriggerKeyDown = (event: React.KeyboardEvent, name: MenuName) => {
    if (event.key === "Escape") {
      setActiveMenu(null);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(name);
      focusFirstIn(name);
    }
  };

  /** Inside a panel: arrows move between its links, Home and End jump, Escape returns to the trigger. */
  const onPanelKeyDown = (event: React.KeyboardEvent, name: MenuName) => {
    if (event.key === "Escape") {
      setActiveMenu(null);
      const trigger = name === "services" ? servicesTriggerRef.current : resourcesTriggerRef.current;
      trigger?.querySelector<HTMLElement>("button, a")?.focus();
      return;
    }
    const links = Array.from(panelRefs.current[name]?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (at === -1) return;
    const move = (to: number) => {
      event.preventDefault();
      links[(to + links.length) % links.length]?.focus();
    };
    if (event.key === "ArrowDown") move(at + 1);
    else if (event.key === "ArrowUp") move(at - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(links.length - 1);
  };

  /** Closes once focus leaves the header entirely, so tabbing past it tidies up. */
  const onHeaderBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveMenu(null);
  };

  // The sheet covers the page, so focus moves into it, stays inside it, and returns to the toggle on
  // close (WCAG 2.1.2, 2.4.3); the page behind it does not scroll.
  useEffect(() => {
    if (!mobileOpen) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusable = () =>
      Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter((el) => el.offsetParent !== null);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.sheetOpen = "true";
    (sheet.querySelector<HTMLElement>(".site-sheet-link") ?? focusable()[0])?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.sheetOpen;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const current = services[activeService] ?? services[0];
  const result = resultFor(current.short);

  const cta = (className: string) => (
    <Link href="/#contact" className={`btn-primary ${className}`}>
      <span className="btn-primary-arrow-in">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="btn-primary-label">Book a scoping call</span>
      <span className="btn-primary-arrow-out">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M3 2.5 7 6 3 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled}
      data-tone={tone}
      data-plain={plain}
      onBlur={onHeaderBlur}
    >
      <div className="site-bar">
        <div className="site-bar-left">
          <Logo compact={scrolled} />

          <nav className="site-links" aria-label="Primary">
            <span
              ref={servicesTriggerRef}
              className="site-item"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={scheduleClose}
            >
              <Link
                href="/services"
                className={`site-link${isServicesPage ? " is-current" : ""}`}
                aria-current={isServicesPage ? "page" : undefined}
              >
                Services
              </Link>
              <button
                type="button"
                className="site-disclosure"
                aria-label="Services submenu"
                aria-haspopup="true"
                aria-expanded={activeMenu === "services"}
                aria-controls="nav-panel-services"
                onClick={() => toggleMenu("services")}
                onKeyDown={(e) => onTriggerKeyDown(e, "services")}
              >
                <Chevron open={activeMenu === "services"} />
              </button>
            </span>

            <span
              ref={resourcesTriggerRef}
              className="site-item"
              onMouseEnter={() => openMenu("resources")}
              onMouseLeave={scheduleClose}
            >
              {/* Resources has no page of its own, so the trigger carries the label. */}
              <button
                type="button"
                className={`site-link site-link--button${isResourcesPage ? " is-current" : ""}`}
                aria-haspopup="true"
                aria-expanded={activeMenu === "resources"}
                aria-controls="nav-panel-resources"
                onClick={() => toggleMenu("resources")}
                onKeyDown={(e) => onTriggerKeyDown(e, "resources")}
              >
                Resources
                <Chevron open={activeMenu === "resources"} />
              </button>
            </span>

            <Link
              href="/how-we-work"
              className={`site-link${isHowWeWorkPage ? " is-current" : ""}`}
              aria-current={isHowWeWorkPage ? "page" : undefined}
            >
              How We Work
            </Link>
            <Link
              href="/about"
              className={`site-link${isAboutPage ? " is-current" : ""}`}
              aria-current={isAboutPage ? "page" : undefined}
            >
              About
            </Link>
          </nav>
        </div>

        {cta("site-cta")}

        <button
          type="button"
          ref={toggleRef}
          className="site-toggle"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="site-sheet"
          onClick={() => setMobileOpen(true)}
        >
          <span className="site-toggle-bar" />
          <span className="site-toggle-bar" />
        </button>
      </div>

      {/* Services: the five practices as large type, and beside them what the one you are on is
          for and a real result from it. */}
      <div
        id="nav-panel-services"
        ref={(el) => {
          panelRefs.current.services = el;
        }}
        className={`site-panel site-panel--services${activeMenu === "services" ? " is-open" : ""}`}
        onMouseEnter={keepOpen}
        onMouseLeave={scheduleClose}
        onKeyDown={(e) => onPanelKeyDown(e, "services")}
      >
        {rendered === "services" && (
        <div className="site-panel-grid">
          <ul className="site-panel-list">
            {services.map((sv, i) => (
              <li key={sv.id} style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={`/services/${sv.slug}`}
                  className="site-panel-item"
                  data-active={i === activeService}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                >
                  {sv.navLabel}
                  <ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
          <div className="site-panel-detail" key={current.id}>
            <p className="site-panel-desc">{current.long}</p>
            {result && (
              <Link href={result.href} className="site-panel-result">
                <span className="site-panel-figure">{result.value}</span>
                <span className="site-panel-figure-label">{result.label}</span>
                <span className="site-panel-case">{result.title}</span>
              </Link>
            )}
          </div>
        </div>
        )}
      </div>

      <div
        id="nav-panel-resources"
        ref={(el) => {
          panelRefs.current.resources = el;
        }}
        className={`site-panel site-panel--small${activeMenu === "resources" ? " is-open" : ""}`}
        style={{ "--panel-left": `${resourcesLeft}px` } as React.CSSProperties}
        onMouseEnter={keepOpen}
        onMouseLeave={scheduleClose}
        onKeyDown={(e) => onPanelKeyDown(e, "resources")}
      >
        {rendered === "resources" && (
        <ul className="site-panel-small-list">
          {RESOURCES.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="site-panel-small-item">
                {r.label}
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
        )}
      </div>

      {/* Phones and tablets: the menu is a full-screen sheet. Links are large, the one action is
          pinned to the foot. */}
      <div
        ref={sheetRef}
        id="site-sheet"
        className={`site-sheet${mobileOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!mobileOpen}
      >
        <div className="site-sheet-top">
          <Link href="/" className="site-logo is-light" aria-label={brand}>
            <span className="site-logo-clip">
              <Image src="/media/logo_2_blue.svg" alt="" width={538} height={125} className="site-logo-img" />
            </span>
          </Link>
          <button
            type="button"
            className="site-sheet-close"
            aria-label="Close menu"
            onClick={() => {
              setMobileOpen(false);
              toggleRef.current?.focus();
            }}
          >
            <span className="site-toggle-bar" />
            <span className="site-toggle-bar" />
          </button>
        </div>

        <nav className="site-sheet-nav" aria-label="Menu">
          <div className="site-sheet-row" style={{ "--i": 0 } as React.CSSProperties}>
            <Link href="/services" className="site-sheet-link">
              Services
            </Link>
            <button
              type="button"
              className="site-sheet-caret"
              aria-label={mobileServicesOpen ? "Hide services" : "Show services"}
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              <Chevron open={mobileServicesOpen} />
            </button>
          </div>
          <div className={`site-sheet-subs${mobileServicesOpen ? " is-open" : ""}`}>
            <div className="site-sheet-subs-inner">
              {services.map((sv) => (
                <Link key={sv.id} href={`/services/${sv.slug}`} className="site-sheet-sub">
                  {sv.navLabel}
                </Link>
              ))}
            </div>
          </div>

          <div className="site-sheet-row" style={{ "--i": 1 } as React.CSSProperties}>
            <button
              type="button"
              className="site-sheet-link site-sheet-link--button"
              aria-expanded={mobileResourcesOpen}
              onClick={() => setMobileResourcesOpen((v) => !v)}
            >
              Resources
            </button>
            <span className="site-sheet-caret-mark" aria-hidden="true">
              <Chevron open={mobileResourcesOpen} />
            </span>
          </div>
          <div className={`site-sheet-subs${mobileResourcesOpen ? " is-open" : ""}`}>
            <div className="site-sheet-subs-inner">
              {RESOURCES.map((r) => (
                <Link key={r.href} href={r.href} className="site-sheet-sub">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="site-sheet-row" style={{ "--i": 2 } as React.CSSProperties}>
            <Link href="/how-we-work" className="site-sheet-link">
              How We Work
            </Link>
          </div>
          <div className="site-sheet-row" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/about" className="site-sheet-link">
              About
            </Link>
          </div>
        </nav>

        {cta("site-sheet-cta")}
      </div>

      {!plain && <CornerDots />}
    </header>
  );
}
