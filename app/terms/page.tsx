import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service · Signiance",
  description: "The terms that govern use of the Signiance website and our client engagements.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <LegalPage
        eyebrow="Legal"
        title="Terms of Service"
        updated="September 21, 2026"
        intro="These terms govern your use of signiance.com. The scope, deliverables, and commercial terms of any client engagement are set out separately in that engagement's own signed agreement, which takes precedence over this page."
        sections={[
          {
            heading: "1. Acceptance of terms",
            body: [
              "By using this website you agree to these terms. If you don't agree, please don't use the site.",
            ],
          },
          {
            heading: "2. Use of the website",
            body: [
              "You may browse the site and use its forms to contact us. You agree not to misuse the site, including attempting to disrupt it, scrape it at scale, or submit false or misleading information through our forms.",
            ],
          },
          {
            heading: "3. Intellectual property",
            body: [
              "All content on this site, including text, design, graphics, and the Signiance name and logo, is owned by Signiance or its licensors and protected by applicable intellectual property law. You may not reproduce or redistribute it without permission.",
            ],
          },
          {
            heading: "4. Services and engagements",
            body: [
              "Descriptions of our services on this site are informational and don't constitute an offer. Any actual engagement, including scope, fees, timeline, and ownership of work product, is governed exclusively by a separate signed agreement between Signiance and the client.",
            ],
          },
          {
            heading: "5. Confidentiality",
            body: [
              "Information shared with us through this site's forms is treated as confidential and used only to respond to your inquiry, consistent with our Privacy Policy. Confidentiality obligations for an active engagement are set out in that engagement's own agreement.",
            ],
          },
          {
            heading: "6. Disclaimers",
            body: [
              'This site and its content are provided "as is" without warranties of any kind, express or implied, including accuracy, completeness, or fitness for a particular purpose. Case study results describe outcomes for specific clients and are not a guarantee of similar results.',
            ],
          },
          {
            heading: "7. Limitation of liability",
            body: [
              "To the fullest extent permitted by law, Signiance is not liable for any indirect, incidental, or consequential damages arising from your use of this website. Nothing here limits liability that cannot be limited under applicable law, or overrides the liability terms of a signed client agreement.",
            ],
          },
          {
            heading: "8. Third-party links",
            body: [
              "This site may link to third-party sites we don't control. We aren't responsible for their content or practices.",
            ],
          },
          {
            heading: "9. Governing law",
            body: [
              "These terms are governed by the laws of the jurisdiction in which Signiance is incorporated, without regard to conflict-of-law principles, except where a signed client agreement specifies otherwise for that engagement.",
            ],
          },
          {
            heading: "10. Changes to these terms",
            body: [
              "We may update these terms from time to time. The date at the top of this page reflects the most recent revision.",
            ],
          },
          {
            heading: "11. Contact us",
            body: [
              "Questions about these terms: hello@signiance.com.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
