import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy · Signiance",
  description: "How Signiance collects, uses, and protects information across our website and client engagements.",
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
                  "Contact details you submit through our forms: name, work email, company, and anything you write to us.",
                  "Usage data collected automatically: pages visited, referring URL, browser and device type, and approximate location derived from IP address.",
                  "Cookies and similar technologies used for analytics and to remember basic preferences.",
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
            heading: "3. Cookies and analytics",
            body: [
              "We use a minimal set of cookies for site analytics: understanding which pages are useful and how visitors move through the site. You can block or clear cookies in your browser settings at any time; the site will continue to function without them.",
            ],
          },
          {
            heading: "4. How we share information",
            body: [
              "We do not sell or rent personal information. We share it only with:",
              {
                list: [
                  "Service providers who help us run the site or business (hosting, email, analytics), bound by confidentiality obligations.",
                  "Professional advisors (legal, accounting) where necessary.",
                  "Authorities, where required by law or to protect our rights.",
                ],
              },
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
              "We operate across Bengaluru, Rajkot, and Melbourne. Information may be processed in any of these locations; where required, we rely on appropriate safeguards for cross-border transfer.",
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
