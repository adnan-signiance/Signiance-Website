import "../app/home-artefacts.css";

/**
 * The five failures on the home page's "gap" section, each drawn as the working screen where the
 * failure shows up: an accuracy report, a prompt diff, a request log, a cost chart, a security
 * questionnaire. They are small example fragments and say so in their title bar. Flat, on the brand
 * blue ramp, with fixed ink so they read the same on any field.
 */

function Art({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="art" data-ui>
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

function RealData() {
  return (
    <Art title="Accuracy: test set against live traffic">
      <div className="ga-bars">
        <div className="ga-bar-row">
          <span>Test set</span>
          <div className="ga-track">
            <i className="is-hi" style={{ width: "97%" }} />
          </div>
          <b>97%</b>
        </div>
        <div className="ga-bar-row">
          <span>Live traffic</span>
          <div className="ga-track">
            <i className="is-lo" style={{ width: "61%" }} />
          </div>
          <b>61%</b>
        </div>
      </div>
      <p className="ga-cap">Inputs that failed this week</p>
      <ul className="ga-rows">
        <li>
          <span>&ldquo;refund pls!!! charged twice on order 4412&rdquo;</span>
          <span className="ga-chip is-bad">Wrong intent</span>
        </li>
        <li>
          <span>&ldquo;can i get my money back for the blue one&rdquo;</span>
          <span className="ga-chip is-bad">Wrong intent</span>
        </li>
        <li>
          <span>&ldquo;Refund request, order 5120&rdquo;</span>
          <span className="ga-chip is-ok">Correct</span>
        </li>
      </ul>
    </Art>
  );
}

function Gamble() {
  return (
    <Art title="Prompt change: refund-assistant">
      <pre className="ga-diff">
        <code>
          <span className="ga-del">- Answer briefly.</span>
          <span className="ga-add">+ Answer warmly and always cite the refund policy.</span>
          <span className="ga-ctx">  Never promise a refund you cannot issue.</span>
        </code>
      </pre>
      <div className="ga-eval">
        <div>
          <span>Helpfulness</span>
          <b>?</b>
        </div>
        <div>
          <span>Policy errors</span>
          <b>?</b>
        </div>
        <div>
          <span>Cost per ticket</span>
          <b>?</b>
        </div>
      </div>
      <div className="ga-foot">
        <span>No evals attached to this change</span>
        <span className="ga-btn">Deploy to 100%</span>
      </div>
    </Art>
  );
}

function Invisible() {
  return (
    <Art title="Request log: refund-assistant">
      <ul className="ga-log">
        <li>
          <time>14:02:11</time>
          <span className="ga-chip is-ok">200 OK</span>
          <span>1.4 s</span>
          <span>Your order ships Thursday.</span>
        </li>
        <li>
          <time>14:02:38</time>
          <span className="ga-chip is-ok">200 OK</span>
          <span>1.9 s</span>
          <span>Refund policy is 30 days.</span>
        </li>
        <li className="is-flag">
          <time>14:03:02</time>
          <span className="ga-chip is-ok">200 OK</span>
          <span>1.6 s</span>
          <span>Your refund was issued on 3 Nov.</span>
        </li>
      </ul>
      <div className="ga-foot">
        <span>The refund in row three does not exist.</span>
        <span className="ga-chip">0 alerts fired</span>
      </div>
    </Art>
  );
}

function Bill() {
  // Requests drift up; spend runs away from them.
  const requests = "0,98 50,94 100,91 150,86 200,82 250,78 300,74";
  const spend = "0,100 50,96 100,88 150,72 200,52 250,30 300,8";
  return (
    <Art title="Inference spend, six months">
      <svg className="ga-chart" viewBox="0 0 300 120" role="img" aria-label="Spend rising far faster than requests over six months">
        {[20, 50, 80].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} className="ga-gridline" />
        ))}
        <polyline points={requests} className="ga-line is-soft" />
        <polyline points={spend} className="ga-line is-hi" />
        <circle cx="300" cy="8" r="4" className="ga-dot" />
      </svg>
      <div className="ga-axis">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="ga-legend">
        <span>
          <i className="is-soft" /> Requests <b>+18%</b>
        </span>
        <span>
          <i className="is-hi" /> Spend <b>+212%</b>
        </span>
        <span>Owner: none</span>
      </div>
    </Art>
  );
}

function Security() {
  return (
    <Art title="Security questionnaire, enterprise customer">
      <p className="ga-cap">2 of 4 answered</p>
      <ul className="ga-rows">
        <li>
          <span>Where is customer data stored, and for how long?</span>
          <span className="ga-chip is-ok">Answered</span>
        </li>
        <li>
          <span>Is customer data used to train a model?</span>
          <span className="ga-chip is-bad">No answer</span>
        </li>
        <li>
          <span>Is every model action logged and reviewable?</span>
          <span className="ga-chip is-bad">No answer</span>
        </li>
        <li>
          <span>List your sub-processors.</span>
          <span className="ga-chip is-ok">Answered</span>
        </li>
      </ul>
      <div className="ga-foot">
        <span>Deal paused pending review</span>
        <span className="ga-btn">Reply</span>
      </div>
    </Art>
  );
}

export const GAP_ARTEFACTS = [RealData, Gamble, Invisible, Bill, Security];
