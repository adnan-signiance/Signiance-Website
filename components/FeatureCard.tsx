import PracticeIcon, { type IconName } from "./PracticeIcon";

export default function FeatureCard({
  icon,
  title,
  body,
  color = "var(--color-accent)",
}: {
  icon: IconName;
  title: string;
  body: string;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 42,
          height: 42,
          borderRadius: 11,
          background: `${color}17`,
          flex: "0 0 auto",
        }}
      >
        <PracticeIcon name={icon} color={color} size={20} />
      </span>
      <div>
        {/* h3, not h4: these cards sit directly under section h2s, so h4 skipped
            a level (WCAG 1.3.1). Size is set explicitly, so the visual is
            unchanged. */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-lead)",
            letterSpacing: "var(--tracking-snug)",
            margin: 0,
            color: "var(--color-ink)",
          }}
        >
          {title}
        </h3>
        <p style={{ margin: "8px 0 0", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "var(--color-text)" }}>{body}</p>
      </div>
    </div>
  );
}
