export const brand = "Signiance";

/** Single source of truth for the public contact address. */
export const contactEmail = "hello@signiance.com";

/**
 * Booking configuration.
 *
 * `durationMinutes` is what the site's copy quotes, so it must match the length
 * of the Cal.com event `calLink` points at — otherwise the page promises one
 * thing and the booking form delivers another.
 *
 * The default is 15 to match the event currently configured. Pointing
 * NEXT_PUBLIC_CAL_LINK at a 30-minute company event and setting
 * NEXT_PUBLIC_CAL_MINUTES=30 updates the link and every piece of copy together.
 */
export const booking = {
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || "adnan2004/15min",
  durationMinutes: Number(process.env.NEXT_PUBLIC_CAL_MINUTES ?? 15),
} as const;

/** "15 minutes with the people who'd do the work." — kept consistent sitewide. */
export const bookingPromise = `${booking.durationMinutes} minutes with the people who'd do the work.`;

export const headline =
  "The team you hire when the AI pilot has to become real work";

// Reinforces the H1's promise (speed) instead of competing with it. The previous
// version pitched staffing-cost relief — "without the overhead of a full in
// house team" — which is a different value proposition, and left the page making
// three claims at once. Also doubles as the site meta description.
export const subhead =
  "Pick the workflow that is costing you most. We scope it in a week, ship it to production in weeks, and hand you the code and the runbook.";

export const accent = "var(--color-accent)";

export type TechStackItem = { name: string; logo: string };

export type Service = {
  id: string;
  slug: string;
  no: string;
  short: string;
  navLabel: string;
  title: string;
  body: string;
  long: string;
  bestFor: string;
  deliverables: string[];
  whatIsIt: string;
  capabilities: { title: string; body: string }[];
  whoItsFor: string[];
  techStack: TechStackItem[];
  techStackDetail: TechStackItem[];
  image: string;
  bg: string;
};

const AWS: TechStackItem = { name: "AWS", logo: "/media/tech-logos/amazonaws.svg" };
const TERRAFORM: TechStackItem = { name: "Terraform", logo: "/media/tech-logos/terraform.svg" };
const KUBERNETES: TechStackItem = { name: "Kubernetes", logo: "/media/tech-logos/kubernetes.svg" };
const DOCKER: TechStackItem = { name: "Docker", logo: "/media/tech-logos/docker.svg" };
const GITHUB: TechStackItem = { name: "GitHub", logo: "/media/tech-logos/github.svg" };
const OPENAI: TechStackItem = { name: "OpenAI", logo: "/media/tech-logos/openai.svg" };
const ANTHROPIC: TechStackItem = { name: "Anthropic", logo: "/media/tech-logos/anthropic.svg" };
const LANGCHAIN: TechStackItem = { name: "LangChain", logo: "/media/tech-logos/langchain.svg" };
const PYTHON: TechStackItem = { name: "Python", logo: "/media/tech-logos/python.svg" };

// Detail-page-only tools: a fuller stack list shown with name + logo
// (rather than the compact, logo-only set on the services listing page).
const GITHUB_ACTIONS: TechStackItem = { name: "GitHub Actions", logo: "/media/tech-logos/githubactions.svg" };
const GRAFANA: TechStackItem = { name: "Grafana", logo: "/media/tech-logos/grafana.svg" };
const PROMETHEUS: TechStackItem = { name: "Prometheus", logo: "/media/tech-logos/prometheus.svg" };
const ANSIBLE: TechStackItem = { name: "Ansible", logo: "/media/tech-logos/ansible.svg" };
const HELM: TechStackItem = { name: "Helm", logo: "/media/tech-logos/helm.svg" };
const HUGGINGFACE: TechStackItem = { name: "Hugging Face", logo: "/media/tech-logos/huggingface.svg" };
const REDIS: TechStackItem = { name: "Redis", logo: "/media/tech-logos/redis.svg" };
const FASTAPI: TechStackItem = { name: "FastAPI", logo: "/media/tech-logos/fastapi.svg" };
const SLACK: TechStackItem = { name: "Slack", logo: "/media/tech-logos/slack.svg" };
const QDRANT: TechStackItem = { name: "Qdrant", logo: "/media/tech-logos/qdrant.svg" };
const POSTGRESQL: TechStackItem = { name: "PostgreSQL", logo: "/media/tech-logos/postgresql.svg" };
const ELASTICSEARCH: TechStackItem = { name: "Elasticsearch", logo: "/media/tech-logos/elasticsearch.svg" };
const JUPYTER: TechStackItem = { name: "Jupyter", logo: "/media/tech-logos/jupyter.svg" };
const NEXTJS: TechStackItem = { name: "Next.js", logo: "/media/tech-logos/nextdotjs.svg" };
const VERCEL: TechStackItem = { name: "Vercel", logo: "/media/tech-logos/vercel.svg" };
const AUTH0: TechStackItem = { name: "Auth0", logo: "/media/tech-logos/auth0.svg" };
const HUBSPOT: TechStackItem = { name: "HubSpot", logo: "/media/tech-logos/hubspot.svg" };
const MIXPANEL: TechStackItem = { name: "Mixpanel", logo: "/media/tech-logos/mixpanel.svg" };

