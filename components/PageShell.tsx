import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RouteMemory from "./RouteMemory";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: "0 14px" }}>
      {/* First focusable element on every page, so keyboard users can bypass
          the header's dropdowns, four links and CTA. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div
        className="page-frame"
        style={{
          maxWidth: 1280,
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
