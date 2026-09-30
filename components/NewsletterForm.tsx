"use client";

import { useEffect, useRef, useState } from "react";
import CtaArrow from "./CtaArrow";
import { contactEmail } from "@/lib/data";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Newsletter signup.
 *
 * Posts to the same endpoint as the enquiry form with a `newsletter` intent, so
 * signups actually arrive somewhere. Previously this was markup only, while the
 * surrounding copy promised "unsubscribe anytime" — a promise nothing could keep.
 */
export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  // Set on mount rather than during render, since Date.now() is impure.
  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage(null);

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          intent: "newsletter",
          source: "footer",
          startedAt: startedAt.current,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage("You're on the list.");
        track("newsletter_submitted");
        form.reset();
        return;
      }

      setStatus("error");
      setMessage(
        data.errors?.email ??
          (response.status === 429
            ? "Too many attempts. Try again shortly."
            : `Could not sign you up. Email ${contactEmail} instead.`)
      );
    } catch {
      setStatus("error");
      setMessage(`Could not reach the server. Email ${contactEmail} instead.`);
    }
  }

  return (
    <>
      <form style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }} onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          className="footer-newsletter-input"
          required
          aria-describedby={message ? "newsletter-status" : undefined}
        />
        <button
          type="submit"
          className="btn-hero-primary"
          style={{ border: "none", cursor: "pointer" }}
          disabled={status === "submitting"}
        >
          <CtaArrow>{status === "submitting" ? "Sending…" : "Subscribe"}</CtaArrow>
        </button>
      </form>
      <div aria-live="polite" role="status" id="newsletter-status">
        {message && (
          <p
            style={{
              margin: "10px 0 0",
              fontSize: "var(--fs-xs)",
              lineHeight: 1.5,
              color: status === "success" ? "var(--color-success)" : "var(--color-danger)",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
}