export const services: Service[] = [
  {
    id: "s1",
    slug: "cloud-architecture-devops",
    no: "01",
    short: "Cloud & DevOps",
    navLabel: "Cloud & DevOps",
    title: "Cloud Architecture & DevOps",
    body: "Resilient, scalable architectures with CI/CD and IaC, so you ship faster with confidence.",
    long: "Resilient, scalable cloud foundations with CI/CD and infrastructure as code, so every release ships with confidence instead of a war room.",
    bestFor: "Choose this if the platform is the bottleneck - deploys, reliability or running cost - before any AI work can pay off.",
    deliverables: ["Architecture review", "CI/CD & IaC", "On-call runbook"],
    whatIsIt:
      "Cloud Architecture & DevOps is the foundation everything else runs on: resilient infrastructure, automated pipelines, and the on-call discipline that keeps a release from turning into a war room.",
    capabilities: [
      { title: "Architecture review", body: "An audit of your current infrastructure against real failure modes, not a generic checklist." },
      { title: "CI/CD & IaC", body: "Automated pipelines and infrastructure as code, so every environment is reproducible and every release is repeatable." },
      { title: "On-call runbook", body: "Documented, tested procedures your team can run without waiting on us." },
    ],
    whoItsFor: [
      "Teams whose deploys still depend on one person being online.",
      "Engineering leads who inherited infrastructure nobody fully documented.",
      "Startups scaling past the point ad-hoc scripts can keep up.",
    ],
    techStack: [AWS, TERRAFORM, KUBERNETES, DOCKER, GITHUB],
    techStackDetail: [AWS, TERRAFORM, KUBERNETES, DOCKER, GITHUB, GITHUB_ACTIONS, GRAFANA, PROMETHEUS, ANSIBLE, HELM],
    image: "/media/eng-01.webp",
    bg: "var(--color-white)",
  },
  {
    id: "s2",
    slug: "agentic-ai-development",
    no: "02",
    short: "Agentic AI",
    navLabel: "Agentic AI Development",
    title: "Agentic AI Development",
    body: "Multi-agent systems that plan, coordinate, and execute real work end to end.",
    long: "Multi-agent systems that plan, coordinate, and execute real work end to end, with the guardrails your risk team needs to sign off.",
    bestFor: "Choose this if the work is multi-step and has to take actions in your systems, not just answer questions about them.",
    deliverables: ["Agent orchestration", "Tool & memory integration", "Guardrails & evals"],
    whatIsIt:
      "Agentic AI systems don't just answer. They plan, take actions, call tools, and coordinate with each other to get a multi-step job done end to end, with a human able to step in at the right checkpoints.",
    capabilities: [
      { title: "Agent orchestration", body: "Multiple agents coordinating on a single workflow, each responsible for a clear part of the job." },
      { title: "Tool & memory integration", body: "Agents that call your real systems and APIs, and remember context across a session instead of starting cold." },
      { title: "Guardrails & evals", body: "Boundaries on what an agent can do autonomously, plus the evaluation suite your risk team needs to sign off." },
    ],
    whoItsFor: [
      "Workflows with too many steps and exceptions for a single model call.",
      "Ops and revenue teams drowning in repetitive multi-step tasks.",
      "Teams who tried a single-prompt chatbot and hit its ceiling.",
    ],
    techStack: [OPENAI, ANTHROPIC, LANGCHAIN, PYTHON],
    techStackDetail: [OPENAI, ANTHROPIC, LANGCHAIN, PYTHON, HUGGINGFACE, REDIS, FASTAPI, SLACK],
    image: "/media/eng-02.webp",
    bg: "var(--color-tint)",
  },
  {
    id: "s3",
    slug: "gen-ai-rag-solutions",
    no: "03",
    short: "Gen AI & RAG",
    navLabel: "Gen AI & RAG Solutions",
    title: "Gen AI & RAG Solutions",
    body: "Production LLM apps: retrieval pipelines, grounding, and evaluations.",
    long: "Production-grade LLM applications: retrieval pipelines, grounding strategies, and the evaluations that keep answers trustworthy at scale.",
    bestFor: "Choose this if the job is answering from your own documents and data, with a source someone can check.",
    deliverables: ["Retrieval pipeline", "Grounding & citations", "Evaluation dashboard"],
    whatIsIt:
      "Retrieval-augmented generation grounds an LLM's answers in your actual documents and data, instead of letting it guess, so what it tells a user is something you can trace back to a source.",
    capabilities: [
      { title: "Retrieval pipeline", body: "Your documents and data indexed and retrievable, so the model answers from what's actually true for you." },
      { title: "Grounding & citations", body: "Every answer traceable back to a source, not a confident-sounding guess." },
      { title: "Evaluation dashboard", body: "Ongoing measurement of accuracy and hallucination rate, not a one-time demo check." },
    ],
    whoItsFor: [
      "Teams whose answers need to cite something real, every time.",
      "Support and knowledge teams sitting on documents nobody can search well.",
      "Products that need to answer questions grounded in proprietary data.",
    ],
    techStack: [OPENAI, PYTHON, GITHUB, ANTHROPIC],
    techStackDetail: [OPENAI, ANTHROPIC, PYTHON, QDRANT, POSTGRESQL, ELASTICSEARCH, JUPYTER, HUGGINGFACE],
    image: "/media/eng-03.webp",
    bg: "var(--color-white)",
  },
  {
    id: "s4",
    slug: "ai-poc-mvp-development",
    no: "04",
    short: "AI POC / MVP",
    navLabel: "AI MVP Development",
    title: "AI POC & MVP Development",
    body: "From idea to a working prototype on real data, in weeks not quarters.",
    long: "From idea to a working prototype on your real data, in weeks not quarters, built to convert into production, not thrown away.",
    bestFor: "Choose this if the open question is still whether it works at all, and someone needs proof before funding a build.",
    deliverables: ["Scoped POC on real data", "Feasibility read-out", "Path to production"],
    whatIsIt:
      "A proof of concept answers one question: does this actually work on our data, before anyone commits a production budget. We build it to convert into the real thing, not to be thrown away.",
    capabilities: [
      { title: "Scoped POC on real data", body: "Built against your actual data from day one, not a synthetic demo dataset." },
      { title: "Feasibility read-out", body: "A clear, honest answer on what worked, what didn't, and what it would take to go further." },
      { title: "Path to production", body: "Architected so a green light doesn't mean starting over." },
    ],
    whoItsFor: [
      "A budget owner who needs to see it work before they'll fund it.",
      "Teams that have been burned by demos that never went anywhere.",
      "Founders validating an AI feature before it's on the roadmap.",
    ],
    techStack: [OPENAI, ANTHROPIC, AWS, PYTHON],
    techStackDetail: [OPENAI, ANTHROPIC, AWS, PYTHON, NEXTJS, VERCEL, FASTAPI, GITHUB],
    image: "/media/case-fintech.webp",
    bg: "var(--color-tint)",
  },
  {
    id: "s5",
    slug: "copilots-conversational-ai",
    no: "05",
    short: "Copilots",
    navLabel: "AI Copilots",
    title: "Copilots & Conversational AI",
    body: "Assistants embedded in your product, tuned to your workflows and tone.",
    long: "Assistants embedded directly in your product, tuned to your workflows, tone, and the edge cases your users actually hit.",
    bestFor: "Choose this if the assistant belongs inside your product, alongside the user's workflow rather than in a separate tab.",
    deliverables: ["Conversation design", "Product integration & auth", "Usage analytics"],
    whatIsIt:
      "A copilot lives inside your product, answering, drafting, or acting on a user's behalf, tuned to your workflows and tone instead of feeling like a bolted-on chatbot.",
    capabilities: [
      { title: "Conversation design", body: "Scripted for your actual workflows and edge cases, not a generic FAQ bot." },
      { title: "Product integration & auth", body: "Embedded directly in your product with proper authentication, not a separate tool users have to switch to." },
      { title: "Usage analytics", body: "Visibility into what users ask and where the copilot falls short, so it keeps improving." },
    ],
    whoItsFor: [
      "Products where support tickets are really the same five questions.",
      "Teams wanting an assistant embedded in-product, not a separate chatbot widget.",
      "Companies whose users ask for help mid-workflow, not in a separate tab.",
    ],
    techStack: [OPENAI, LANGCHAIN, PYTHON, GITHUB],
    techStackDetail: [OPENAI, LANGCHAIN, PYTHON, AUTH0, HUBSPOT, MIXPANEL, SLACK, GITHUB],
    image: "/media/case-health.webp",
    bg: "var(--color-white)",
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
    badgeFg: "var(--color-white)",
    badgeBg: "linear-gradient(90deg, var(--color-text-soft) 0%, var(--color-neutral-light) 100%)",
    duration: "One week, fixed fee",
    body: "One workflow, measured. You get a baseline, a build plan and a clear decision, credited against the build if you continue.",
    includes: [
      "Workflow audit with your ops team",
      "Measured baseline on real data",
      "Build plan and effort estimate",
      "Go / no-go recommendation",
    ],
    cta: "Book a scoping call",
    bg: "var(--color-white)",
  },
  {
    name: "Delivery engagement",
    badge: "Most chosen",
    badgeFg: "var(--color-white)",
    badgeBg: "linear-gradient(90deg, var(--color-accent-strong) 0%, var(--color-accent) 50%, var(--color-accent-mid) 100%)",
    duration: "4–9 weeks per outcome",
    body: "We build the scoped workflow into production with your team alongside us. Milestones you approve, not hours you audit.",
    includes: [
      "Senior pod of 3–4, no juniors",
      "Weekly demo on a shared board",
      "Evals and guardrails included",
      "Code and runbook handed to you",
    ],
    cta: "Discuss an engagement",
    bg: "var(--color-tint)",
  },
  {
    name: "Retained partner",
    badge: "For portfolios",
    badgeFg: "var(--color-white)",
    badgeBg: "linear-gradient(90deg, var(--color-accent-mid) 0%, var(--color-accent-lighter) 100%)",
    duration: "Rolling, 30 days' notice",
    body: "A standing pod across several workflows, with quarterly outcome reviews and on-call cover for what we've shipped.",
    includes: [
      "Multi-workflow roadmap",
      "Quarterly outcome review",
      "On-call for production issues",
      "Advisory for your internal hires",
    ],
    cta: "Talk about a retainer",
    bg: "var(--color-white)",
  },
];

