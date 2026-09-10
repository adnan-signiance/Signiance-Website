"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

const COUNT = testimonials.length;

function Avatar({
  initials,
  name,
  role,
  size,
  muted,
}: {
  initials: string;
  name: string;
  role: string;
  size: number;
  muted: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: muted ? 0.4 : 1,
        transform: `translateX(${muted ? -6 : 12}px)`,
      }}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: muted ? "#D6D3CB" : "#193DAA",
          display: "grid",
          placeItems: "center",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 600,
          fontSize: muted ? 12 : 16,
          color: muted ? "#55585C" : "#FFFFFF",
        }}
      >
        {initials}
      </span>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: muted ? 12 : 14,
            fontWeight: muted ? 500 : 600,
            color: muted ? "#22252A" : "#131417",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: muted ? 11 : 12,
            color: "#6A6D71",
            marginTop: 2,
            whiteSpace: "nowrap",
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [tIdx, setTIdx] = useState(0);
  const [fade, setFade] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFade(0);
      setTimeout(() => {
        setTIdx((i) => (i + 1) % COUNT);
        setFade(1);
      }, 320);
    }, 4600);
    return () => clearInterval(timerRef.current);
  }, []);

  const avTop = testimonials[(tIdx + 1) % COUNT];
  const avMid = testimonials[tIdx];
  const avBottom = testimonials[(tIdx + 2) % COUNT];

  return (
    <div style={{ position: "relative", marginTop: 30, padding: "10px 0 48px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: 54,
          alignItems: "center",
          opacity: fade,
          transition: "opacity .35s ease",
        }}
      >
        <div style={{ position: "relative", height: 210 }}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <Avatar initials={avTop.initials} name={avTop.name} role={avTop.role} size={34} muted />
            <Avatar initials={avMid.initials} name={avMid.name} role={avMid.role} size={52} muted={false} />
            <Avatar initials={avBottom.initials} name={avBottom.name} role={avBottom.role} size={34} muted />
          </div>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avMid.logo} alt={avMid.logoAlt} style={{ display: "block", height: 22, marginBottom: 20 }} />
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: 27,
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
              margin: 0,
              color: "#22252A",
              maxWidth: "48ch",
              textWrap: "pretty",
            }}
          >
            {avMid.quoteBefore}{" "}
            <span style={{ background: "#EEF2FB", color: "#131417", padding: "1px 6px", borderRadius: 3 }}>
              {avMid.quoteHighlight}
            </span>
            {avMid.quoteAfter}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 30 }}>
        {testimonials.map((t, i) => (
          <span
            key={t.name}
            style={{
              width: i === tIdx ? 22 : 8,
              height: 4,
              borderRadius: 2,
              background: i === tIdx ? "#193DAA" : "#D6D3CB",
              transition: "all .35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
