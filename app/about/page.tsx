import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The team you hire when the AI pilot has to become real work. Senior cloud and AI engineers, AWS Advanced Tier Partner, three locations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutContent />
    </PageShell>
  );
}