export const metrics = [
  // Derived from caseStudyEntries, not asserted independently: the nine
  // engagementLength values are 3,4,4,5,5,6,6,7,8 weeks, so the median is 5.
  //
  // This previously read "3 wks", which was wrong twice over — the median was
  // never 3, and the one three-week engagement (c8) was a POC that reached
  // board approval rather than production. It also contradicted the delivery
  // model's own "4-9 weeks per outcome". tests/data-integrity.test.ts now
  // recomputes the median and fails if this number drifts from the case studies.
  { value: "5 wks", label: "Median engagement, scope to production" },
  { value: "30%", label: "Average running cost reduction" },
  { value: "50", label: "Workflows delivered and handed over" },
  { value: "20+", label: "Happy clients we've delivered for" },
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
    body: "Live traffic, guardrails and dashboards your team owns, plus the training sessions to run it without us.",
  },
  {
    n: "4",
    week: "AFTER",
    title: "Hand over and step back",
    body: "Runbook, code, evals and a support window. We stay available; we don't stay necessary.",
  },
];

export const footerColumns = [
  {
    head: "Services",
    items: services.map((sv) => ({ label: sv.navLabel, href: `/services/${sv.slug}` })),
  },
  {
    head: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    head: "Contact",
    items: [
      { label: "Book a call", href: "/#contact" },
      { label: "Email us", href: `mailto:${contactEmail}` },
    ],
  },
];

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  logo?: string;
  quoteBefore: string;
  quoteHighlight: string;
  quoteAfter: string;
};

