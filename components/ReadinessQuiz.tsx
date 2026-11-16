"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import "../app/readiness.css";
import CtaArrow from "./CtaArrow";
import { contactEmail } from "@/lib/data";
import { track } from "@/lib/analytics";
import { submitEnquiry } from "@/lib/contactDelivery";
import { MAX_PER_PILLAR, QUESTIONS, QUESTION_COUNT, PILLARS, scoreAnswers, summarise } from "@/lib/readiness";

type Answers = (number | null)[];
type SendStatus = "idle" | "sending" | "sent" | "error";

const STORE = "signiance-readiness-v1";
const blank = (): Answers => QUESTIONS.map(() => null);

type Saved = { answers: Answers; step: number; done: boolean };
const EMPTY: Saved = { answers: blank(), step: 0, done: false };

/**
 * Where the answers live: in memory, and in this tab's session storage so a reload, or a trip to the
 * booking section and back, does not lose them. A store read with `useSyncExternalStore`, not state set
 * in an effect, so the server's markup and the first client render agree (both show the first question)
 * and the saved answers arrive straight after. If storage is off the memory copy still works.
 */
let current: string | null | undefined; // undefined until first read
const listeners = new Set<() => void>();

function readStore(): string | null {
  if (current === undefined) {
    try {
      current = window.sessionStorage.getItem(STORE);
    } catch {
      current = null;
    }
  }
  return current;
}

function writeStore(next: Saved | null) {
  current = next ? JSON.stringify(next) : null;
  try {
    if (current === null) window.sessionStorage.removeItem(STORE);
    else window.sessionStorage.setItem(STORE, current);
  } catch {
    // Storage is off or full: the check still works, it just is not kept across a reload.
  }
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

/** What was saved, or nothing if it is missing or is not what this version wrote. */
function parseSaved(raw: string | null): Saved | null {
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw) as { answers?: unknown; step?: unknown; done?: unknown };
    const answers = saved.answers;
    if (!Array.isArray(answers) || answers.length !== QUESTION_COUNT) return null;
    if (!answers.every((a) => a === null || (Number.isInteger(a) && a >= 0 && a <= 3))) return null;
    const complete = answers.every((a) => a !== null);
    const step = Number.isInteger(saved.step) ? Math.min(Math.max(saved.step as number, 0), QUESTION_COUNT - 1) : 0;
    return { answers: answers as Answers, step, done: saved.done === true && complete };
  } catch {
    return null;
  }
}

/**
 * The AI production readiness check: ten questions one at a time, then a score out of 100, the five areas,
 * what to fix first and a way to send the result to the team.
 *
 * The score needs no email and nothing leaves the browser until the person chooses to send it. Choosing
 * an answer moves on to the next question, which the card says; Back changes one. Progress is kept for
 * the tab, so a reload does not lose it.
 */
