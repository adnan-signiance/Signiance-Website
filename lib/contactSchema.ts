/**
 * Validation for the scoping-call enquiry form.
 *
 * Kept free of any Next.js or network imports so it can be unit tested directly
 * and reused by both the API route and the client form.
 */

export const CONTACT_INTENTS = [
  "scoping-call",
  "service-enquiry",
  "case-study-enquiry",
  "retainer",
  "newsletter",
  "general",
] as const;

export type ContactIntent = (typeof CONTACT_INTENTS)[number];

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  timeline: string;
  /** What the prospect wants built. Replaced the old budget-range field. */
  useCase: string;
  intent: ContactIntent;
  /** Origin path, for attributing which page produced the lead. */
  source: string;
};

export const FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  message: 4000,
  timeline: 80,
  useCase: 120,
  source: 200,
} as const;

// Deliberately permissive: the goal is to reject obvious typos and junk, not to
// adjudicate RFC 5321. Over-strict email regexes reject valid addresses.
const EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(input: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const name = asString(raw.name);
  const email = asString(raw.email);
  const company = asString(raw.company);
  const message = asString(raw.message);
  const timeline = asString(raw.timeline);
  const useCase = asString(raw.useCase);
  const source = asString(raw.source).slice(0, FIELD_LIMITS.source);
  const intentRaw = asString(raw.intent);

  // Newsletter signups only ever supply an address, so the other fields are not
  // required for that intent.
  const isNewsletter = intentRaw === "newsletter";

  if (!isNewsletter) {
    if (name.length < 2) errors.name = "Tell us your name.";
    else if (name.length > FIELD_LIMITS.name) errors.name = "That name is too long.";

    if (message.length < 10) errors.message = "A sentence or two about the workflow helps us prepare.";
    else if (message.length > FIELD_LIMITS.message) errors.message = "Please keep this under 4000 characters.";

    if (company.length > FIELD_LIMITS.company) errors.company = "That company name is too long.";
    if (timeline.length > FIELD_LIMITS.timeline) errors.timeline = "Invalid timeline.";
    if (useCase.length > FIELD_LIMITS.useCase) errors.useCase = "Invalid use case.";
  }

  if (!email) errors.email = "We need an email address to reply to.";
  else if (email.length > FIELD_LIMITS.email) errors.email = "That email address is too long.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like a valid email address.";

  const intent: ContactIntent = (CONTACT_INTENTS as readonly string[]).includes(intentRaw)
    ? (intentRaw as ContactIntent)
    : "general";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, email, company, message, timeline, useCase, intent, source },
  };
}

/**
 * True when a submission looks automated.
 *
 * Two signals: a hidden field a human never sees (and so never fills), and a
 * form completed implausibly fast.
 */
export function looksAutomated(input: unknown, minElapsedMs = 2000): boolean {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  if (asString(raw.website) !== "") return true;

  const startedAt = Number(raw.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed >= 0 && elapsed < minElapsedMs) return true;
  }
  return false;
}
