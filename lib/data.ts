export const brand = "Signiance";

export const headline =
  "The team you hire when the AI pilot has to become real work";

export const subhead =
  "We help growing businesses move from cloud infrastructure to production AI without the overhead of a full in house team.";

export const accent = "#193DAA";

export type Service = {
  no: string;
  title: string;
  body: string;
};

export const services: Service[] = [
  {
    no: "01",
    title: "Cloud Architecture & DevOps",
    body: "Resilient, scalable architectures with CI/CD and IaC — ship faster with confidence.",
  },
  {
    no: "02",
    title: "Agentic AI Developments (Multi Agent Systems)",
    body: "Multi-agent systems that plan, coordinate, and execute real work end to end.",
  },
  {
    no: "03",
    title: "Generative AI and RAG / LLM Solutions",
    body: "Production LLM apps — retrieval pipelines, grounding, and evaluations.",
  },
  {
    no: "04",
    title: "AI POC and MVP Development",
    body: "From idea to a working prototype on real data, in weeks not quarters.",
  },
  {
    no: "05",
    title: "Copilots & Conversational AI",
    body: "Assistants embedded in your product, tuned to your workflows and tone.",
  },
];

export type EngagementModel = {
  name: string;
  badge: string;
  badgeFg: string;
  badgeBg: string;
  duration: string;
  body: string;
  includes: string[];
  cta: string;
  bg: string;
};

export const models: EngagementModel[] = [
  {
    name: "Scoping sprint",
    badge: "Start here",
    badgeFg: "#55585C",
    badgeBg: "#ECEBE6",
    duration: "One week, fixed fee",
    body: "One workflow, measured. You get a baseline, a build plan and a clear decision — credited against the build if you continue.",
    includes: [
      "Workflow audit with your ops team",
      "Measured baseline on real data",
      "Build plan and effort estimate",
      "Go / no-go recommendation",
    ],
    cta: "Book a scoping call",
    bg: "#FFFFFF",
  },
  {
    name: "Delivery engagement",
    badge: "Most chosen",
    badgeFg: "#FFFFFF",
    badgeBg: "#152F85",
    duration: "4–9 weeks per outcome",
    body: "We build the scoped workflow into production with your team alongside us. Milestones you approve, not hours you audit.",
    includes: [
      "Senior pod of 3–4, no juniors",
      "Weekly demo on a shared board",
      "Evals and guardrails included",
      "Code and runbook handed to you",
    ],
    cta: "Discuss an engagement",
    bg: "#EEF2FB",
  },
  {
    name: "Retained partner",
    badge: "For portfolios",
    badgeFg: "#55585C",
    badgeBg: "#ECEBE6",
    duration: "Rolling, 30 days' notice",
    body: "A standing pod across several workflows, with quarterly outcome reviews and on-call cover for what we've shipped.",
    includes: [
      "Multi-workflow roadmap",
      "Quarterly outcome review",
      "On-call for production issues",
      "Advisory for your internal hires",
    ],
    cta: "Talk about a retainer",
    bg: "#FFFFFF",
  },
];

export const metrics = [
  { value: "3 wks", label: "Median scope to first production use" },
  { value: "30%", label: "Average running cost reduction" },
  { value: "50", label: "Workflows delivered and handed over" },
  { value: "20+", label: "Happy clients we've delivered for" },
];

export const credentials = [
  { value: "12 yrs", label: "Median team experience" },
  { value: "0", label: "Junior hours billed" },
  { value: "100%", label: "Code and IP yours" },
];

export const steps = [
  {
    n: "1",
    week: "WEEK 01",
    title: "Scope one workflow",
    body: "We sit with the people doing the work, measure the baseline, and write down what better looks like in numbers.",
  },
  {
    n: "2",
    week: "WEEK 02",
    title: "Build the thin slice",
    body: "A working version on your real data, behind a flag, with your reviewers in the loop from the first day.",
  },
  {
    n: "3",
    week: "WEEK 03",
    title: "Ship it for real",
    body: "Live traffic, guardrails and dashboards your team owns — plus the training sessions to run it without us.",
  },
  {
    n: "4",
    week: "AFTER",
    title: "Hand over and step back",
    body: "Runbook, code, evals and a support window. We stay available; we don't stay necessary.",
  },
];

export const footerColumns = [
  { head: "Services", items: ["Workflow delivery", "Embedded teams", "Assurance"] },
  { head: "Company", items: ["About", "Careers", "Field notes"] },
  { head: "Contact", items: ["Book a call", "Email us", "Press"] },
];

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  logo: string;
  logoAlt: string;
  quoteBefore: string;
  quoteHighlight: string;
  quoteAfter: string;
};

export const testimonials: Testimonial[] = [
  {
    initials: "MW",
    name: "Marcus Webb",
    role: "VP Engineering",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Amazon_logo.svg",
    logoAlt: "Amazon",
    quoteBefore:
      "We had two failed AI pilots before this. Signiance scoped one workflow,",
    quoteHighlight: "shipped it in a month",
    quoteAfter: ", and left our engineers able to run it without them.",
  },
  {
    initials: "PS",
    name: "Priya Shah",
    role: "Head of Risk",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Stripe_Logo%2C_revised_2016.svg",
    logoAlt: "Stripe",
    quoteBefore:
      "Every vendor promised compliance. Signiance was the only one who",
    quoteHighlight: "showed us the audit trail before we signed",
    quoteAfter: ".",
  },
  {
    initials: "TE",
    name: "Tom Ellery",
    role: "COO",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Uber_logo_2018.svg",
    logoAlt: "Uber",
    quoteBefore: "We didn't need another dashboard. We needed",
    quoteHighlight: "fewer stockouts by Friday",
    quoteAfter: " — and that's what shipped.",
  },
];

export const caseStudies = [
  {
    span: 7,
    dark: false,
    image: "/media/light-01.png",
    imageHeight: 200,
    tag: "01 — HEALTHCARE",
    title: "Making pathology reports easier to understand",
    body: "AI-powered analysis that turns complex pathology reports into clearer, structured insights.",
    stat: { value: "80%", label: "faster report review" },
  },
  {
    span: 5,
    dark: true,
    image: "/media/light-02.png",
    imageHeight: 140,
    tag: "02 — SALES · AI",
    title: "Turning sales calls into actionable coaching",
    body: "An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to improve.",
    stat: { value: "10K+", label: "calls analyzed" },
  },
  {
    span: 5,
    dark: false,
    image: "/media/eng-01.png",
    imageHeight: 140,
    tag: "03 — FOOD · AI",
    title: "A conversational AI agent built to scale",
    body: "Secure, production-ready AI deployed across web and mobile, with authentication, scaling, and observability built in.",
    stat: null,
  },
];

export const engineeringCaseStudy = {
  image: "/media/light-03.png",
  tag: "04 — ENGINEERING · CLOUD",
  title: "Scaling engineering simulations with cloud HPC",
  body: "A high-performance AWS environment built for CPU-intensive CFD and GPU-accelerated DEM simulations.",
};

export const clients = [
  { src: "/media/client-abbi.png", alt: "Abbi.ai", height: 26, invert: false },
  { src: "/media/client-dfw.png", alt: "DFW Logics", height: 30, invert: false },
  { src: "/media/client-english3.png", alt: "English3", height: 28, invert: false },
  { src: "/media/client-seagage.png", alt: "Seagage", height: 26, invert: false },
  { src: "/media/client-themagic5.png", alt: "TheMagic5", height: 22, invert: false },
  { src: "/media/client-v5.png", alt: "V5", height: 30, invert: true },
];
