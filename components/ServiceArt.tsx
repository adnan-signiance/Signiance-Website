import "../app/home-artefacts.css";

/**
 * One small diagram per practice for the home page's service tiles, drawn in code on the brand
 * blue ramp: what the practice is made of, in the shape it takes. The lead practice is a wide
 * diagram on the dark tile; the others are compact ones on the light tiles. All are decorative
 * (the tile's title and sentence carry the meaning), so they are hidden from assistive technology.
 */

const f = (step: number) => ({ fill: `var(--blue-${step})` });
const s = (step: number) => ({ stroke: `var(--blue-${step})` });

/** Agentic AI: plan, act, ask a person, and log everything. */
function Agentic() {
  const nodes = [
    { x: 8, name: "Plan", sub: "3 steps" },
    { x: 140, name: "Tool call", sub: "refunds.api" },
    { x: 272, name: "Approval", sub: "over $200", hot: true },
    { x: 404, name: "Audit log", sub: "every action" },
  ];
  return (
    <svg viewBox="0 0 520 200" className="sv-svg sv-agentic" aria-hidden="true">
      {/* The route between the steps. */}
      {[112, 244, 376].map((x) => (
        <line key={x} x1={x} y1={100} x2={x + 28} y2={100} className="sv-flow" />
      ))}
      {nodes.map((n) => (
        <g key={n.name} className={n.hot ? "sv-node is-hot" : "sv-node"}>
          <rect x={n.x} y={66} width="104" height="68" rx="12" />
          <circle cx={n.x + 22} cy={88} r="7" className="sv-node-dot" />
          <text x={n.x + 14} y={114} className="sv-node-name">
            {n.name}
          </text>
          <text x={n.x + 14} y={128} className="sv-node-sub">
            {n.sub}
          </text>
        </g>
      ))}
      {/* A person is asked at the third step. */}
      <g className="sv-ask">
        <rect x="262" y="22" width="124" height="28" rx="14" style={f(500)} />
        <circle cx="280" cy="36" r="6" style={f(100)} />
        <text x="294" y="40.5" className="sv-ask-text">
          Needs a person
        </text>
        <line x1="324" y1="50" x2="324" y2="66" style={s(500)} strokeWidth="1.5" strokeDasharray="3 3" />
      </g>
      {/* The log tail. */}
      {[0, 1, 2].map((k) => (
        <g key={k} className="sv-log">
          <rect x={8} y={152 + k * 14} width="44" height="6" rx="3" style={f(600)} />
          <rect x={60} y={152 + k * 14} width={188 - k * 38} height="6" rx="3" style={f(700)} />
        </g>
      ))}
    </svg>
  );
}

/** Gen AI and RAG: your documents, a search over them, an answer that cites its sources. */
function Rag() {
  return (
    <svg viewBox="0 0 160 96" className="sv-svg" aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={6 + k * 5} y={14 + k * 5} width="34" height="44" rx="5" style={f(k === 2 ? 50 : 100)} className="sv-card" />
          <rect x={12 + k * 5} y={24 + k * 5} width="20" height="3" rx="1.5" style={f(300)} />
          <rect x={12 + k * 5} y={31 + k * 5} width="14" height="3" rx="1.5" style={f(200)} />
        </g>
      ))}
      <line x1="48" y1="40" x2="62" y2="40" className="sv-flow is-light" />
      {[
        [70, 22], [82, 30], [94, 24], [76, 44], [90, 48], [100, 38], [80, 58], [96, 62],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 3 || i === 4 || i === 5 ? 4.2 : 3} style={f(i === 3 || i === 4 || i === 5 ? 500 : 200)} />
      ))}
      <line x1="108" y1="40" x2="116" y2="40" className="sv-flow is-light" />
      <rect x="118" y="20" width="38" height="44" rx="6" style={f(500)} />
      <rect x="123" y="28" width="26" height="3" rx="1.5" style={f(100)} />
      <rect x="123" y="35" width="20" height="3" rx="1.5" style={f(200)} />
      <rect x="123" y="48" width="9" height="9" rx="3" style={f(100)} />
      <rect x="135" y="48" width="9" height="9" rx="3" style={f(200)} />
    </svg>
  );
}

/** AI POC and MVP: three weeks, each a bigger step than the last, ending in a flag. */
function Poc() {
  return (
    <svg viewBox="0 0 160 96" className="sv-svg" aria-hidden="true">
      <line x1="6" y1="84" x2="154" y2="84" style={s(200)} strokeWidth="1.5" />
      <rect x="14" y="62" width="36" height="22" rx="4" style={f(200)} />
      <rect x="62" y="44" width="36" height="40" rx="4" style={f(300)} />
      <rect x="110" y="22" width="36" height="62" rx="4" style={f(500)} />
      <polyline points="32,56 80,38 128,16" fill="none" style={s(500)} strokeWidth="1.5" strokeDasharray="3 4" className="sv-flow is-light" />
      <line x1="128" y1="22" x2="128" y2="6" style={s(700)} strokeWidth="1.5" />
      <path d="M128 6h14l-4 5 4 5h-14Z" style={f(700)} />
    </svg>
  );
}

/** Copilots: a question from a user, an answer inside the product. */
function Copilot() {
  return (
    <svg viewBox="0 0 160 96" className="sv-svg" aria-hidden="true">
      <rect x="6" y="8" width="92" height="30" rx="10" style={f(100)} />
      <rect x="15" y="17" width="56" height="4" rx="2" style={f(300)} />
      <rect x="15" y="25" width="38" height="4" rx="2" style={f(200)} />
      <rect x="54" y="46" width="100" height="40" rx="10" style={f(500)} />
      <rect x="63" y="55" width="62" height="4" rx="2" style={f(100)} />
      <rect x="63" y="63" width="48" height="4" rx="2" style={f(200)} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={65 + k * 9} cy={77} r="2.4" style={f(100)} className="sv-typing" />
      ))}
      <circle cx="141" cy="20" r="8" style={f(300)} />
    </svg>
  );
}

/** Cloud and DevOps: a pipeline, and the bill coming down. */
function Cloud() {
  return (
    <svg viewBox="0 0 160 96" className="sv-svg" aria-hidden="true">
      {[8, 60, 112].map((x, i) => (
        <g key={x}>
          <rect x={x} y="8" width="40" height="24" rx="6" style={f(i === 2 ? 500 : 200)} />
          <rect x={x + 8} y="18" width="24" height="4" rx="2" style={f(i === 2 ? 100 : 500)} />
        </g>
      ))}
      <line x1="48" y1="20" x2="60" y2="20" className="sv-flow is-light" />
      <line x1="100" y1="20" x2="112" y2="20" className="sv-flow is-light" />
      <polyline points="8,86 8,52 32,56 56,50 80,62 104,66 128,72 152,76 152,86" style={f(100)} />
      <polyline points="8,52 32,56 56,50 80,62 104,66 128,72 152,76" fill="none" style={s(500)} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="152" cy="76" r="3.6" style={f(500)} />
    </svg>
  );
}

const ART: Record<string, () => React.ReactElement> = {
  "agentic-ai-development": Agentic,
  "gen-ai-rag-solutions": Rag,
  "ai-poc-mvp-development": Poc,
  "copilots-conversational-ai": Copilot,
  "cloud-architecture-devops": Cloud,
};

export default function ServiceArt({ slug }: { slug: string }) {
  const Art = ART[slug];
  return Art ? (
    <span className="sv-art" aria-hidden="true">
      <Art />
    </span>
  ) : null;
}
