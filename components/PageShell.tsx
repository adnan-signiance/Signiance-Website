import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RouteMemory from "./RouteMemory";

/**
 * `openTop` leaves the navigation and the first section outside the line pattern: the frame's
 * rails, section lines and corner marks start further down the page, where the page itself
 * wraps what follows in <FrameRails>. The footer takes the rails again so they run to the end.
 */
export default function PageShell({ children, openTop = false }: { children: ReactNode; openTop?: boolean }) {
  return (
    <div style={{ padding: "0 14px" }}>
      {/* First focusable element on every page, so keyboard users can bypass
          the header's dropdowns, four links and CTA. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div
        className={openTop ? "page-frame page-frame--open" : "page-frame"}
        style={{
          maxWidth: "var(--frame-w)",
          margin: "0 auto",
        }}
      >
        <Header plain={openTop} />
        {/* tabIndex={-1} makes the landmark a valid target for the skip link
            without adding it to the tab order. */}
        <main id="main-content" tabIndex={-1}>
          <RouteMemory>{children}</RouteMemory>
        </main>
        {openTop ? (
          <div className="frame-rails">
            <Footer />
          </div>
        ) : (
          <Footer />
        )}
      </div>
    </div>
  );
}