export const testimonials: Testimonial[] = [
  {
    initials: "BH",
    name: "Bo Haaber",
    role: "CEO",
    company: "THEMAGIC5 INC.",
    photo: "/media/testimonial-bo-haaber.webp",
    logo: "/media/logo-themagic5.png",
    quoteBefore:
      "We have been working with Signiance Technologies LLP, and they have always been",
    quoteHighlight: "responsive and very good at solving issues",
    quoteAfter: ". They are also very good at proposing new initiatives while maintaining best practices.",
  },
  {
    initials: "BR",
    name: "Bhuvanesh Rajput",
    role: "Founder & Principal Consultant",
    company: "RevDau",
    photo: "/media/testimonial-bhuvanesh-rajput.webp",
    logo: "/media/logo-revdau.png",
    quoteBefore: "Team has all the attributes required to make any cloud project successful –",
    quoteHighlight: "Technical Expertise, Project Management, Proactiveness",
    quoteAfter: ", and Tactical and Strategic way of looking at the deliverables.",
  },
  {
    initials: "BN",
    name: "Bryn Nicholls",
    role: "COO",
    company: "1300 Group",
    photo: "/media/testimonial-bryn-nicholls.webp",
    logo: "/media/logo-1300.png",
    quoteBefore: "Consistently relying on their services, I find their",
    quoteHighlight: "ability to collaborate effectively",
    quoteAfter: " noteworthy. They adeptly complete tasks within the designated timelines, meeting all requirements with efficiency.",
  },
  {
    initials: "SG",
    name: "Sandip Gupta",
    role: "CEO & Co-Founder",
    company: "Balihans",
    photo: "/media/testimonial-sandip-gupta.webp",
    quoteBefore:
      "We were building a SaaS product. Brijesh and team helped us scale our cloud infra. We were happy to see",
    quoteHighlight: "quick responses on the requirements",
    quoteAfter: ", Brijesh took additional steps to explain each challenges and help us reach scalability of our product.",
  },
  {
    initials: "VP",
    name: "Vishal Patel",
    role: "CEO",
    company: "Drlogy Technologies Pvt. Ltd.",
    quoteBefore: "From the initial consultation to the implementation phase, Signiance Technologies demonstrated",
    quoteHighlight: "unparalleled expertise in AWS services",
    quoteAfter:
      ". Their team of professionals not only possesses in-depth knowledge but also a rare ability to communicate complex concepts in a way that is easy to understand for someone without a technical background.",
  },
  {
    initials: "ML",
    name: "Moises Lizárraga",
    role: "CTO",
    company: "Seagage Inc.",
    photo: "/media/testimonial-moises.webp",
    logo: "/media/logo-seagage.png",
    quoteBefore: "Signiance has been providing us with support and is very flexible and",
    quoteHighlight: "easy to work with",
    quoteAfter: ". They are willing to work at odd hours in the morning or at night when needed.",
  },
  {
    initials: "JA",
    name: "John Atkins",
    role: "CEO",
    company: "JAC",
    photo: "/media/testimonial-john-atkins.webp",
    logo: "/media/logo-jac.svg",
    quoteBefore: "Their service is rapid, informed, and incredibly personalized. I highly recommend their services due to their",
    quoteHighlight: "quick response, extensive expertise, and tailored approach",
    quoteAfter: ", ensuring a top-notch experience.",
  },
];

export type CaseStudyEntry = {
  id: string;
  slug: string;
  no: string;
  category: string;
  industry: string;
  tag: string;
  title: string;
  teaser: string;
  client: string;
  engagementLength: string;
  challenge: string;
  challengePoints: string[];
  approach: string;
  solutionPoints: { title: string; body: string }[];
  result: string;
  benefits: { title: string; body: string }[];
  techStack: string[];
  statValue: string | null;
  statLabel: string | null;
  image: string;
  dark: boolean;
};

