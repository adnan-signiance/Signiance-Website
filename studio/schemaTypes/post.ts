import { defineArrayMember, defineField, defineType } from "sanity";
import { ComposeIcon } from "@sanity/icons";

/**
 * The article body. Deliberately narrow: only what components/PortableText.tsx on
 * the site can render, so an editor cannot produce something the page would drop.
 */
const body = defineField({
  name: "body",
  title: "Article",
  type: "array",
  validation: (r) => r.required().min(1),
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Small heading", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strikethrough", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Address",
                type: "url",
                description: "A full web address, an email link (mailto:) or a path on this site such as /case-studies.",
                validation: (r) =>
                  r.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }).required(),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Description for screen readers",
          type: "string",
          description: "What the image shows, in a short sentence. Leave empty only for purely decorative images.",
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineArrayMember({ type: "code", title: "Code block" }),
    defineArrayMember({
      type: "object",
      name: "youtube",
      title: "YouTube video",
      fields: [
        defineField({
          name: "url",
          title: "Video address",
          type: "url",
          description: "The video's YouTube address. On the site it appears as a link that opens YouTube, so nothing from YouTube loads until a reader chooses to watch.",
          validation: (r) =>
            r.required().uri({ scheme: ["https"] }).custom((value) =>
              typeof value === "string" && /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(value)
                ? true
                : "Use a youtube.com or youtu.be address."
            ),
        }),
      ],
      preview: { select: { title: "url" }, prepare: ({ title }) => ({ title: title ?? "YouTube video", subtitle: "YouTube video" }) },
    }),
    // From @sanity/table. The first row is shown as the header row on the site.
    defineArrayMember({ type: "table", title: "Table" }),
  ],
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "post", title: "Post", default: true },
    { name: "seo", title: "Search and sharing" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "post", validation: (r) => r.required().max(120) }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "post",
      options: { source: "title", maxLength: 96 },
      description: "The last part of the page address. Do not change it after publishing: the old address would stop working.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "post",
      initialValue: () => new Date().toISOString(),
      description: "Shown on the post and used to order the list. The post goes live when you press Publish, whatever this says.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], group: "post" }),
    defineField({
      name: "categories",
      title: "Topics",
      type: "array",
      group: "post",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "A few short topics, e.g. AWS, DevOps, Generative AI. The first one is shown on the post's card.",
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "post",
      description: "Shown on the blog list and in the RSS feed. Two sentences at most.",
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "post",
      options: { hotspot: true },
      description: "Landscape, at least 1600 pixels wide. Shown above the article and on the list.",
      fields: [
        defineField({
          name: "alt",
          title: "Description for screen readers",
          type: "string",
          description: "What the image shows, in a short sentence.",
        }),
      ],
    }),
    { ...body, group: "post" },
    defineField({
      name: "seoTitle",
      title: "Search title",
      type: "string",
      group: "seo",
      description: "Optional. Used in search results and link previews instead of the title. Around 60 characters.",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Search description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Optional. Used in search results instead of the summary. Around 150 characters.",
      validation: (r) => r.max(170),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", author: "author.name", media: "coverImage" },
    prepare: ({ title, date, author, media }) => ({
      title,
      subtitle: [date ? String(date).slice(0, 10) : "No date", author].filter(Boolean).join(" · "),
      media,
    }),
  },
});
