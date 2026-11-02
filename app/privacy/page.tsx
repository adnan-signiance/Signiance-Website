import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Signiance collects, uses, and protects information across our website and client engagements.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalPage
        eyebrow="Legal"
        title="Privacy Policy"
        updated="September 21, 2026"
        intro="This policy explains what information we collect when you visit signiance.com or work with us, why we collect it, and the choices you have."
        sections={[
          {
            heading: "1. Information we collect",
            body: [
              "We collect information in three ways: what you give us directly, what your browser sends automatically, and what we gather in the course of a client engagement.",
              {
                list: [
                  "Contact details you send us directly: if you email us, we receive your address and whatever you choose to tell us.",
                  "Booking details you enter into our scheduling widget when you reserve a call: name, email address, time zone, and any notes you add. This widget is provided by Calendly — see section 3.",
                  "Usage data your browser sends automatically, recorded in standard server logs: pages visited, referring URL, browser and device type, and approximate location derived from IP address.",
                  "One essential cookie recording your cookie choice, so we do not have to ask again on your next visit.",
                  "Project-related information you share with us once an engagement begins, handled under the terms of that engagement's own agreement.",
                ],
              },
            ],
          },
          {
            heading: "2. How we use information",
            body: [
              "We use the information above to respond to inquiries, scope and deliver engagements, operate and improve this website, and send occasional updates relevant to work we've discussed with you. We do not sell personal information.",
            ],
          },
          {
            heading: "3. Cookies and third-party embeds",
            body: [
              "We do not use advertising or cross-site tracking cookies. Our site analytics are cookieless: they count page views and a small set of events (such as an enquiry being submitted) in aggregate, without cookies, without a device identifier, and without building a profile of you. The only cookie we set ourselves is a small essential one that remembers whether you accepted or declined the booking widget, so we do not ask again on every page.",
              "Our scheduling widget is provided by Calendly, LLC. It is a third party, and loading it allows Calendly to set its own cookies and to receive your IP address and browser information. For that reason we do not load it until you accept:",
              {
                list: [
                  "If you accept, the widget loads inline and you can pick a time without leaving the site. Calendly receives the name, email address and notes you enter, and processes them as described in its own privacy policy.",
                  "If you decline, the widget is never loaded and Calendly sets nothing. You can still book by following a direct link to our Calendly page, or simply email us — both options are shown in place of the widget.",
                ],
              },
              "You can change or withdraw your choice at any time using the cookie settings link in the footer, and you can block or clear cookies in your browser settings. The rest of the site works normally without any of them.",
            ],
          },
          {
            heading: "4. How we share information",
            body: [
              "We do not sell or rent personal information. We share it only with:",
              {
                list: [
                  "Calendly, LLC — scheduling. Receives the name, email address, time zone and notes you enter when booking a call. Loaded only with your consent.",
                  "Plausible Analytics — cookieless, aggregate site statistics. Receives no cookies, no device identifier and no personal profile.",
                  "Amazon Web Services — hosting and infrastructure for this site.",
                  "Our email provider — correspondence you send to or receive from us.",
                  "Professional advisors (legal, accounting) where necessary.",
                  "Authorities, where required by law or to protect our rights.",
                ],
              },
              "Each provider is bound by confidentiality obligations and processes information only on our instructions, except where they act as an independent controller of their own data — as Calendly does for the booking information you give it directly.",
            ],
          },
          {
            heading: "5. Data retention",
            body: [
              "We keep contact and inquiry information for as long as it's useful to the relationship, and delete it on request. Engagement-related data is retained per the terms agreed in the relevant client contract.",
            ],
          },
          {
            heading: "6. Your rights",
            body: [
              "Depending on where you're located, you may have the right to access, correct, export, or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise any of these, email us at the address below. We reply within a business day.",
            ],
          },
          {
            heading: "7. Data security",
            body: [
              "We apply industry-standard technical and organizational safeguards, including encryption in transit, access controls, and least-privilege practices, to protect information against unauthorized access, loss, or misuse. See our Security page for more detail.",
            ],
          },
          {
            heading: "8. International transfers",
            body: [
              "We operate across Bengaluru and Rajkot. Information may be processed in any of these locations; where required, we rely on appropriate safeguards for cross-border transfer.",
            ],
          },
          {
            heading: "9. Children's privacy",
            body: [
              "This site is intended for business audiences and is not directed at children. We do not knowingly collect information from anyone under 16.",
            ],
          },
          {
            heading: "10. Changes to this policy",
            body: [
              "We'll update the date at the top of this page whenever this policy changes, and post material changes here before they take effect.",
            ],
          },
          {
            heading: "11. Contact us",
            body: [
              "Questions about this policy or your data: hello@signiance.com.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
