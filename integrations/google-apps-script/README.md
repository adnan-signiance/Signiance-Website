# Enquiry delivery via Google Apps Script

The contact form and the footer newsletter signup post straight from the browser
to a Google Apps Script web app. The script emails `hello@signiance.com` and,
optionally, appends the submission to a Google Sheet. There is no server of our
own in the path, so the site can be hosted anywhere.

```
browser  ──POST text/plain──▶  script.google.com/macros/s/…/exec  ──MailApp──▶  hello@signiance.com
                                                                  └─(optional)─▶  Google Sheet
```

## Set it up (about 5 minutes)

Do this signed in as a **shared company account** (for example `hello@signiance.com`
itself, or a dedicated `website@` mailbox). The email is sent *from* whichever
account deploys the script, and the script stops working if that account is
removed. Avoid using a personal account.

1. Go to <https://script.google.com> and choose **New project**. Name it
   "Signiance enquiries".
2. Replace the contents of `Code.gs` with [`enquiries.gs`](./enquiries.gs).
   Check `CONFIG.TO` is the inbox that should receive enquiries.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Approve the permissions prompt (it asks to send email as you, and to reach
   Sheets if you enable the log below).
5. Copy the **Web app URL**. It ends in `/exec`.
6. Put it in the site's environment and rebuild, because `NEXT_PUBLIC_*` values
   are inlined at build time:

   ```bash
   NEXT_PUBLIC_CONTACT_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```

### Check the deployment

Open the Web app URL in a browser. You should see
`{"ok":true,"service":"signiance-enquiries"}`.

Then send a real submission:

```bash
curl -L -X POST "$NEXT_PUBLIC_CONTACT_ENDPOINT" \
  -H "Content-Type: text/plain" \
  --data '{"name":"Test","email":"you@example.com","message":"Testing the enquiry endpoint.","intent":"general","source":"curl"}'
```

Expect `{"ok":true}` and an email in the inbox. Then submit the real form on the
site once; that confirms the browser can read the response too.

### Optional: keep a copy in a Google Sheet

1. Create a Sheet, copy its ID from the URL (`/d/<ID>/edit`).
2. In the script: **Project Settings → Script properties → Add** `SHEET_ID` = that ID.
3. Redeploy. A tab called "Enquiries" is created on the first submission.

## If a browser cannot read Google's reply

The form normally reads the script's JSON answer to show success, a validation
message or "try again shortly". That needs Google's redirect to carry CORS
headers. If a browser refuses to expose the reply, the submission has still
reached the script, so `lib/contactDelivery.ts` sends it once more in `no-cors`
mode and treats a completed request as delivered. Every submission carries a
random `id`, and the script drops a repeat of an id it has already emailed, so
this never produces a second email. In that situation the form shows success but
cannot show the script's own rate-limit or quota errors.

## Changing the script later

Edits to the code do nothing until you publish them: **Deploy → Manage
deployments → pencil icon → Version: New version → Deploy**. Editing the
deployment this way keeps the same URL. Choosing **New deployment** instead
creates a *different* URL that you would have to put back in the site.

## What it protects against, and what it does not

| Protection | Where |
| --- | --- |
| Field validation and length limits | Browser (`lib/contactSchema.ts`) and again in the script |
| Hidden honeypot field and minimum completion time | Browser; the honeypot is also checked in the script |
| 5 submissions per address per 10 minutes, 60 per hour overall | Script |
| Newline stripping in the subject, HTML escaping in the body | Script |
| Spreadsheet formula injection in the optional log | Script |

The Web app URL ships in the page source, so anyone can post to it directly,
skipping the browser checks. The script's own validation and rate limits are what
stand in the way, and Google's mail quota (about 1,500 recipients a day on
Workspace) is the backstop. If enquiries ever start arriving as spam, the fix is
to put a CAPTCHA token check in front, not to hide the URL.

## Keep in step

`enquiries.gs` repeats the intent list, field limits and email pattern from
`lib/contactSchema.ts`, because the script cannot import from the site. Change one,
change the other.
