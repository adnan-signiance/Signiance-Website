"use client";

import { useEffect, useRef, useState } from "react";
import CtaArrow from "./CtaArrow";
import { contactEmail } from "@/lib/data";
import { track } from "@/lib/analytics";
import type { ContactIntent } from "@/lib/contactSchema";

type Status = "idle" | "submitting" | "success" | "error";

const TIMELINES = ["Not sure yet", "Within a month", "This quarter", "Next quarter"];

/**
 * Replaces the old budget-range dropdown. Asking what the thing needs to *do*
 * routes the enquiry to the right practice, which is more useful to both sides
 * than a budget band — and is a question a prospect can answer on a first visit.
 */
const USE_CASES = [
  "Not sure yet",
  "Cloud, DevOps or cost",
  "An agent that takes actions",
  "Answers from our own documents",
  "A copilot inside our product",
  "Prove a concept before we fund it",
  "Something else",
];

/**
 * First-party enquiry form.
 *
 * Exists alongside the Cal.com embed so conversion never depends on a third
 * party: anyone who declines cookies, blocks embeds, or is behind a corporate
 * firewall can still reach us.
 */
export default function ContactForm({
  intent = "scoping-call",
  source = "",
}: {
  intent?: ContactIntent;
  source?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showEmailFallback, setShowEmailFallback] = useState(false);

  // Used to spot submissions completed faster than a human plausibly could.
  // Set on mount rather than during render, since Date.now() is impure.
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError(null);
    setShowEmailFallback(false);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, intent, source, startedAt: startedAt.current }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        // The conversion event that matters most: a real enquiry reached us.
        track("enquiry_submitted", { intent, source, useCase: String(payload.useCase ?? "") });
        form.reset();
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setFormError("Please check the highlighted fields.");
        track("enquiry_failed", { intent, reason: "validation" });
      } else if (response.status === 429) {
        setFormError("That is a few submissions in a short time. Please try again shortly.");
        track("enquiry_failed", { intent, reason: "rate_limited" });
      } else if (data.error === "delivery_unconfigured" || data.error === "delivery_failed") {
        setFormError("We could not send that from here.");
        setShowEmailFallback(true);
        // Separated from other failures on purpose: this one means enquiries are
        // being lost to a misconfiguration, which needs to be noticed fast.
        track("enquiry_failed", { intent, reason: String(data.error) });
      } else {
        setFormError("Something went wrong sending that.");
        setShowEmailFallback(true);
        track("enquiry_failed", { intent, reason: "unknown" });
      }
      setStatus("error");
    } catch {
      setFormError("We could not reach the server. You may be offline.");
      setShowEmailFallback(true);
      track("enquiry_failed", { intent, reason: "network" });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <p className="form-success-title">Thanks — that reached us.</p>
        <p className="form-success-body">
          We reply within a business day, usually sooner. If it is urgent, email{" "}
          <a href={`mailto:${contactEmail}`} className="cookie-consent-link">
            {contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  const describedBy = (field: string) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden from people, inviting to bots. Not display:none, which
          some bots detect and skip. */}
      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <p className="contact-field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
          {errors.email && (
            <p className="contact-field-error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" autoComplete="organization" />
        </div>

        <div className="contact-field">
          <label htmlFor="timeline">Timeline</label>
          <select id="timeline" name="timeline" defaultValue={TIMELINES[0]}>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="useCase">What do you want it to do?</label>
        <select id="useCase" name="useCase" defaultValue={USE_CASES[0]}>
          {USE_CASES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <p className="contact-field-hint">
          Closest match is fine. It tells us who from the team should join the call.
        </p>
      </div>

      <div className="contact-field">
        <label htmlFor="message">What workflow keeps breaking?</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          placeholder="The more specific, the more useful the first call will be."
        />
        {errors.message && (
          <p className="contact-field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>

      <div className="contact-form-footer">
        <button type="submit" className="btn-hero-primary" disabled={status === "submitting"}>
          <CtaArrow>{status === "submitting" ? "Sending…" : "Send it over"}</CtaArrow>
        </button>
        <p className="contact-field-hint">We reply within a business day.</p>
      </div>

      {/* Announced to screen readers without stealing focus. */}
      <div aria-live="polite" role="status">
        {formError && <p className="contact-form-error">{formError}</p>}
        {showEmailFallback && (
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
  );
}
