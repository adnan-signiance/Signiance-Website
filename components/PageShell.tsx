import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: "0 14px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          borderLeft: "1px solid #E2E0DA",
          borderRight: "1px solid #E2E0DA",
        }}
      >
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
