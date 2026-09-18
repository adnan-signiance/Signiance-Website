import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: "0 14px" }}>
      <div
        className="page-frame"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
