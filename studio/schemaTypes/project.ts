import { defineField, defineType } from "sanity";

// A project card in the "Selected work" section of the portfolio.
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Web application", value: "app" },
          { title: "Website", value: "website" },
        ],
        layout: "radio",
      },
      initialValue: "app",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", title: "Short category line", description: "Example: E-commerce web app", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "image", title: "Screenshot", type: "image", options: { hotspot: false } }),
    defineField({ name: "tags", title: "Technologies / labels", description: "One per line, e.g. React, Next.js", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "liveUrl", title: "Live link", type: "url" }),
    defineField({ name: "sourceUrl", title: "GitHub link", type: "url" }),
    defineField({ name: "previewTitle", title: "Fallback headline (optional)", description: "Shown only if the screenshot cannot load.", type: "string" }),
    defineField({ name: "previewRows", title: "Fallback bullet points (optional)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Order", description: "Smaller number shows first.", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
