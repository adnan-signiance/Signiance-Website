import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Security",
  description: "How Signiance secures its own systems and the client environments we build and operate.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <PageShell>
      <LegalPage
        eyebrow="Legal"
        title="Security"
        updated="September 21, 2026"
        intro="We're an AWS Advanced Tier and Well-Architected Partner, and we hold client systems and data to the same bar we'd expect of a vendor working inside our own infrastructure."
        sections={[
          {
            heading: "1. Infrastructure",
            body: [
              "Client and internal workloads run on AWS, built against the AWS Well-Architected Framework. Environments are provisioned as code, isolated per client, and reviewed against least-privilege access before go-live.",
            ],
          },
          {
            heading: "2. Encryption",
            body: [
              "Data is encrypted in transit (TLS) and at rest, using managed key services rather than custom cryptography. Secrets and credentials are held in a dedicated secrets manager, never in source control.",
            ],
          },
          {
            heading: "3. Access control",
            body: [
              "Access to production systems follows least-privilege and is scoped per engagement. We use multi-factor authentication across internal tooling and review access on a regular cadence, revoking it immediately when an engagement ends or a team member rotates off.",
            ],
          },
          {
            heading: "4. Application security",
            body: [
              "Our delivery process includes dependency scanning, code review, and security testing appropriate to the system being built. For agentic and AI systems specifically, we design around the additional risks of prompt injection, tool misuse, and data exfiltration.",
            ],
          },
          {
            heading: "5. Vulnerability disclosure",
            body: [
              "If you believe you've found a security issue in our website or a system we operate, please report it to security@signiance.com. Include enough detail to reproduce the issue. We investigate every report and will acknowledge receipt within two business days; please give us a reasonable window to remediate before disclosing publicly.",
            ],
          },
          {
            heading: "6. Incident response",
            body: [
              "We maintain an internal incident response process covering detection, containment, and client notification. Clients under an active engagement are notified without undue delay of any incident affecting their systems or data, consistent with that engagement's agreement.",
            ],
          },
          {
            heading: "7. Sub-processors and partners",
            body: [
              "We use a small set of vetted infrastructure and tooling providers to deliver our services, and review each provider's own security posture before relying on them. The providers involved in operating this website are:",
              {
                list: [
                  "Amazon Web Services — hosting and infrastructure.",
                  "Calendly, LLC — call scheduling. Loaded only after a visitor consents, and receives the booking details that visitor enters.",
                ],
              },
              "Providers used inside a specific client engagement are disclosed in that engagement's own agreement. Our website privacy policy sets out what each provider above receives.",
            ],
          },
          {
            heading: "8. Contact",
            body: [
              "Security questions or reports: security@signiance.com. General inquiries: hello@signiance.com.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
