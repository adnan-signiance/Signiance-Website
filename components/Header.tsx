"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, services } from "@/lib/data";
import CornerDots from "./CornerDots";

type MenuName = "services" | "resources";

const ArrowIcon = () => (
  <svg
    className="drop-item-arrow"
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    aria-hidden="true"
  >
    <path d="M3 2.5 7 6 3 9.5" stroke="#193DAA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`nav-chevron${open ? " is-open" : ""}`}
    width="9"
    height="9"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
  >
    <path d="M2 3.5 5 6.5 8 3.5" stroke="#8B8E86" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MENU_WIDTH: Record<MenuName, number> = { services: 236, resources: 200 };

export default function Header() {
  const pathname = usePathname();
  const isServicesPage = pathname.startsWith("/services");
  const isCaseStudiesPage = pathname.startsWith("/case-studies");
  const isBlogPage = pathname.startsWith("/blog");
  const isResourcesPage = isCaseStudiesPage || isBlogPage;
  const isAboutPage = pathname.startsWith("/about");

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const servicesTriggerRef = useRef<HTMLSpanElement>(null);
  const resourcesTriggerRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Close the drawer on navigation, and whenever the viewport grows back past
  // the breakpoint — otherwise it stays mounted but hidden, and reappears the
  // next time the window narrows.
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
  }, [pathname]);

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

  const triggerRefs: Record<MenuName, React.RefObject<HTMLSpanElement | null>> = {
    services: servicesTriggerRef,
    resources: resourcesTriggerRef,
  };

  const openMenu = (name: MenuName) => {
    clearTimeout(closeTimer.current);
    const navEl = navRef.current;
    const triggerEl = triggerRefs[name].current;
    if (navEl && triggerEl) {
      const navRect = navEl.getBoundingClientRect();
      const triggerRect = triggerEl.getBoundingClientRect();
      setMenuPos({
        left: triggerRect.left - navRect.left - 14,
        top: triggerRect.bottom - navRect.top + 10,
      });
    }
    setActiveMenu(name);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 260);
  };

  const keepOpen = () => clearTimeout(closeTimer.current);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        padding: scrolled ? "10px 0" : "0",
        borderBottom: "1px solid #E2E0DA",
        transition: "padding .28s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 var(--pad-x)",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          border: "1px solid",
          borderColor: scrolled ? "#E2E0DA" : "transparent",
          borderRadius: 3,
          background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 10px 30px rgba(22,24,28,0.06)" : "none",
          transition:
            "background .28s ease, border-color .28s ease, box-shadow .28s ease, backdrop-filter .28s ease",
        }}
      >
        <div className="nav-desktop">
          <Link href="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/signiance-dark.jpg"
              alt={brand}
              style={{ display: "block", height: 32, width: "auto" }}
            />
          </Link>

          <nav
            ref={navRef}
            className="nav-desktop-links"
            style={{
              position: "relative",
              alignItems: "center",
              gap: 16,
              fontSize: 14.5,
              color: "#55585C",
            }}
          >
            <span
              ref={servicesTriggerRef}
              className={`nav-pill${activeMenu === "services" ? " is-open" : ""}`}
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={scheduleClose}
            >
              {isServicesPage ? (
                <span style={{ color: "#193DAA", fontWeight: 500 }}>Services</span>
              ) : (
                <Link href="/services" className="nav-link">
                  <span className="nav-link-inner">
                    <span style={{ display: "block", height: 19, lineHeight: "19px" }}>Services</span>
                    <span style={{ display: "block", height: 19, lineHeight: "19px", color: "#193DAA" }}>
                      Services
                    </span>
                  </span>
                </Link>
              )}
              <Chevron open={activeMenu === "services"} />
            </span>

            <span
              ref={resourcesTriggerRef}
              className={`nav-pill${activeMenu === "resources" ? " is-open" : ""}`}
              onMouseEnter={() => openMenu("resources")}
              onMouseLeave={scheduleClose}
            >
              {isResourcesPage ? (
                <span style={{ color: "#193DAA", fontWeight: 500 }}>Resources</span>
              ) : (
                <span className="nav-link">
                  <span className="nav-link-inner">
                    <span style={{ display: "block", height: 19, lineHeight: "19px" }}>Resources</span>
                    <span style={{ display: "block", height: 19, lineHeight: "19px", color: "#193DAA" }}>
                      Resources
                    </span>
                  </span>
                </span>
              )}
              <Chevron open={activeMenu === "resources"} />
            </span>

            <span className="nav-pill">
              <Link href="/#work" className="nav-link" style={{ whiteSpace: "nowrap" }}>
                <span className="nav-link-inner">
                  <span style={{ display: "block", height: 19, lineHeight: "19px" }}>How We Work</span>
                  <span style={{ display: "block", height: 19, lineHeight: "19px", color: "#193DAA" }}>
                    How We Work
                  </span>
                </span>
              </Link>
            </span>

            <span className="nav-pill">
              {isAboutPage ? (
                <span style={{ color: "#193DAA", fontWeight: 500 }}>About</span>
              ) : (
                <Link href="/about" className="nav-link">
                  <span className="nav-link-inner">
                    <span style={{ display: "block", height: 19, lineHeight: "19px" }}>About</span>
                    <span style={{ display: "block", height: 19, lineHeight: "19px", color: "#193DAA" }}>
                      About
                    </span>
                  </span>
                </Link>
              )}
            </span>

            <div
              className={`nav-drop${activeMenu ? " is-open" : ""}`}
              style={{
                top: menuPos.top,
                left: menuPos.left,
                width: MENU_WIDTH.services,
                zIndex: 50,
              }}
              onMouseEnter={keepOpen}
              onMouseLeave={scheduleClose}
            >
              {activeMenu === "services" && (
                <div key="services" className="nav-drop-content">
                  {services.map((sv) => (
                    <Link key={sv.id} href={`/services#${sv.id}`} className="nav-drop-item">
                      {sv.navLabel}
                      <ArrowIcon />
                    </Link>
                  ))}
                </div>
              )}
              {activeMenu === "resources" && (
                <div key="resources" className="nav-drop-content">
                  <Link href="/case-studies" className="nav-drop-item">
                    Case Studies
                    <ArrowIcon />
                  </Link>
                  <Link href="/blog" className="nav-drop-item">
                    Blogs
                    <ArrowIcon />
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <Link href="/#contact" className="btn-primary header-cta-desktop">
          <span className="btn-primary-arrow-in">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="btn-primary-label">Get Your Scoped Plan</span>
          <span className="btn-primary-arrow-out">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>

        <button
          type="button"
          className={`nav-toggle${mobileOpen ? " is-open" : ""}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>

      <div id="mobile-nav" className={`nav-mobile${mobileOpen ? " is-open" : ""}`}>
        <div className="nav-mobile-row">
          <Link href="/services" className="nav-mobile-link nav-mobile-row-link">
            Services
          </Link>
          <button
            type="button"
            className="nav-mobile-caret"
            aria-label={mobileServicesOpen ? "Hide services" : "Show services"}
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((v) => !v)}
          >
            <Chevron open={mobileServicesOpen} />
          </button>
        </div>
        <div className={`nav-mobile-subs${mobileServicesOpen ? " is-open" : ""}`}>
          <div className="nav-mobile-subs-inner">
            {services.map((sv) => (
              <Link key={sv.id} href={`/services#${sv.id}`} className="nav-mobile-sub">
                {sv.navLabel}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-mobile-row">
          <span className="nav-mobile-link nav-mobile-row-link">Resources</span>
          <button
            type="button"
            className="nav-mobile-caret"
            aria-label={mobileResourcesOpen ? "Hide resources" : "Show resources"}
            aria-expanded={mobileResourcesOpen}
            onClick={() => setMobileResourcesOpen((v) => !v)}
          >
            <Chevron open={mobileResourcesOpen} />
          </button>
        </div>
        <div className={`nav-mobile-subs${mobileResourcesOpen ? " is-open" : ""}`}>
          <div className="nav-mobile-subs-inner">
            <Link href="/case-studies" className="nav-mobile-sub">
              Case Studies
            </Link>
            <Link href="/blog" className="nav-mobile-sub">
              Blogs
            </Link>
          </div>
        </div>

        <Link href="/#work" className="nav-mobile-link">
          How We Work
        </Link>
        <Link href="/about" className="nav-mobile-link">
          About
        </Link>

        <Link href="/#contact" className="btn-primary nav-mobile-cta">
          <span className="btn-primary-arrow-in">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="btn-primary-label">Get Your Scoped Plan</span>
          <span className="btn-primary-arrow-out">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
              <path d="M3 2.5 7 6 3 9.5" stroke="#EEF2FB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      <CornerDots />
    </header>
  );
}