export const caseStudyEntries: CaseStudyEntry[] = [
  {
    id: "c1",
    slug: "making-pathology-reports-easier-to-understand",
    no: "01",
    category: "Gen AI & RAG",
    industry: "Healthcare",
    tag: "01 · HEALTHCARE",
    title: "Making pathology reports easier to understand",
    teaser: "AI-powered analysis that turns complex pathology reports into clearer, structured insights.",
    client: "Healthcare · Clinical operations",
    engagementLength: "4 weeks, single workflow",
    challenge:
      "Pathology reports arrived as dense, inconsistent narrative text, so reviewing one for the next clinical decision often took longer than the diagnosis itself.",
    challengePoints: [
      "Reports arrived as dense, inconsistent narrative text with no standard structure.",
      "Reviewing one report for the next clinical decision often took longer than making the diagnosis itself.",
      "Any fix had to slot into the clinicians' existing tools: no new software to learn.",
    ],
    approach:
      "We built an AI layer that reads each report, extracts the clinically relevant findings, and restructures them into a consistent, scannable format the review team already recognized.",
    solutionPoints: [
      { title: "Extraction pipeline", body: "An AI layer reads each incoming report and extracts the clinically relevant findings." },
      { title: "Consistent structure", body: "Findings are restructured into a scannable format the review team already recognized." },
      { title: "Fits existing tools", body: "Delivered inside the clinicians' current workflow, with no new software to learn." },
    ],
    result:
      "Report review dropped from a first read to a confirmed summary 80% faster, with no change to the clinicians' existing tools.",
    benefits: [
      { title: "80% faster review", body: "Report review dropped from a first read to a confirmed summary 80% faster." },
      { title: "No workflow disruption", body: "Shipped with no change to the clinicians' existing tools." },
      { title: "Consistent output", body: "Every report now follows the same scannable structure, regardless of how it arrived." },
    ],
    techStack: ["Retrieval-augmented generation", "LLM evaluation harness", "Secure document pipeline"],
    statValue: "80%",
    statLabel: "faster report review",
    image: "/media/case-healthcare.jpg",
    dark: false,
  },
  {
    id: "c2",
    slug: "turning-sales-calls-into-actionable-coaching",
    no: "02",
    category: "Agentic AI",
    industry: "Sales",
    tag: "02 · SALES · AI",
    title: "Turning sales calls into actionable coaching",
    teaser: "An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to improve.",
    client: "Sales · Revenue operations",
    engagementLength: "6 weeks, one team",
    challenge:
      "Managers could only sit in on a handful of calls a week, so most coaching happened days later, from memory, on the calls someone happened to catch.",
    challengePoints: [
      "Managers could only sit in on a handful of calls a week.",
      "Most coaching happened days later, from memory, on whichever calls someone happened to catch.",
      "Reps got feedback at the next weekly review, long after the call that needed it.",
    ],
    approach:
      "We shipped an agent that listens to every call, scores it against the team's own playbook, and surfaces what went wrong with a timestamped clip, same day, not next review.",
    solutionPoints: [
      { title: "Listens to every call", body: "An agent processes 100% of calls, not a manager-sampled handful." },
      { title: "Scores against your playbook", body: "Each call is scored against the team's own playbook, not a generic rubric." },
      { title: "Same-day, timestamped feedback", body: "Surfaces what went wrong with a timestamped clip, ready the same day." },
    ],
    result:
      "10K+ calls analyzed and counting, with coaching notes ready before the rep's next call instead of during a weekly review.",
    benefits: [
      { title: "10K+ calls analyzed", body: "And counting: every call, not a sample." },
      { title: "Same-day coaching", body: "Notes ready before the rep's next call, not during a weekly review." },
      { title: "Consistent scoring", body: "Every call measured against the same playbook, not manager memory." },
    ],
    techStack: ["Multi-agent orchestration", "Call transcription & diarization", "Playbook-based scoring model"],
    statValue: "10K+",
    statLabel: "calls analyzed",
    image: "/media/case-sales.jpg",
    dark: true,
  },
  {
    id: "c3",
    slug: "a-conversational-ai-agent-built-to-scale",
    no: "03",
    category: "Copilots",
    industry: "Food",
    tag: "03 · FOOD · AI",
    title: "A conversational AI agent built to scale",
    teaser: "Secure, production-ready AI deployed across web and mobile, with authentication, scaling, and observability built in.",
    client: "Food & Beverage · Customer support",
    engagementLength: "8 weeks, web + mobile",
    challenge:
      "Their support agent worked in a demo, but had none of the authentication, scaling or monitoring a security review, or a real launch, would require.",
    challengePoints: [
      "The support agent worked in a demo, but wasn't built for production.",
      "No authentication, scaling, or monitoring: the basics a security review would require.",
      "Needed to go live across both web and mobile without a rebuild from scratch.",
    ],
    approach:
      "We rebuilt the agent on production infrastructure: proper auth, autoscaling under load, and full observability into every conversation it has.",
    solutionPoints: [
      { title: "Production authentication", body: "Proper auth in front of every conversation, not a demo shortcut." },
      { title: "Autoscaling under load", body: "Rebuilt to scale with real traffic instead of a fixed demo environment." },
      { title: "Full observability", body: "Every conversation is monitored end to end, not just logged after the fact." },
    ],
    result:
      "The agent now handles live customer conversations across web and mobile in production, with a security review already signed off.",
    benefits: [
      { title: "Security review signed off", body: "Passed the review a demo-grade agent couldn't have." },
      { title: "Live on web and mobile", body: "Handles real customer conversations across both surfaces." },
      { title: "Production-grade from day one", body: "Built to stay up under real load, not just demo traffic." },
    ],
    techStack: ["Conversational agent framework", "Auth & session management", "Autoscaling infrastructure", "Conversation observability"],
    statValue: null,
    statLabel: null,
    image: "/media/case-food.jpg",
    dark: false,
  },
  {
    id: "c4",
    slug: "scaling-engineering-simulations-with-cloud-hpc",
    no: "04",
    category: "Cloud & DevOps",
    industry: "Engineering",
    tag: "04 · ENGINEERING · CLOUD",
    title: "Scaling engineering simulations with cloud HPC",
    teaser: "A high-performance AWS environment built for CPU-intensive CFD and GPU-accelerated DEM simulations.",
    client: "Engineering · Industrial simulation",
    engagementLength: "5 weeks, infra rebuild",
    challenge:
      "Their simulation queue was bottlenecked on fixed on-prem hardware: CFD and DEM runs that should take hours were taking days waiting for a slot.",
    challengePoints: [
      "Simulation queue was bottlenecked on fixed on-prem hardware.",
      "CFD and DEM runs that should take hours were taking days waiting for a slot.",
      "Capacity was fixed to the rack, not to the actual workload.",
    ],
    approach:
      "We designed a high-performance AWS environment purpose-built for CPU-intensive CFD and GPU-accelerated DEM workloads, elastic to the queue instead of a fixed rack.",
    solutionPoints: [
      { title: "CPU-optimized CFD environment", body: "Purpose-built AWS environment for CPU-intensive CFD workloads." },
      { title: "GPU-accelerated DEM", body: "Elastic GPU capacity for DEM simulations, provisioned on demand." },
      { title: "Elastic to the queue", body: "Capacity scales to the workload instead of the workload waiting on a fixed rack." },
    ],
    result:
      "Engineers now queue simulations on demand instead of waiting for hardware, with capacity that scales to the workload rather than the other way around.",
    benefits: [
      { title: "Hours, not days", body: "Simulations that waited days for a slot now run on demand." },
      { title: "Elastic capacity", body: "Scales to the workload instead of the workload scaling to fixed hardware." },
      { title: "No more queue bottleneck", body: "Engineers queue simulations on demand instead of waiting for hardware." },
    ],
    techStack: ["AWS HPC infrastructure", "CPU-optimized compute (CFD)", "GPU-accelerated compute (DEM)", "Elastic job scheduling"],
    statValue: null,
    statLabel: null,
    image: "/media/case-engineering.webp",
    dark: false,
  },
  {
    id: "c5",
    slug: "cutting-deploy-time-from-hours-to-minutes",
    no: "05",
    category: "Cloud & DevOps",
    industry: "Retail",
    tag: "05 · RETAIL · CLOUD",
    title: "Cutting deploy time from hours to minutes",
    teaser: "A legacy release process rebuilt around CI/CD and infrastructure as code, so shipping stopped depending on one engineer's calendar.",
    client: "Retail · E-commerce platform",
    engagementLength: "4 weeks, infra rebuild",
    challenge:
      "Every release meant one senior engineer manually running a checklist late at night, and a bad deploy could take hours to detect and roll back.",
    challengePoints: [
      "Deploys ran through a manual checklist only one engineer fully understood.",
      "A bad release could take hours to detect and roll back.",
      "Nobody wanted to ship on a Friday, so releases piled up.",
    ],
    approach:
      "We replaced the manual checklist with a CI/CD pipeline and infrastructure as code, plus automated rollback triggered by the same health checks the team already trusted.",
    solutionPoints: [
      { title: "CI/CD pipeline", body: "Every merge to main runs the same automated build, test, and deploy sequence, no manual checklist." },
      { title: "Infrastructure as code", body: "Environments are reproducible from a repo, not a runbook in someone's head." },
      { title: "Automated rollback", body: "A failed health check reverts the release automatically, before an engineer has to notice." },
    ],
    result:
      "Deploys dropped from a multi-hour, one-person process to a 12-minute pipeline anyone on the team can trigger.",
    benefits: [
      { title: "12-minute deploys", body: "Down from a multi-hour manual process." },
      { title: "No more single point of failure", body: "Any engineer on the team can ship a release." },
      { title: "Automatic rollback", body: "Bad releases revert themselves before they reach most users." },
    ],
    techStack: ["AWS", "Terraform / IaC", "CI/CD pipelines", "Automated health checks"],
    statValue: "12 min",
    statLabel: "median deploy time",
    image: "/media/work-blue.png",
    dark: false,
  },
  {
    id: "c6",
    slug: "an-agent-that-replans-routes-when-a-delivery-falls-through",
    no: "06",
    category: "Agentic AI",
    industry: "Logistics",
    tag: "06 · LOGISTICS · AI",
    title: "An agent that replans routes when a delivery falls through",
    teaser: "A multi-agent system that reassigns and replans delivery routes in real time, instead of a dispatcher doing it by hand.",
    client: "Logistics · Last-mile delivery",
    engagementLength: "7 weeks, one region",
    challenge:
      "When a driver called in or a delivery window slipped, a dispatcher had to manually re-sequence a dozen other routes by hand, under time pressure.",
    challengePoints: [
      "One disruption meant manually re-sequencing a dozen other routes.",
      "Dispatchers made the call under time pressure, with incomplete visibility.",
      "The same disruption pattern repeated daily, with no system learning from it.",
    ],
    approach:
      "We built a multi-agent system that monitors live delivery status, detects a disruption, and re-plans affected routes automatically, with a dispatcher approving before anything changes.",
    solutionPoints: [
      { title: "Live disruption detection", body: "Agents watch delivery status in real time and flag a disruption the moment it happens." },
      { title: "Automatic re-planning", body: "Affected routes are re-sequenced by the agent, not rebuilt by hand under pressure." },
      { title: "Human approval checkpoint", body: "A dispatcher signs off before a changed route goes live." },
    ],
    result:
      "Disruptions that used to cost 20+ minutes of manual re-planning now resolve in under two minutes, with a dispatcher only approving, not building, the fix.",
    benefits: [
      { title: "20+ min saved per disruption", body: "Re-planning that took a dispatcher 20+ minutes now takes under two." },
      { title: "Fewer missed windows", body: "Faster replanning means fewer delivery windows blown by a single disruption." },
      { title: "Dispatcher stays in control", body: "Every change is approved by a human before it ships." },
    ],
    techStack: ["Multi-agent orchestration", "Real-time routing engine", "Guardrail & eval tooling"],
    statValue: "2 min",
    statLabel: "to replan a disrupted route",
    image: "/media/work-red.png",
    dark: true,
  },
  {
    id: "c7",
    slug: "making-a-contract-library-searchable-in-plain-english",
    no: "07",
    category: "Gen AI & RAG",
    industry: "Legal",
    tag: "07 · LEGAL · GEN AI",
    title: "Making a contract library searchable in plain English",
    teaser: "A retrieval pipeline that lets associates ask a contract library a question and get a cited answer, instead of searching by keyword.",
    client: "Legal · Corporate contracts",
    engagementLength: "5 weeks, single practice group",
    challenge:
      "Associates searched thousands of contracts by keyword and still had to open a dozen documents to confirm one clause was standard.",
    challengePoints: [
      "Keyword search returned dozens of documents for one question.",
      "Confirming a clause was standard meant opening and comparing several contracts by hand.",
      "Nothing traced an answer back to the exact clause it came from.",
    ],
    approach:
      "We indexed the firm's contract library into a retrieval pipeline that answers a plain-English question with the relevant clauses and a citation back to the source document.",
    solutionPoints: [
      { title: "Retrieval pipeline", body: "The full contract library indexed and retrievable by meaning, not just keyword." },
      { title: "Grounded, cited answers", body: "Every answer points back to the exact clause and document it came from." },
      { title: "Evaluation dashboard", body: "Ongoing measurement against a set of questions the practice group actually asks." },
    ],
    result:
      "A question that took an associate 20-30 minutes of manual search now gets a cited answer in under a minute.",
    benefits: [
      { title: "Minutes, not half an hour", body: "Clause lookups that took 20-30 minutes now resolve in under a minute." },
      { title: "Every answer cited", body: "Associates can verify the source clause instead of trusting a summary." },
      { title: "Scales with the library", body: "Adding new contracts doesn't add new manual search time." },
    ],
    techStack: ["Retrieval-augmented generation", "Vector databases", "LLM evaluation harness"],
    statValue: "<1 min",
    statLabel: "to answer a clause lookup",
    image: "/media/work-yellow.png",
    dark: false,
  },
  {
    id: "c8",
    slug: "proving-an-underwriting-model-before-funding-the-build",
    no: "08",
    category: "AI POC / MVP",
    industry: "Fintech",
    tag: "08 · FINTECH · POC",
    title: "Proving an underwriting model before funding the build",
    teaser: "A scoped proof of concept on real loan data, answering whether an AI underwriting assist could work before the board funded a production build.",
    client: "Fintech · Consumer lending",
    engagementLength: "3 weeks, single workflow",
    challenge:
      "The team believed an AI-assisted underwriting model could speed up approvals, but couldn't get budget without proof it worked on their actual, messy loan data.",
    challengePoints: [
      "Leadership wouldn't fund a build without evidence it worked on real data.",
      "Prior AI demos elsewhere in the business had been thrown away after the pilot.",
      "The team had weeks, not quarters, to make the case.",
    ],
    approach:
      "We built a scoped proof of concept directly against the lender's historical loan data, then gave a direct read-out on accuracy, edge cases, and what production would take.",
    solutionPoints: [
      { title: "Scoped POC on real data", body: "Built and tested against the lender's actual historical loan applications." },
      { title: "Feasibility read-out", body: "A direct answer on where the model performed and where it didn't." },
      { title: "Path to production", body: "Architected so a green light meant extending the POC, not rebuilding it." },
    ],
    result:
      "The board approved production funding off a working proof of concept in three weeks, and the POC's architecture became the first production build.",
    benefits: [
      { title: "Funded off a working proof", body: "Board sign-off came from a real result, not a slide deck." },
      { title: "No thrown-away work", body: "The POC's code became the start of the production system." },
      { title: "Clear-eyed on limits", body: "The read-out was honest about where the model needed guardrails." },
    ],
    techStack: ["Rapid prototyping", "LLM APIs", "Production-readiness review"],
    statValue: "3 wks",
    statLabel: "from idea to board-approved POC",
    image: "/media/case-fintech.webp",
    dark: false,
  },
  {
    id: "c9",
    slug: "a-copilot-that-drafts-the-answer-before-support-has-to",
    no: "09",
    category: "Copilots",
    industry: "SaaS",
    tag: "09 · SAAS · COPILOT",
    title: "A copilot that drafts the answer before support has to",
    teaser: "An in-product copilot that drafts a reply to the same five questions support was answering all day, tuned to the product's own tone.",
    client: "SaaS · HR software",
    engagementLength: "6 weeks, web app",
    challenge:
      "Support tickets were overwhelmingly the same five questions, but every reply was still typed out by hand in a tone that varied by agent.",
    challengePoints: [
      "The same five questions made up most of the support queue.",
      "Every reply was still typed by hand, in a tone that varied by agent.",
      "Users asked mid-workflow, not in a separate help tab.",
    ],
    approach:
      "We embedded a copilot directly in the product that drafts a reply in the team's tone, pulling from the same answers support already gives, with an agent reviewing before it sends.",
    solutionPoints: [
      { title: "Conversation design", body: "Scripted around the actual five questions, not a generic FAQ bot." },
      { title: "In-product integration", body: "Lives inside the app where the user already is, not a separate widget." },
      { title: "Usage analytics", body: "Visibility into which drafts agents edit, so the copilot keeps improving." },
    ],
    result:
      "First-response time on the top five ticket types dropped by more than half, with agents editing instead of writing from scratch.",
    benefits: [
      { title: "50%+ faster first response", body: "On the ticket types that made up most of the queue." },
      { title: "Consistent tone", body: "Every drafted reply matches the same voice, regardless of which agent sends it." },
      { title: "Agents review, not write", body: "Agents edit a drafted answer instead of typing one from scratch." },
    ],
    techStack: ["Conversational agent frameworks", "Product integrations", "Usage analytics"],
    statValue: "50%+",
    statLabel: "faster first response",
    image: "/media/case-health.webp",
    dark: false,
  },
];

