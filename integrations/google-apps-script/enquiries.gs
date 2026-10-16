/**
 * Signiance enquiry endpoint — a Google Apps Script web app.
 *
 * The website's contact and newsletter forms POST here (see lib/contactDelivery.ts).
 * Each valid submission is emailed to the company inbox, with the visitor's address
 * as reply-to so answering the email answers the visitor, and optionally appended
 * to a Google Sheet as a backup copy.
 *
 * Setup is in integrations/google-apps-script/README.md. Not part of the Next.js
 * build: this file is pasted into script.google.com and deployed from there.
 */

var CONFIG = {
  // Where enquiries land.
  TO: "hello@signiance.com",
  // Shown as the sender name; the address itself is the account that deploys this.
  FROM_NAME: "Signiance website",
  SUBJECT_PREFIX: "[Website] ",
  // Per visitor address: at most RATE_MAX submissions in RATE_WINDOW_S seconds.
  RATE_MAX: 5,
  RATE_WINDOW_S: 600,
  // Across everyone, per hour. Stops a flood from eating the daily mail quota.
  HOURLY_MAX: 60,
  // Backup log. Set a Script Property named SHEET_ID (Project Settings) to turn it on.
  SHEET_TAB: "Enquiries"
};

// Keep in step with lib/contactSchema.ts.
var INTENTS = ["scoping-call", "service-enquiry", "case-study-enquiry", "retainer", "newsletter", "general"];
var LIMITS = { name: 120, email: 254, company: 160, message: 4000, timeline: 80, useCase: 120, source: 200 };
var EMAIL_RE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/** Opening the web app URL in a browser answers this; handy to confirm a deploy. */
function doGet() {
  return json_({ ok: true, service: "signiance-enquiries" });
}

function doPost(e) {
  try {
    var raw = parse_(e);
    if (!raw) return json_({ ok: false, error: "validation_failed", errors: { form: "Unreadable submission." } });

    // A person never fills this hidden field. Answered as a success so a bot learns nothing.
    if (str_(raw.website) !== "") return json_({ ok: true });

    var checked = validate_(raw);
    if (checked.errors) return json_({ ok: false, error: "validation_failed", errors: checked.errors });
    var data = checked.data;

    // The site repeats a send when a browser will not show it the reply, with the
    // same id. If that id was already delivered, say so and send nothing more.
    var id = /^[A-Za-z0-9-]{8,64}$/.test(str_(raw.id)) ? str_(raw.id) : "";
    if (id && CacheService.getScriptCache().get("id:" + id)) return json_({ ok: true });

    if (tooMany_(data.email)) return json_({ ok: false, error: "rate_limited" });
    if (MailApp.getRemainingDailyQuota() < 1) {
      console.error("[enquiries] daily mail quota exhausted");
      return json_({ ok: false, error: "delivery_failed" });
    }

    var mail = render_(data);
    MailApp.sendEmail({
      to: CONFIG.TO,
      replyTo: data.email,
      name: CONFIG.FROM_NAME,
      subject: mail.subject,
      body: mail.text,
      htmlBody: mail.html
    });

    // Marked only once the email has gone, so a failed attempt can still be retried.
    if (id) CacheService.getScriptCache().put("id:" + id, "1", CONFIG.RATE_WINDOW_S);

    log_(data);
    return json_({ ok: true });
  } catch (err) {
    console.error("[enquiries] " + err);
    return json_({ ok: false, error: "delivery_failed" });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function str_(v) {
  return typeof v === "string" ? v.trim() : "";
}

function parse_(e) {
  try {
    var parsed = JSON.parse(e.postData.contents);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (err) {
    return null;
  }
}

function validate_(raw) {
  var errors = {};
  var name = str_(raw.name);
  var email = str_(raw.email);
  var company = str_(raw.company);
  var message = str_(raw.message);
  var timeline = str_(raw.timeline);
  var useCase = str_(raw.useCase);
  var source = str_(raw.source).slice(0, LIMITS.source);
  var intent = INTENTS.indexOf(str_(raw.intent)) === -1 ? "general" : str_(raw.intent);
  var newsletter = intent === "newsletter";

  if (!newsletter) {
    if (name.length < 2) errors.name = "Tell us your name.";
    else if (name.length > LIMITS.name) errors.name = "That name is too long.";
    if (message.length < 10) errors.message = "A sentence or two about the workflow helps us prepare.";
    else if (message.length > LIMITS.message) errors.message = "Please keep this under 4000 characters.";
    if (company.length > LIMITS.company) errors.company = "That company name is too long.";
    if (timeline.length > LIMITS.timeline) errors.timeline = "Invalid timeline.";
    if (useCase.length > LIMITS.useCase) errors.useCase = "Invalid use case.";
  }

  if (!email) errors.email = "We need an email address to reply to.";
  else if (email.length > LIMITS.email) errors.email = "That email address is too long.";
  else if (!EMAIL_RE.test(email)) errors.email = "That does not look like a valid email address.";

  for (var k in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, k)) return { errors: errors };
  }
  return {
    data: { name: name, email: email, company: company, message: message, timeline: timeline, useCase: useCase, intent: intent, source: source }
  };
}

/** Counts a submission against the visitor and the hour; true when either is over its limit. */
function tooMany_(email) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var cache = CacheService.getScriptCache();
    var visitorKey = "rl:" + email.toLowerCase();
    var hourKey = "hr:" + Math.floor(Date.now() / 3600000);

    var visitor = Number(cache.get(visitorKey) || 0) + 1;
    var hour = Number(cache.get(hourKey) || 0) + 1;
    cache.put(visitorKey, String(visitor), CONFIG.RATE_WINDOW_S);
    cache.put(hourKey, String(hour), 3600);

    return visitor > CONFIG.RATE_MAX || hour > CONFIG.HOURLY_MAX;
  } finally {
    lock.releaseLock();
  }
}

