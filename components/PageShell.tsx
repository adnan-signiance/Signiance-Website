import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RouteMemory from "./RouteMemory";

/**
 * `home` puts the page on the home page's blue palette (see palette-home.css). The
 * line pattern is the same on every page: the frame's rails, the navigation's line and the marks on
 * it, then each section's own line.
 */
export default function PageShell({ children, home = false }: { children: ReactNode; home?: boolean }) {
  return (
    <div style={{ padding: "0 14px", overflowX: "clip" }}>
      {/* First focusable element on every page, so keyboard users can bypass
          the header's dropdowns, four links and CTA. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div
        className={home ? "page-frame page-frame--home" : "page-frame"}
        style={{
          maxWidth: "var(--frame-w)",
          margin: "0 auto",
        }}
      >
        <Header />
        {/* tabIndex={-1} makes the landmark a valid target for the skip link
            without adding it to the tab order. */}
        <main id="main-content" tabIndex={-1}>
          <RouteMemory>{children}</RouteMemory>
        </main>
        <Footer />
      </div>
    </div>
  );
}
