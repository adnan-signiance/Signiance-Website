import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schemaTypes } from "./schemaTypes";

// Sanity exposes only SANITY_STUDIO_* variables to the Studio. Copy .env.example
// to .env and fill these in; the project ID is not a secret.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error("SANITY_STUDIO_PROJECT_ID is not set. Copy studio/.env.example to studio/.env and add your project ID.");
}

export default defineConfig({
  name: "default",
  title: "Signiance",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), codeInput(), table()],
  schema: { types: schemaTypes },
});
