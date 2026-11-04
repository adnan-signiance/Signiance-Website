import Image from "next/image";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import HeroHeading from "./HeroHeading";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
import { services } from "@/lib/data";

export default function ServicesHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(48px, 6.4vw, 70px) var(--pad-x) clamp(40px, 5vw, 54px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="hero-split">
        <div>
          <SectionEyebrow rise={0}>Services</SectionEyebrow>
          <HeroHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h1)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tight)",
              margin: "16px 0 0",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            Five practices, one goal: AI that runs in production
          </HeroHeading>
          <p className="hero-rise hero-d1" style={{ maxWidth: 600, margin: "16px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-text)" }}>
            Agents, RAG, MVPs, copilots and the cloud foundation underneath them. Every engagement is scoped in a
            week, built by the people you meet on the first call, and shipped with everything it needs to survive
            real users.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 26,
              fontSize: "var(--fs-xs)",
              fontWeight: 500,
              color: "var(--color-ink)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="var(--color-accent)" strokeWidth="1.2" />
                <path d="M4.5 7.2 6.3 9l3.2-4" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Fixed-fee scoping, credited to the build
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="var(--color-accent)" strokeWidth="1.2" />
                <circle cx="7" cy="7" r="1.8" fill="var(--color-accent)" />
              </svg>
              Production-ready, not demo-ready
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 30, flexWrap: "wrap" }}>
            {services.map((sv) => {
              const accent = serviceColor[sv.id];
              return (
                <a
                  key={sv.id}
                  href={`#${sv.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: "var(--fs-xs)",
                    fontWeight: 500,
                    color: "var(--color-text)",
                    background: "var(--color-white)",
                    border: "1px solid var(--color-line-strong)",
                    borderRadius: 999,
                    padding: "6px 14px 6px 8px",
                    whiteSpace: "nowrap",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: `${accent}17`,
                      flex: "0 0 auto",
                    }}
                  >
                    <PracticeIcon name={serviceIcon[sv.id]} color={accent} size={11} />
                  </span>
                  {sv.short}
                </a>
              );
            })}
          </div>
        </div>
        <div className="hero-art hero-rise hero-d2">
          <Image src="/media/svc-practices.webp" alt="" fill priority sizes="320px" style={{ objectFit: "cover" }} />
        </div>
      </div>
      <CornerDots />
    </section>
  );
}
