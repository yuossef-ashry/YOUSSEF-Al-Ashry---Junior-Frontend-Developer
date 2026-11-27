import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Youssef Portfolio",
  projectId: "yre6gmbc",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
