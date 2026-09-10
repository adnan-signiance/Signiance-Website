"use client";

import { useEffect, useState } from "react";
import { brand, services, models } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        padding: scrolled ? "10px 0" : "0",
        transition: "padding .28s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 19,
                height: 19,
                borderRadius: 5,
                background: "#131417",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 1,
                  background: "#193DAA",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', Geist, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "-0.02em",
              }}
            >
              {brand}
            </span>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              fontSize: 13,
              color: "#55585C",
            }}
          >
            <span className="nav-drop-wrap">
              <a href="#services" className="nav-link">
                <span className="nav-link-inner">
                  <span style={{ display: "block", height: 19, lineHeight: "19px" }}>
                    Services
                  </span>
                  <span
                    style={{
                      display: "block",
                      height: 19,
                      lineHeight: "19px",
                      color: "#193DAA",
                    }}
                  >
                    Services
                  </span>
                </span>
              </a>
              <svg
                className="nav-chevron"
                width="9"
                height="9"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 3.5 5 6.5 8 3.5"
                  stroke="#8B8E86"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className="nav-drop"
                style={{
                  position: "absolute",
                  top: 32,
                  left: -14,
                  minWidth: 250,
                  background: "#FFFFFF",
                  border: "1px solid #E2E0DA",
                  borderRadius: 6,
                  padding: 4,
                  zIndex: 50,
                }}
              >
                {services.map((sv) => (
                  <a
                    key={sv.no}
                    href="#services"
                    className="nav-drop-item"
                  >
                    {sv.title}
                  </a>
                ))}
              </div>
            </span>

            <span className="nav-drop-wrap">
              <a href="#engage" className="nav-link">
                <span className="nav-link-inner">
                  <span style={{ display: "block", height: 19, lineHeight: "19px" }}>
                    Engagements
                  </span>
                  <span
                    style={{
                      display: "block",
                      height: 19,
                      lineHeight: "19px",
                      color: "#193DAA",
                    }}
                  >
                    Engagements
                  </span>
                </span>
              </a>
              <svg
                className="nav-chevron"
                width="9"
                height="9"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 3.5 5 6.5 8 3.5"
                  stroke="#8B8E86"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className="nav-drop"
                style={{
                  position: "absolute",
                  top: 32,
                  left: -14,
                  minWidth: 220,
                  background: "#FFFFFF",
                  border: "1px solid #E2E0DA",
                  borderRadius: 6,
                  padding: 4,
                  zIndex: 50,
                }}
              >
                {models.map((m) => (
                  <a key={m.name} href="#engage" className="nav-drop-item">
                    {m.name}
                  </a>
                ))}
              </div>
            </span>

            <a href="#proof" className="nav-link">
              <span className="nav-link-inner">
                <span style={{ display: "block", height: 19, lineHeight: "19px" }}>
                  Proof
                </span>
                <span
                  style={{
                    display: "block",
                    height: 19,
                    lineHeight: "19px",
                    color: "#193DAA",
                  }}
                >
                  Proof
                </span>
              </span>
            </a>

            <a
              href="#work"
              className="nav-link"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="nav-link-inner">
                <span style={{ display: "block", height: 19, lineHeight: "19px" }}>
                  How we work
                </span>
                <span
                  style={{
                    display: "block",
                    height: 19,
                    lineHeight: "19px",
                    color: "#193DAA",
                  }}
                >
                  How we work
                </span>
              </span>
            </a>
          </nav>
        </div>

        <a href="#contact" className="btn-primary">
          Book a scoping call
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
              stroke="#EEF2FB"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
