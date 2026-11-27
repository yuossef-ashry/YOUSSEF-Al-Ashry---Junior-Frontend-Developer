import { defineField, defineType } from "sanity";

// An entry in "Experience & milestones": training, certificate, achievement.
export const milestone = defineType({
  name: "milestone",
  title: "Certificate / milestone",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "where", title: "Issuer / place", description: "Example: Meta · via Coursera", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "year", title: "Year (or NOW)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Small label above the title", description: "Example: CERTIFICATE · SEPTEMBER 26, 2025", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "outcome", title: "Outcome line", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "certificateImage", title: "Certificate image", type: "image" }),
    defineField({ name: "href", title: "Verification link", type: "url" }),
    defineField({ name: "order", title: "Order", description: "Smaller number shows first (top).", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "where", media: "certificateImage" } },
});