export const caseStudyFilters = ["All", "Cloud & DevOps", "Agentic AI", "Gen AI & RAG", "AI POC / MVP", "Copilots"];

export const clients = [
  { src: "/media/client-abbi.png", alt: "Abbi.ai", height: 48, invert: false },
  { src: "/media/client-dfw.png", alt: "DFW Logics", height: 56, invert: false },
  { src: "/media/client-english3.png", alt: "English3", height: 52, invert: false },
  { src: "/media/client-seagage.png", alt: "Seagage", height: 48, invert: false },
  { src: "/media/client-themagic5.png", alt: "TheMagic5", height: 42, invert: false },
  { src: "/media/client-v5.png", alt: "V5", height: 56, invert: true },
  { src: "/media/logo-revdau.png", alt: "RevDau", height: 46, invert: false },
  { src: "/media/logo-1300.png", alt: "1300 Group", height: 48, invert: false },
  { src: "/media/logo-jac.svg", alt: "JAC", height: 44, invert: false },
];

// The About page shows the same set as a grid. Nine divides evenly into three
// columns, so the grid fills without a ragged last row.
export const aboutClients = clients;

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
};

export const team: TeamMember[] = [
  { name: "Brijesh", role: "Founder & CEO" },
  { name: "Adnan", role: "AI Engineer" },
  { name: "Arsalan", role: "AI Engineer" },
  { name: "Shabareesh", role: "AI Engineer" },
  { name: "Avnish", role: "AI Engineer" },
  { name: "Prerna", role: "Sales" },
  { name: "Shlok", role: "Digital Marketing Specialist" },
];

