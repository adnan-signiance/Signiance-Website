import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

// Keep in step with `caseStudyFilters` in lib/data.ts: the site rejects any other value.
const PRACTICES = ["Cloud & DevOps", "Agentic AI", "Gen AI & RAG", "AI POC / MVP", "Copilots"];

const titleAndBody = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string", validation: (r) => r.required().max(60) }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3, validation: (r) => r.required().max(220) }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "card", title: "Card and page header", default: true },
    { name: "story", title: "The story" },
    { name: "results", title: "Results" },
    { name: "placement", title: "Where it appears" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      description: "The headline, e.g. “Making pathology reports easier to understand”.",
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "card",
      options: { source: "title", maxLength: 80 },
      description: "The last part of the page address. Do not change it after the study is published: the old address would stop working.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Practice",
      type: "string",
      group: "card",
      options: { list: PRACTICES, layout: "radio" },
      description: "Which of our five practices this belongs to. It drives the filter chips and the related-work blocks on service pages.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "card",
      description: "One or two words, e.g. Healthcare.",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "tagline",
      title: "Card label",
      type: "string",
      group: "card",
      description: "The small label on the card after its number, e.g. HEALTHCARE or SALES · AI. Capitals are added for you.",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "teaser",
      title: "One-line summary",
      type: "text",
      rows: 3,
      group: "card",
      description: "Shown on the card and under the title. One or two sentences.",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      group: "card",
      options: { hotspot: true },
      description: "Landscape, at least 1600 pixels wide. White text is laid over it, so avoid very bright images.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "story",
      description: "Described by sector, not by name, unless the client has agreed to be named, e.g. “Healthcare · Clinical operations”.",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "engagementLength",
      title: "Engagement length",
      type: "string",
      group: "story",
      description: "Must start with the number of weeks, e.g. “4 weeks, single workflow”. The homepage's median engagement is worked out from these.",
      validation: (r) =>
        r.required().custom((value) =>
          typeof value === "string" && /^\d+\s*weeks?/i.test(value)
            ? true
            : "Start with the number of weeks, e.g. “4 weeks, single workflow”."
        ),
    }),
    defineField({ name: "challenge", title: "The challenge", type: "text", rows: 4, group: "story", validation: (r) => r.required() }),
    defineField({
      name: "challengePoints",
      title: "Challenge: key points",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.max(5),
    }),
    defineField({ name: "approach", title: "Our approach", type: "text", rows: 4, group: "story", validation: (r) => r.required() }),
    defineField({
      name: "solutionPoints",
      title: "Approach: key points",
      type: "array",
      group: "story",
      of: [titleAndBody],
      validation: (r) => r.max(5),
    }),
    defineField({ name: "result", title: "The result", type: "text", rows: 4, group: "results", validation: (r) => r.required() }),
    defineField({
      name: "benefits",
      title: "Result: key points",
      type: "array",
      group: "results",
      of: [titleAndBody],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: "techStack",
      title: "Technology used",
      type: "array",
      group: "results",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "statValue",
      title: "Headline number",
      type: "string",
      group: "results",
      description: "A single figure, e.g. 80% or 12 min. Leave empty if there is no honest single number.",
    }),
    defineField({
      name: "statLabel",
      title: "Headline number: what it measures",
      type: "string",
      group: "results",
      description: "e.g. “faster report review”. Needed whenever there is a headline number.",
      validation: (r) =>
        r.custom((value, context) => {
          const stat = (context.document as { statValue?: string } | undefined)?.statValue;
          const hasStat = Boolean(stat && stat.trim());
          const hasLabel = Boolean(value && String(value).trim());
          if (hasStat && !hasLabel) return "Say what the number measures.";
          if (!hasStat && hasLabel) return "Add the headline number, or clear this.";
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Position in the list",
      type: "number",
      group: "placement",
      description: "1 is first. The card number (01, 02, …) follows this order.",
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: "homeSlot",
      title: "Homepage slot",
      type: "number",
      group: "placement",
      options: { list: [1, 2, 3, 4], layout: "radio" },
      description: "Pick 1 to 4 to show this study on the homepage (1 is the large card at top left). Use each slot once; leave empty to keep it off the homepage.",
    }),
    defineField({
      name: "featured",
      title: "Feature on the Case Studies page",
      type: "boolean",
      group: "placement",
      initialValue: false,
      description: "The large banner at the top of the Case Studies page. Turn this on for one study only.",
    }),
  ],
  orderings: [
    { title: "Position in the list", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", category: "category", industry: "industry", media: "image", order: "order" },
    prepare: ({ title, category, industry, media, order }) => ({
      title,
      subtitle: [order ? `#${order}` : null, category, industry].filter(Boolean).join(" · "),
      media,
    }),
  },
});
