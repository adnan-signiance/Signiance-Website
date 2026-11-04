/**
 * What lands each week, drawn as the document itself: the baseline sheet, the flagged rollout,
 * the live dashboard, the handover checklist. Each is a small example fragment and says so.
 * Flat white tiles with fixed ink, so they read the same on every chapter's field.
 */

function Doc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="hw-doc" data-ui>
      <div className="hw-doc-bar">
        <span className="hw-doc-title">{title}</span>
        <span className="hw-doc-tag">Example</span>
      </div>
      {children}
    </div>
  );
}

function Baseline() {
  return (
    <Doc title="Refund triage: baseline">
      <table className="hw-doc-table">
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Today</th>
            <th scope="col">Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Handling time</th>
            <td>11 min</td>
            <td className="is-target">4 min</td>
          </tr>
          <tr>
            <th scope="row">Solved first time</th>
            <td>62%</td>
            <td className="is-target">85%</td>
          </tr>
          <tr>
            <th scope="row">Cost per ticket</th>
            <td>$4.20</td>
            <td className="is-target">$1.10</td>
          </tr>
        </tbody>
      </table>
      <p className="hw-doc-note">One workflow, scoped, with the numbers it has to move.</p>
    </Doc>
  );
}

function Slice() {
  return (
    <Doc title="Refund assistant: first slice">
      <ul className="hw-doc-list">
        <li>
          <span>Feature flag</span>
          <span className="hw-doc-pill is-on">On for 10% of traffic</span>
        </li>
        <li>
          <span>Reviewer queue</span>
          <strong>3 waiting, 12 approved</strong>
        </li>
        <li>
          <span>Eval pass rate</span>
          <strong>91%</strong>
        </li>
      </ul>
      <p className="hw-doc-note">Real data, behind a flag, with your reviewers in the loop.</p>
    </Doc>
  );
}

function Live() {
  return (
    <Doc title="Refund assistant: live">
      <ul className="hw-doc-tiles">
        <li>
          <span>Eval pass rate</span>
          <strong>96.4%</strong>
        </li>
        <li>
          <span>p95 latency</span>
          <strong>1.8 s</strong>
        </li>
        <li>
          <span>Cost per request</span>
          <strong>$0.012</strong>
        </li>
      </ul>
      <p className="hw-doc-note">Alerts on an eval drop, a cost spike or an unsafe answer.</p>
    </Doc>
  );
}

function Handover() {
  return (
    <Doc title="Handover checklist">
      <ul className="hw-doc-checks">
        <li>Code and infrastructure in your repository</li>
        <li>Runbook for the team that owns it</li>
        <li>Eval suite and dashboards</li>
      </ul>
      <div className="hw-doc-row">
        <span>On call</span>
        <span className="hw-doc-seg">
          <span className="is-on">You</span>
          <span>Us</span>
        </span>
      </div>
      <p className="hw-doc-note">Take it, or let us run it. Switch anytime.</p>
    </Doc>
  );
}

const DOCS = [Baseline, Slice, Live, Handover];

export default function HowWeWorkDoc({ index }: { index: number }) {
  const Component = DOCS[index];
  return Component ? <Component /> : null;
}
