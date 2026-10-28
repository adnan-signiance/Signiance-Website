import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import LegalPage from "@/components/LegalPage";
import { GUARANTEE_APPROVED } from "@/lib/data";

export const metadata: Metadata = {
  title: "How the guarantee works",
  description:
    "The terms of our 30% in 30 days inference guarantee: how the baseline is set, the minimum spend, and what counts as savings.",
  alternates: { canonical: "/guarantee" },
};

/** Does not exist until the guarantee is approved, so nothing can point at terms we have not signed off. */
export default function GuaranteePage() {
  if (!GUARANTEE_APPROVED) notFound();
  return (
    <PageShell>
      <LegalPage
        eyebrow="Guarantee"
        title="How the guarantee works"
        updated="October 28, 2026"
        intro="We'll cut your AI inference bill by 30% in 30 days, measured against your current baseline. If we don't hit it, you don't pay. These are the terms behind that sentence."
        sections={[
          {
            heading: "1. The baseline",
            body: [
              "Before any change is made, we agree the baseline with you in writing. It is built from your own provider bills and usage exports for a recent period we choose together, for the workloads that are in scope.",
              "The baseline is a cost per unit of work (for example per request or per completed task), not a monthly total, so growth or a quiet month in your usage can neither hide savings nor invent them. Both sides sign it off before work starts, and it does not change afterwards.",
            ],
          },
          {
            heading: "2. Minimum spend",
            body: [
              "The guarantee applies where your current inference spend is large enough for a 30% reduction to be measurable and worth an engagement. We confirm the minimum for your situation in writing at scoping, before you commit to anything, and tell you plainly if you are below it.",
            ],
          },
          {
            heading: "3. What counts as savings",
            body: [
              "A reduction in the cost per unit of work for the in-scope workloads, at the same or better quality as measured by the evals we agree up front. Typical sources:",
              {
                list: [
                  "Routing work to a smaller or cheaper model where the evals show no loss of quality.",
                  "Caching, batching and shorter prompts and context.",
                  "Right-sizing the infrastructure behind self-hosted models.",
                ],
              },
              "What does not count:",
              {
                list: [
                  "Lower spend because usage fell or a feature was switched off.",
                  "Price cuts, discounts or credits from your provider.",
                  "Savings that come at the cost of quality below the agreed eval thresholds.",
                  "Cost that has simply moved to another line item.",
                ],
              },
            ],
          },
          {
            heading: "4. How it is measured",
            body: [
              "We measure over the 30 days after the changes go live, from your provider's bills and usage exports, using the same method as the baseline. We share the calculation with you in full.",
            ],
          },
          {
            heading: "5. If we miss",
            body: ["If the measured reduction is below 30%, you don't pay for the engagement."],
          },
          {
            heading: "6. Questions",
            body: [
              "If you want to check whether your spend and setup qualify, write to hello@signiance.com or book a scoping call from the home page.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