export default function ReadinessQuiz() {
  const raw = useSyncExternalStore(subscribe, readStore, () => null);
  const { answers, step, done } = useMemo(() => parseSaved(raw) ?? EMPTY, [raw]);

  const [formOpen, setFormOpen] = useState(false);
  const [send, setSend] = useState<SendStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const stepId = useId();
  const questionRef = useRef<HTMLLegendElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | null>(null);
  const focusNext = useRef(false);
  const openedAt = useRef(0);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  // After a question or the result replaces the last one, move focus to it so a screen reader reads it.
  useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    (done ? resultRef.current : questionRef.current)?.focus();
  }, [step, done]);

  function choose(index: number) {
    if (timer.current !== null) return; // an answer is already on its way
    const next = answers.slice();
    next[step] = index;
    if (!answers.some((a) => a !== null)) track("readiness_started");
    writeStore({ answers: next, step, done: false });

    const last = step === QUESTION_COUNT - 1;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(
      () => {
        timer.current = null;
        focusNext.current = true;
        if (last) {
          const result = scoreAnswers(next);
          track("readiness_completed", { score: result.score, band: result.band.id });
          writeStore({ answers: next, step, done: true });
        } else {
          writeStore({ answers: next, step: step + 1, done: false });
        }
      },
      reduce ? 0 : 200
    );
  }

  function back() {
    if (step === 0 || timer.current !== null) return;
    focusNext.current = true;
    writeStore({ answers, step: step - 1, done: false });
  }

  function retake() {
    writeStore(null);
    setFormOpen(false);
    setSend("idle");
    setErrors({});
    setSendError(null);
    setShowEmail(false);
    focusNext.current = true;
  }

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSend("sending");
    setErrors({});
    setSendError(null);
    setShowEmail(false);

    const data = new FormData(event.currentTarget);
    const result = scoreAnswers(answers);
    const outcome = await submitEnquiry({
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      message: summarise(answers),
      useCase: "AI readiness check",
      intent: "general",
      source: "/readiness",
      website: data.get("website"),
      startedAt: openedAt.current,
    });

    if (outcome.ok) {
      setSend("sent");
      track("readiness_lead_sent", { score: result.score, band: result.band.id });
      return;
    }

    if (outcome.error === "validation_failed") {
      setErrors(outcome.errors);
    } else if (outcome.error === "rate_limited") {
      setSendError("Too many attempts. Try again in a few minutes.");
    } else if (outcome.error === "network") {
      setSendError("We could not reach the server. You may be offline.");
      setShowEmail(true);
    } else {
      setSendError("We could not send that from here.");
      setShowEmail(true);
    }
    track("readiness_lead_failed", { reason: outcome.error });
    setSend("error");
  }

  // ---------------------------------------------------------------- the result

  if (done) {
    const result = scoreAnswers(answers);
    const describedBy = (field: string) => (errors[field] ? `rq-${field}-error` : undefined);

    return (
      <section className="rq rq--result" aria-label="Your readiness score">
        <div className="rq-score-row">
          <p className="rq-score" aria-label={`Score: ${result.score} out of 100`}>
            <span className="rq-score-num">{result.score}</span>
            <span className="rq-score-of" aria-hidden="true">
              / 100
            </span>
          </p>
          <div>
            <h2 className="rq-band" ref={resultRef} tabIndex={-1}>
              {result.band.title}
            </h2>
            <p className="rq-band-text">{result.band.text}</p>
          </div>
        </div>

        <ul className="rq-pillars" aria-label="Score for each area">
          {result.pillars.map((p) => (
            <li key={p.id} className="rq-pillar">
              <span className="rq-pillar-name">
                {p.name}
                {p.level === "start" ? <span className="rq-flag">Fix first</span> : null}
              </span>
              <span className="rq-bar" role="img" aria-label={`${p.points} out of ${MAX_PER_PILLAR}`}>
                <i style={{ width: `${(p.points / MAX_PER_PILLAR) * 100}%` }} />
              </span>
              <span className="rq-pillar-points">
                {p.points}/{MAX_PER_PILLAR}
              </span>
            </li>
          ))}
        </ul>

        <h3 className="rq-sub">{result.fixFirst[0].level === "solid" ? "Keep this solid" : "What to fix first"}</h3>
        <ol className="rq-fixes">
          {result.fixFirst.map((f) => (
            <li key={f.id}>
              <strong>{f.name}</strong>
              <p>{f.action}</p>
            </li>
          ))}
        </ol>

        <div className="rq-next">
          <h3 className="rq-sub">Want a second pair of eyes?</h3>
          {send === "sent" ? (
            <div className="form-success" role="status">
              <p className="form-success-title">Thanks, that reached us.</p>
              <p className="form-success-body">
                We reply within a business day, usually sooner, with what we would tackle first. If it is urgent, email{" "}
                <a href={`mailto:${contactEmail}`} className="cookie-consent-link">
                  {contactEmail}
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="rq-next-text">
                Send your score and answers to our engineers and we will reply within a business day with what we would
                tackle first. Or book a call and go through it together.
              </p>
              <div className="rq-actions">
                {formOpen ? null : (
                  <button
                    type="button"
                    className="btn-hero-primary"
                    onClick={() => {
                      openedAt.current = Date.now();
                      setFormOpen(true);
                    }}
                  >
                    <CtaArrow>Send my results</CtaArrow>
                  </button>
                )}
                <Link href="/#contact" className="btn-hero-outline">
                  <CtaArrow>Book a scoping call</CtaArrow>
                </Link>
              </div>

              {formOpen ? (
                <form className="rq-form" onSubmit={handleSend} noValidate>
                  <div className="contact-form-honeypot" aria-hidden="true">
                    <label htmlFor="rq-website">Website</label>
                    <input type="text" id="rq-website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="rq-name">Name</label>
                      <input
                        id="rq-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={describedBy("name")}
                      />
                      {errors.name && (
                        <p className="contact-field-error" id="rq-name-error">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="contact-field">
                      <label htmlFor="rq-email">Work email</label>
                      <input
                        id="rq-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={describedBy("email")}
                      />
                      {errors.email && (
                        <p className="contact-field-error" id="rq-email-error">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="contact-field">
                    <label htmlFor="rq-company">
                      Company <span className="contact-field-optional">(optional)</span>
                    </label>
                    <input id="rq-company" name="company" type="text" autoComplete="organization" />
                  </div>
                  <p className="contact-field-hint">
                    We send your name, email, score and answers, and nothing else.{" "}
                    <Link href="/privacy" className="cookie-consent-link">
                      Privacy policy
                    </Link>
                    .
                  </p>
                  <div className="rq-actions">
                    <button type="submit" className="btn-hero-primary" disabled={send === "sending"}>
                      <CtaArrow>{send === "sending" ? "Sending…" : "Send to the team"}</CtaArrow>
                    </button>
                  </div>
                  <div aria-live="polite" role="status">
                    {sendError && <p className="contact-form-error">{sendError}</p>}
                    {showEmail && (
                      <p className="contact-form-error">
                        Email us directly at{" "}
                        <a href={`mailto:${contactEmail}`} className="cookie-consent-link">
                          {contactEmail}
                        </a>{" "}
                        and it will reach the same place.
                      </p>
                    )}
                  </div>
                </form>
              ) : null}
            </>
          )}
        </div>

        <p className="rq-foot-note">
          A self-assessment, not an audit: it shows where to look first.{" "}
          <button type="button" className="rq-link" onClick={retake}>
            Retake the check
          </button>
        </p>
      </section>
    );
  }

  // ---------------------------------------------------------------- the questions

  const q = QUESTIONS[step];
  const pillar = PILLARS.find((p) => p.id === q.pillar);
  const answered = answers[step];

  return (
    <section className="rq" aria-label="AI production readiness check">
      <div className="rq-head">
        <p className="rq-step" id={stepId}>
          Question {step + 1} of {QUESTION_COUNT}
        </p>
        <p className="rq-area">{pillar?.name}</p>
      </div>
      <div
        className="rq-progress"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={QUESTION_COUNT}
        aria-valuenow={step}
        aria-valuetext={`Question ${step + 1} of ${QUESTION_COUNT}`}
      >
        <span style={{ width: `${(step / QUESTION_COUNT) * 100}%` }} />
      </div>

      <fieldset className="rq-fieldset" aria-describedby={stepId}>
        <legend className="rq-question" ref={questionRef} tabIndex={-1}>
          {q.prompt}
        </legend>
        <div className="rq-options">
          {q.answers.map((text, i) => (
            <button
              key={text}
              type="button"
              className="rq-option"
              aria-pressed={answered === i}
              onClick={() => choose(i)}
            >
              {text}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="rq-foot">
        <button type="button" className="rq-link" onClick={back} disabled={step === 0}>
          Back
        </button>
        <p className="rq-note">Choosing an answer moves on to the next question.</p>
      </div>
    </section>
  );
}
