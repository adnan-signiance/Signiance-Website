export type IconName =
  | "layers"
  | "network"
  | "doc-search"
  | "rocket"
  | "chat"
  | "shield"
  | "check-shield"
  | "flag"
  | "bolt"
  | "target"
  | "star"
  | "compass"
  | "link";

const paths: Record<IconName, React.ReactNode> = {
  layers: (
    <>
      <path d="M12 3 21 8 12 13 3 8Z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M12 7.4 6.4 16" />
      <path d="M12 7.4 17.6 16" />
      <path d="M7.4 18h9.2" />
    </>
  ),
  "doc-search": (
    <>
      <path d="M7 3h7l4 4v6" />
      <path d="M14 3v4h4" />
      <path d="M7 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2" />
      <path d="M6 13h4" />
      <path d="M6 17h3" />
      <circle cx="15.5" cy="16.5" r="2.6" />
      <path d="M17.4 18.4 19.5 20.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.5 3.5c3 1 5 3 5.5 6-2.6.4-5.4 2-7.5 4.2L8 12.2c2.2-2.1 3.8-4.9 4.2-7.5.4-.4.9-.8 1.3-1.2Z" />
      <path d="M8 12.2 5 15.5 4 20l4.5-1 3.3-3" />
      <circle cx="15" cy="9" r="1.4" />
      <path d="M7.5 16.5C6 17 5 18.5 4.5 20" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-4 3.5V16H4Z" />
      <circle cx="9" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  shield: <path d="M12 3.5 19 6.5v5.4c0 4.4-3 7.6-7 8.6-4-1-7-4.2-7-8.6V6.5Z" />,
  "check-shield": (
    <>
      <path d="M12 3.5 19 6.5v5.4c0 4.4-3 7.6-7 8.6-4-1-7-4.2-7-8.6V6.5Z" />
      <path d="M9 12.3l2.1 2.1L15.3 10" />
    </>
  ),
  flag: (
    <>
      <path d="M6 3v18" />
      <path d="M6 4.5h11l-2.5 3.5L17 11.5H6" />
    </>
  ),
  bolt: <path d="M12.5 2 4 13.5h6.2L11.2 22l8.3-12.6h-6.2Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  star: <path d="M12 3.5 14.6 9.3 21 10.1 16.3 14.3 17.6 20.6 12 17.4 6.4 20.6 7.7 14.3 3 10.1 9.4 9.3Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 5.5-5.5 2L9.5 11 15 9Z" />
    </>
  ),
  link: (
    <>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 4.9a3.4 3.4 0 0 1 4.8 4.8L15.8 11.3" />
      <path d="M13 17.5 11.4 19.1a3.4 3.4 0 0 1-4.8-4.8L8.2 12.7" />
    </>
  ),
};

export default function PracticeIcon({
  name,
  color = "var(--color-accent)",
  size = 20,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export const serviceIcon: Record<string, IconName> = {
  s1: "layers",
  s2: "network",
  s3: "doc-search",
  s4: "rocket",
  s5: "chat",
};

// Literal hex, deliberately not tokens: these values are concatenated with a
// two-digit alpha suffix at the call sites (`${accent}17`, `${accent}55`) to make
// translucent tints and gradient scrims. `var(--x)17` is not valid CSS, so the
// raw value has to survive to the point of use. Keep in step with the
// --color-accent-* tokens in globals.css if those ever change.
export const serviceColor: Record<string, string> = {
  s1: "#152F85",
  s2: "#193DAA",
  s3: "#2C55C4",
  s4: "#4F6FDB",
  s5: "#5C81DF",
};
