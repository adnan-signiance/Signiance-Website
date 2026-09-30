import { describe, expect, it } from "vitest";
import { looksAutomated, validateContact, FIELD_LIMITS } from "@/lib/contactSchema";

const valid = {
  name: "Dana Reyes",
  email: "dana@example.com",
  company: "Northwind",
  message: "Our nightly reconciliation job fails twice a week and nobody owns it.",
  timeline: "This quarter",
  useCase: "An agent that takes actions",
  intent: "scoping-call",
  source: "/#contact",
};

describe("validateContact", () => {
  it("accepts a complete submission", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe("dana@example.com");
  });

  it("trims surrounding whitespace", () => {
    const result = validateContact({ ...valid, name: "  Dana Reyes  ", email: " dana@example.com " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Dana Reyes");
      expect(result.data.email).toBe("dana@example.com");
    }
  });

  it("requires an email address", () => {
    const result = validateContact({ ...valid, email: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeTruthy();
  });

  it.each(["not-an-email", "missing@tld", "a@b", "two@@at.com", "spaces in@mail.com"])(
    "rejects malformed address %s",
    (email) => {
      const result = validateContact({ ...valid, email });
      expect(result.ok).toBe(false);
    }
  );

  it.each(["first.last@example.co.uk", "dev+tag@sub.example.io", "x@y.dev"])(
    "accepts valid address %s",
    (email) => {
      expect(validateContact({ ...valid, email }).ok).toBe(true);
    }
  );

  it("requires a name and a message for enquiries", () => {
    const result = validateContact({ ...valid, name: "", message: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
    }
  });

  it("rejects a message too short to be useful", () => {
    const result = validateContact({ ...valid, message: "hi" });
    expect(result.ok).toBe(false);
  });

  it("enforces field length caps", () => {
    const result = validateContact({ ...valid, message: "x".repeat(FIELD_LIMITS.message + 1) });
    expect(result.ok).toBe(false);
  });

  it("only needs an email for a newsletter signup", () => {
    const result = validateContact({ email: "dana@example.com", intent: "newsletter" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.intent).toBe("newsletter");
  });

  it("falls back to a safe intent when given an unknown one", () => {
    const result = validateContact({ ...valid, intent: "../../etc/passwd" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.intent).toBe("general");
  });

  it("caps the source field so it cannot be used to smuggle bulk data", () => {
    const result = validateContact({ ...valid, source: "/".repeat(5000) });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.source.length).toBeLessThanOrEqual(FIELD_LIMITS.source);
  });

  it("tolerates junk input without throwing", () => {
    for (const input of [null, undefined, "string", 42, [], { email: 123 }]) {
      expect(() => validateContact(input)).not.toThrow();
    }
  });
});

describe("looksAutomated", () => {
  it("flags a filled honeypot", () => {
    expect(looksAutomated({ ...valid, website: "http://spam.example" })).toBe(true);
  });

  it("ignores an empty honeypot", () => {
    expect(looksAutomated({ ...valid, website: "" })).toBe(false);
  });

  it("flags an implausibly fast submission", () => {
    expect(looksAutomated({ ...valid, startedAt: Date.now() - 50 })).toBe(true);
  });

  it("accepts a submission that took a human amount of time", () => {
    expect(looksAutomated({ ...valid, startedAt: Date.now() - 30_000 })).toBe(false);
  });

  it("does not flag a missing timestamp", () => {
    expect(looksAutomated({ ...valid })).toBe(false);
  });
});
