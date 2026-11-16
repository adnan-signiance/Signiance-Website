"use client";

import "../app/home-artefacts.css";
import { useState } from "react";

/**
 * What lands in each week of the method, drawn as the working screen it lands in: the baseline
 * document, an eval run with a rollout control, the production dashboard, the handover. Each is
 * a small example fragment and says so in its title bar. Flat, fixed ink, on the brand blue ramp,
 * so they sit on every chapter's field. The two controls (the traffic slider and the on-call
 * switch) work, which is the point of drawing them as screens and not as pictures.
 */

function Win({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="art mm" data-ui>
      <div className="art-bar">
        <span className="art-title">
          <span className="art-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {title}
        </span>
        <span className="art-tag">Example</span>
      </div>
      <div className="art-body">{children}</div>
    </div>
  );
}

/** Week 1: the baseline and the target, as the signed-off document. */
function Baseline() {
  const rows = [
    { name: "Handling time", today: "11 min", target: "4 min", now: 100, goal: 36 },
    { name: "Solved first time", today: "62%", target: "85%", now: 62, goal: 85 },
    { name: "Cost per ticket", today: "$4.20", target: "$1.10", now: 100, goal: 26 },
  ];
  return (
    <Win title="Refund triage: baseline">
      <div className="mm-meta">
        <span>
          Workflow <b>Refund triage</b>
        </span>
        <span>
          Owner <b>Support operations</b>
        </span>
        <span className="ga-chip is-ok">Signed off</span>
      </div>
      <ul className="mm-gaps">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="mm-gap-head">
              <span>{r.name}</span>
              <span>
                {r.today} <i aria-hidden="true">to</i> <b>{r.target}</b>
              </span>
            </div>
            <div className="mm-gap-track">
              <i className="is-now" style={{ width: `${r.now}%` }} />
              <i className="is-goal" style={{ left: `${r.goal}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="ga-foot">
        <span>One workflow, a fixed fee, credited to the build</span>
        <span className="ga-btn">Approve scope</span>
      </div>
    </Win>
  );
}

/** Week 2: an eval run, and the rollout control that keeps it behind a flag. */
function Slice() {
  const [share, setShare] = useState(10);
  const cases = [
    { name: "Duplicate charge", ok: true },
    { name: "Refund outside window", ok: true },
    { name: "Partial refund", ok: true },
    { name: "Missing order number", ok: false },
    { name: "Angry customer, no details", ok: true },
  ];
  // The ring: 91% of a 2πr circumference.
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <Win title="Refund assistant: eval run 14">
      <div className="mm-run">
        <svg viewBox="0 0 64 64" className="mm-ring" role="img" aria-label="91 percent of cases pass">
          <circle cx="32" cy="32" r={r} className="mm-ring-bg" />
          <circle cx="32" cy="32" r={r} className="mm-ring-fg" strokeDasharray={`${c * 0.91} ${c}`} transform="rotate(-90 32 32)" />
          <text x="32" y="37" textAnchor="middle" className="mm-ring-text">
            91%
          </text>
        </svg>
        <ul className="mm-cases">
          {cases.map((cs) => (
            <li key={cs.name}>
              <span>{cs.name}</span>
              <span className={`ga-chip ${cs.ok ? "is-ok" : "is-bad"}`}>{cs.ok ? "Pass" : "Fail"}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mm-flag">
        <label htmlFor="mm-share">
          <span>
            Flag <b>refund-assistant</b>
          </span>
          <b>{share}% of traffic</b>
        </label>
        <input
          id="mm-share"
          type="range"
          min={0}
          max={100}
          step={5}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          style={{ ["--p" as string]: `${share}%` }}
          aria-label="Share of traffic on the new version"
        />
      </div>
      <div className="ga-foot">
        <span>Real data. Your reviewers approve each answer.</span>
        <span className="ga-chip">12 approved, 3 waiting</span>
      </div>
    </Win>
  );
}

/** Week 3: live traffic, with the three numbers that are alerted on. */
function Live() {
  const line = "0,62 24,56 48,60 72,44 96,48 120,32 144,38 168,22 192,26 216,12 240,18";
  return (
    <Win title="Refund assistant: production">
      <ul className="mm-kpis">
        <li>
          <span>Eval pass rate</span>
          <b>96.4%</b>
        </li>
        <li>
          <span>p95 latency</span>
          <b>1.8 s</b>
        </li>
        <li>
          <span>Cost per request</span>
          <b>$0.012</b>
        </li>
      </ul>
      <svg className="mm-spark" viewBox="0 0 240 72" preserveAspectRatio="none" role="img" aria-label="Requests per hour over the last day">
        <polyline points={`${line} 240,72 0,72`} className="mm-area" />
        <polyline points={line} className="mm-line" />
      </svg>
      <ul className="mm-alerts">
        <li>
          <span>Alert if eval pass rate drops under 90%</span>
          <span className="ga-chip">On</span>
        </li>
        <li>
          <span>Alert if cost per request passes $0.02</span>
          <span className="ga-chip">On</span>
        </li>
        <li>
          <span>Alert on an unsafe answer</span>
          <span className="ga-chip">On</span>
        </li>
      </ul>
    </Win>
  );
}

/** After launch: what you take, and who is on call. */
function Handover() {
  const [owner, setOwner] = useState<"you" | "us">("you");
  return (
    <Win title="Handover: refund assistant">
      <ul className="mm-checks">
        <li>Code and infrastructure in your repository</li>
        <li>Runbook for the team that owns it</li>
        <li>Eval suite and dashboards</li>
      </ul>
      <div className="mm-oncall">
        <span>On call</span>
        <div className="mm-seg" role="group" aria-label="Who is on call">
          <button type="button" aria-pressed={owner === "you"} onClick={() => setOwner("you")}>
            You
          </button>
          <button type="button" aria-pressed={owner === "us"} onClick={() => setOwner("us")}>
            Us
          </button>
        </div>
      </div>
      <div className="ga-foot">
        <span>{owner === "you" ? "Your team runs it. We stay available." : "We monitor, tune and take the pager."}</span>
        <span className="ga-chip">Switch anytime</span>
      </div>
    </Win>
  );
}

const MOCKS = [Baseline, Slice, Live, Handover];

export default function MethodMock({ index }: { index: number }) {
  const Component = MOCKS[index];
  return Component ? <Component /> : null;
}
