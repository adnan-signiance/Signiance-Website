/**
 * The hero's picture: an isometric stack of the four layers a production AI system is made of, drawn
 * in code from the brand blue ramp. Nothing in it is a photograph or a stock illustration, and every
 * face is a flat step of the ramp (top lightest, right-hand face darkest), so it reads as one
 * object rather than a pile of shapes.
 *
 * The geometry is true isometric: x runs down and to the right, y down and to the left, z up. The
 * drawing is decorative (the headline and the text beside it carry the message), so it is marked
 * as an image with a one-line description and is not focusable. On a pointer device a layer lifts
 * when it is hovered; a pulse of data travels up the stack on a loop. Both stop under
 * prefers-reduced-motion (see home-hero.css).
 */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const OX = 290;
const OY = 350;

/** World (x right-down, y left-down, z up) to screen. */
const pt = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * COS, OY + (x + y) * SIN - z];
const join = (points: [number, number, number][]) => points.map(([x, y, z]) => pt(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");
const fill = (step: number) => ({ fill: `var(--blue-${step})` });

/** top, left-front, right-front steps of the ramp. */
type Shade = [number, number, number];

function Box({ x, y, z, w, d, h, shade }: { x: number; y: number; z: number; w: number; d: number; h: number; shade: Shade }) {
  const top = join([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]);
  const right = join([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]);
  const left = join([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]);
  return (
    <g>
      <polygon points={left} style={fill(shade[1])} />
      <polygon points={right} style={fill(shade[2])} />
      <polygon points={top} style={fill(shade[0])} />
    </g>
  );
}

/** A slab centred on the origin. */
function Slab({ z, size, h, shade }: { z: number; size: number; h: number; shade: Shade }) {
  return <Box x={-size / 2} y={-size / 2} z={z} w={size} d={size} h={h} shade={shade} />;
}

/** A line between two world points, for the flow paths. */
function Path({ from, to, z, className }: { from: [number, number]; to: [number, number]; z: number; className?: string }) {
  const [x1, y1] = pt(from[0], from[1], z);
  const [x2, y2] = pt(to[0], to[1], z);
  return <line className={className} x1={x1} y1={y1} x2={x2} y2={y2} />;
}

type Layer = { name: string; z: number; h: number; size: number; shade: Shade };

// Bottom to top. Each is a step up the ramp: the foundation is the deepest, the checks the lightest.
const LAYERS: Layer[] = [
  { name: "Cloud foundation", z: 0, h: 28, size: 300, shade: [700, 800, 900] },
  { name: "Data & retrieval", z: 84, h: 22, size: 250, shade: [500, 600, 700] },
  { name: "Agents & tools", z: 160, h: 20, size: 200, shade: [400, 500, 600] },
  { name: "Evals & guardrails", z: 232, h: 16, size: 150, shade: [100, 200, 300] },
];

const LABEL_X = 590;

export default function HeroArt() {
  const floor = join([[-190, -190, -4], [190, -190, -4], [190, 190, -4], [-190, 190, -4]]);
  const grid: [number, number][][] = [];
  for (const g of [-126, -63, 0, 63, 126]) {
    grid.push([[g, -190], [g, 190]]);
    grid.push([[-190, g], [190, g]]);
  }

  return (
    <figure className="hero-iso">
      <svg
        viewBox="0 0 860 540"
        role="img"
        aria-label="Four layers of a production AI system stacked as an isometric diagram: cloud foundation, data and retrieval, agents and tools, and evals and guardrails on top."
      >
        {/* The floor: a flat tint with its own grid, and a darker plate under the stack. */}
        <polygon points={floor} style={fill(50)} />
        {grid.map(([a, b], i) => {
          const [x1, y1] = pt(a[0], a[1], -4);
          const [x2, y2] = pt(b[0], b[1], -4);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="ha-grid" />;
        })}
        <polygon points={join([[-170, -170, -3], [170, -170, -3], [170, 170, -3], [-170, 170, -3]])} style={fill(100)} />

        {/* Layer 1: the foundation, with a raised plate and a row of racks along its two front rims. */}
        <g className="ha-layer" data-i="0">
          <Slab z={LAYERS[0].z} size={LAYERS[0].size} h={LAYERS[0].h} shade={LAYERS[0].shade} />
          {[-110, -62, -14, 34, 82].map((v) => (
            <Box key={`x${v}`} x={128} y={v} z={28} w={14} d={36} h={12} shade={[300, 400, 500]} />
          ))}
          {[-110, -62, -14, 34].map((v) => (
            <Box key={`y${v}`} x={v} y={128} z={28} w={36} d={14} h={12} shade={[300, 400, 500]} />
          ))}
        </g>

        {/* Connectors between layers, each with a packet climbing it. */}
        {[
          { x: 100, y: 100, from: 32, to: 84, delay: "0s" },
          { x: 82, y: 82, from: 106, to: 160, delay: "0.5s" },
          { x: 64, y: 64, from: 180, to: 232, delay: "1s" },
        ].map((c) => {
          const [x1, y1] = pt(c.x, c.y, c.from);
          const [x2, y2] = pt(c.x, c.y, c.to);
          return (
            <g key={c.from}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} className="ha-rod" />
              <circle cx={x1} cy={y1} r="3.2" className="ha-packet" style={{ animationDelay: c.delay, ["--rise" as string]: `${y1 - y2}px` }} />
            </g>
          );
        })}

        {/* Layer 2: data. Stacks of tables along the two front rims. */}
        <g className="ha-layer" data-i="1">
          <Slab z={LAYERS[1].z} size={LAYERS[1].size} h={LAYERS[1].h} shade={LAYERS[1].shade} />
          {[-84, -34, 16, 66].map((v) =>
            [0, 1, 2].map((k) => (
              <Box key={`x${v}${k}`} x={104} y={v} z={106 + k * 9} w={18} d={30} h={6} shade={[100, 200, 300]} />
            ))
          )}
          {[-84, -34, 16].map((v) =>
            [0, 1].map((k) => (
              <Box key={`y${v}${k}`} x={v} y={104} z={106 + k * 9} w={30} d={18} h={6} shade={[100, 200, 300]} />
            ))
          )}
        </g>

        {/* Layer 3: agents. Four nodes on the rim, joined by a dashed route that runs. */}
        <g className="ha-layer" data-i="2">
          <Slab z={LAYERS[2].z} size={LAYERS[2].size} h={LAYERS[2].h} shade={LAYERS[2].shade} />
          <Path from={[86, -62]} to={[86, 14]} z={181} className="ha-flow" />
          <Path from={[86, 14]} to={[34, 86]} z={181} className="ha-flow" />
          <Path from={[34, 86]} to={[-50, 86]} z={181} className="ha-flow" />
          {[
            [86, -62],
            [86, 14],
            [34, 86],
            [-50, 86],
          ].map(([cx, cy]) => (
            <Box key={`${cx}${cy}`} x={cx - 10} y={cy - 10} z={180} w={20} d={20} h={18} shade={[50, 100, 200]} />
          ))}
        </g>

        {/* Layer 4: the checks. A shield with a tick, and a row of passing results. */}
        <g className="ha-layer" data-i="3">
          <Slab z={LAYERS[3].z} size={LAYERS[3].size} h={LAYERS[3].h} shade={LAYERS[3].shade} />
          <g transform={`translate(${OX} ${OY - 248}) matrix(${COS} ${SIN} ${-COS} ${SIN} 0 0)`}>
            <path d="M0-34 26-23V8C26 24 12 33 0 39-12 33-26 24-26 8V-23Z" style={fill(500)} />
            <path d="M-11 3 -3 11 13-9" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {[-52, -34, 34, 52].map((v) => (
              <rect key={v} x={v - 6} y={-48} width="12" height="6" rx="3" style={fill(400)} />
            ))}
          </g>
        </g>

        {/* Two pieces floating beside the stack. */}
        <g className="ha-float" style={{ animationDelay: "0s" }}>
          <Box x={-132} y={92} z={196} w={30} d={30} h={30} shade={[200, 300, 400]} />
        </g>
        <g className="ha-float" style={{ animationDelay: "1.4s" }}>
          <Box x={-166} y={26} z={92} w={22} d={22} h={22} shade={[100, 200, 300]} />
        </g>

        {/* Names. A leader from each layer's right-hand corner to a tag in a column. */}
        {LAYERS.map((l, i) => {
          const [vx, vy] = pt(l.size / 2, -l.size / 2, l.z + l.h / 2);
          return (
            <g key={l.name} className="ha-label" data-i={i}>
              <line x1={vx + 8} y1={vy} x2={LABEL_X - 8} y2={vy} className="ha-leader" />
              <circle cx={vx + 8} cy={vy} r="2.6" style={fill(500)} />
              <rect x={LABEL_X} y={vy - 22} width={Math.round(36 + l.name.length * 10.4)} height="44" rx="22" className="ha-tag" />
              <text x={LABEL_X + 18} y={vy + 7} className="ha-text">
                {l.name}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
