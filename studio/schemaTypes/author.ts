import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", description: "e.g. Co-founder, Cloud architect." }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Square works best. Shown small beside the post.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
