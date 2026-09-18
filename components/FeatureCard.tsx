import PracticeIcon, { type IconName } from "./PracticeIcon";

export default function FeatureCard({
  icon,
  title,
  body,
  color = "#193DAA",
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
        <h4
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 16.5,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "#131417",
          }}
        >
          {title}
        </h4>
        <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "#43464A" }}>{body}</p>
      </div>
    </div>
  );
}