function escape_(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function render_(d) {
  var rows = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company],
    ["Timeline", d.timeline],
    ["Use case", d.useCase],
    ["Intent", d.intent],
    ["Source page", d.source]
  ].filter(function (r) { return r[1] !== ""; });

  // Newlines stripped so a crafted name cannot add headers to the message.
  var who = (d.name || d.email).replace(/[\r\n]+/g, " ");
  var subject = CONFIG.SUBJECT_PREFIX + (d.intent === "newsletter" ? "Newsletter signup: " + d.email : "Enquiry (" + d.intent + "): " + who);

  var text = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n") + (d.message ? "\n\n" + d.message : "");

  var html =
    '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr><td style="padding:4px 12px 4px 0;color:#6A6D71">' + escape_(r[0]) + '</td><td style="padding:4px 0"><strong>' + escape_(r[1]) + "</strong></td></tr>";
    }).join("") +
    "</table>" +
    (d.message ? '<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">' + escape_(d.message) + "</p>" : "");

  return { subject: subject, text: text, html: html };
}

/** Optional backup copy. A failure here never fails the submission; the email already went. */
function log_(d) {
  var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) return;
  try {
    var book = SpreadsheetApp.openById(id);
    var sheet = book.getSheetByName(CONFIG.SHEET_TAB) || book.insertSheet(CONFIG.SHEET_TAB);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", "Intent", "Name", "Email", "Company", "Timeline", "Use case", "Source page", "Message"]);
    }
    sheet.appendRow([new Date(), d.intent, d.name, d.email, d.company, d.timeline, d.useCase, d.source, d.message].map(cell_));
  } catch (err) {
    console.error("[enquiries] sheet log failed: " + err);
  }
}

/** A cell starting with = + - @ is run as a formula by Sheets; a leading apostrophe keeps it as text. */
function cell_(v) {
  return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
}
