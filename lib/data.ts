export const brand = "Signiance";

export const headline =
  "The team you hire when the AI pilot has to become real work";

export const subhead =
  "We help growing businesses move from cloud infrastructure to production AI without the overhead of a full in house team.";

export const accent = "#193DAA";

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
  techStack: string[];
  image: string;
  bg: string;
};

export const services: Service[] = [
  {
    id: "s1",
    slug: "cloud-architecture-devops",
    no: "01",
    short: "Cloud & DevOps",
    navLabel: "Cloud & DevOps",
    title: "Cloud Architecture & DevOps",
    body: "Resilient, scalable architectures with CI/CD and IaC — ship faster with confidence.",
    long: "Resilient, scalable cloud foundations with CI/CD and infrastructure as code, so every release ships with confidence instead of a war room.",
    bestFor: "Teams whose deploys still depend on one person being online.",
    deliverables: ["Architecture review", "CI/CD & IaC", "On-call runbook"],
    whatIsIt:
      "Cloud Architecture & DevOps is the foundation everything else runs on — resilient infrastructure, automated pipelines, and the on-call discipline that keeps a release from turning into a war room.",
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
    techStack: ["AWS", "Terraform / IaC", "CI/CD pipelines", "Kubernetes & containers", "Observability & monitoring"],
    image: "/media/eng-01.png",
    bg: "#FFFFFF",
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
    bestFor: "Workflows with too many steps and exceptions for a single model call.",
    deliverables: ["Agent orchestration", "Tool & memory integration", "Guardrails & evals"],
    whatIsIt:
      "Agentic AI systems don't just answer — they plan, take actions, call tools, and coordinate with each other to get a multi-step job done end to end, with a human able to step in at the right checkpoints.",
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
    techStack: ["Multi-agent orchestration", "LLM tool-calling", "Vector memory", "Guardrail & eval tooling"],
    image: "/media/eng-02.png",
    bg: "#EEF2FB",
  },
  {
    id: "s3",
    slug: "gen-ai-rag-solutions",
    no: "03",
    short: "Gen AI & RAG",
    navLabel: "Gen AI & RAG Solutions",
    title: "Gen AI & RAG Solutions",
    body: "Production LLM apps — retrieval pipelines, grounding, and evaluations.",
    long: "Production-grade LLM applications — retrieval pipelines, grounding strategies, and the evaluations that keep answers trustworthy at scale.",
    bestFor: "Teams whose answers need to cite something real, every time.",
    deliverables: ["Retrieval pipeline", "Grounding & citations", "Evaluation dashboard"],
    whatIsIt:
      "Retrieval-augmented generation grounds an LLM's answers in your actual documents and data, instead of letting it guess — so what it tells a user is something you can trace back to a source.",
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
    techStack: ["Retrieval-augmented generation", "Vector databases", "LLM evaluation harness", "Embedding pipelines"],
    image: "/media/eng-03.png",
    bg: "#FFFFFF",
  },
  {
    id: "s4",
    slug: "ai-poc-mvp-development",
    no: "04",
    short: "AI POC / MVP",
    navLabel: "AI MVP Development",
    title: "AI POC & MVP Development",
    body: "From idea to a working prototype on real data, in weeks not quarters.",
    long: "From idea to a working prototype on your real data, in weeks not quarters — built to convert into production, not thrown away.",
    bestFor: "A budget owner who needs to see it work before they'll fund it.",
    deliverables: ["Scoped POC on real data", "Feasibility read-out", "Path to production"],
    whatIsIt:
      "A proof of concept answers one question — does this actually work on our data — before anyone commits a production budget. We build it to convert into the real thing, not to be thrown away.",
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
    techStack: ["Rapid prototyping", "LLM APIs", "Cloud sandbox environments", "Production-readiness review"],
    image: "/media/case-fintech.png",
    bg: "#EEF2FB",
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
    bestFor: "Products where support tickets are really the same five questions.",
    deliverables: ["Conversation design", "Product integration & auth", "Usage analytics"],
    whatIsIt:
      "A copilot lives inside your product — answering, drafting, or acting on a user's behalf, tuned to your workflows and tone instead of feeling like a bolted-on chatbot.",
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
    techStack: ["Conversational agent frameworks", "Auth & session management", "CRM / product integrations", "Usage analytics"],
    image: "/media/case-health.png",
    bg: "#FFFFFF",
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
    badgeFg: "#FFFFFF",
    badgeBg: "linear-gradient(90deg, #55585C 0%, #8A8D91 45%, #C7C9CB 78%, #FFFFFF 100%)",
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
    badgeBg: "linear-gradient(90deg, #152F85 0%, #193DAA 45%, #4F6FDB 78%, #FFFFFF 100%)",
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
    badgeFg: "#FFFFFF",
    badgeBg: "linear-gradient(90deg, #2C55C4 0%, #5C81DF 45%, #A9C0F2 78%, #FFFFFF 100%)",
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
  {
    head: "Services",
    items: services.map((sv) => ({ label: sv.navLabel, href: `/services/${sv.slug}` })),
  },
  {
    head: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    head: "Contact",
    items: [
      { label: "Book a call", href: "/#contact" },
      { label: "Email us", href: "mailto:hello@signiance.com" },
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
    photo: "/media/testimonial-bo-haaber.jpg",
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
    photo: "/media/testimonial-bhuvanesh-rajput.jpg",
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
    photo: "/media/testimonial-bryn-nicholls.jpg",
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
    photo: "/media/testimonial-sandip-gupta.jpg",
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
    photo: "/media/testimonial-moises.jpg",
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
    photo: "/media/testimonial-john-atkins.jpg",
    logo: "/media/logo-jac.svg",
    quoteBefore: "Their service is rapid, informed, and incredibly personalized. I highly recommend their services due to their",
    quoteHighlight: "quick response, extensive expertise, and tailored approach",
    quoteAfter: ", ensuring a top-notch experience.",
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
    tag: "01 — HEALTHCARE",
    title: "Making pathology reports easier to understand",
    teaser: "AI-powered analysis that turns complex pathology reports into clearer, structured insights.",
    client: "Healthcare · Clinical operations",
    engagementLength: "4 weeks, single workflow",
    challenge:
      "Pathology reports arrived as dense, inconsistent narrative text, so reviewing one for the next clinical decision often took longer than the diagnosis itself.",
    challengePoints: [
      "Reports arrived as dense, inconsistent narrative text with no standard structure.",
      "Reviewing one report for the next clinical decision often took longer than making the diagnosis itself.",
      "Any fix had to slot into the clinicians' existing tools — no new software to learn.",
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
    tag: "02 — SALES · AI",
    title: "Turning sales calls into actionable coaching",
    teaser: "An AI sales agent that scores rep performance, identifies what went wrong, and recommends ways to improve.",
    client: "Sales · Revenue operations",
    engagementLength: "6 weeks, one team",
    challenge:
      "Managers could only sit in on a handful of calls a week, so most coaching happened days later, from memory, on the calls someone happened to catch.",
    challengePoints: [
      "Managers could only sit in on a handful of calls a week.",
      "Most coaching happened days later, from memory, on whichever calls someone happened to catch.",
      "Reps got feedback at the next weekly review — long after the call that needed it.",
    ],
    approach:
      "We shipped an agent that listens to every call, scores it against the team's own playbook, and surfaces what went wrong with a timestamped clip — same day, not next review.",
    solutionPoints: [
      { title: "Listens to every call", body: "An agent processes 100% of calls, not a manager-sampled handful." },
      { title: "Scores against your playbook", body: "Each call is scored against the team's own playbook, not a generic rubric." },
      { title: "Same-day, timestamped feedback", body: "Surfaces what went wrong with a timestamped clip, ready the same day." },
    ],
    result:
      "10K+ calls analyzed and counting, with coaching notes ready before the rep's next call instead of during a weekly review.",
    benefits: [
      { title: "10K+ calls analyzed", body: "And counting — every call, not a sample." },
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
    tag: "03 — FOOD · AI",
    title: "A conversational AI agent built to scale",
    teaser: "Secure, production-ready AI deployed across web and mobile, with authentication, scaling, and observability built in.",
    client: "Food & Beverage · Customer support",
    engagementLength: "8 weeks, web + mobile",
    challenge:
      "Their support agent worked in a demo, but had none of the authentication, scaling or monitoring a security review — or a real launch — would require.",
    challengePoints: [
      "The support agent worked in a demo, but wasn't built for production.",
      "No authentication, scaling, or monitoring — the basics a security review would require.",
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
    tag: "04 — ENGINEERING · CLOUD",
    title: "Scaling engineering simulations with cloud HPC",
    teaser: "A high-performance AWS environment built for CPU-intensive CFD and GPU-accelerated DEM simulations.",
    client: "Engineering · Industrial simulation",
    engagementLength: "5 weeks, infra rebuild",
    challenge:
      "Their simulation queue was bottlenecked on fixed on-prem hardware — CFD and DEM runs that should take hours were taking days waiting for a slot.",
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
    image: "/media/case-engineering.jpg",
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
];

// About page's logo grid uses every client logo we have (row above plus a
// few more), kept to a multiple of 3 so the grid fills evenly.
export const aboutClients = [
  ...clients,
  { src: "/media/logo-revdau.png", alt: "RevDau", height: 46, invert: false },
  { src: "/media/logo-1300.png", alt: "1300 Group", height: 48, invert: false },
  { src: "/media/logo-jac.svg", alt: "JAC", height: 44, invert: false },
];