export type FAQ = {
  question: string;
  answer: string;
  /** Optional follow-through, for answers that have a page behind them. */
  link?: { href: string; label: string };
};

export const faqs: FAQ[] = [
  {
    question: "How is an engagement priced?",
    answer:
      "You start with a one-week, fixed-fee scoping sprint on a single workflow. If you continue, that fee is credited against the build, so you're never paying twice to find out what we'd build.",
  },
  {
    question: "Who owns the code and IP once we ship?",
    answer:
      "You do. 100% of the code, models, and runbooks we hand over are yours, with no ongoing license or lock-in to us.",
  },
  {
    question: "What happens if the scoping sprint says it's not feasible?",
    answer:
      "You keep the read-out either way. If the numbers don't support building it, we'll tell you that directly instead of talking you into a build.",
  },
  {
    question: "How do you handle our data and security?",
    answer:
      "We work inside your existing infrastructure and access controls wherever possible, sign whatever NDA or DPA your legal team requires, and never train shared models on your data.",
    // The Security page is a genuine sales asset and was previously orphaned —
    // nothing on the site linked to it.
    link: { href: "/security", label: "Read our security posture" },
  },
  {
    question: "Why you rather than hiring in-house, or a larger firm?",
    answer:
      "An in-house AI team is the right answer eventually, and we help you hire it — but it is a 6 to 9 month build before anything ships. A larger firm will staff you a pyramid and bill the learning curve. We are a senior pod that ships one workflow in weeks and hands it over, which is the fastest way to find out whether the thing is worth building a team around.",
  },
  {
    question: "Can AWS help fund the first project?",
    answer:
      "Often, yes. We are an AWS Advanced Tier Services Partner and a Well-Architected Partner, which gives us access to AWS funding programmes that can offset part of a proof of concept or migration for eligible workloads. We will tell you in the scoping call whether your project is likely to qualify.",
  },
  {
    question: "Do you work with our existing cloud and tooling?",
    answer:
      "Usually, yes. Most engagements build on the AWS, CI/CD, and data stack you already run rather than asking you to switch. We'll flag it upfront if something doesn't fit.",
  },
  {
    question: "How fast can we actually start?",
    answer:
      "A scoping call is usually available within a few days, and the scoping sprint itself starts the week after that. Most clients see a working thin slice inside a month of that first call.",
  },
];
