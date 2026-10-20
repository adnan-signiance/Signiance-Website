/**
 * One-time import of the case studies that are currently bundled in the website
 * into Sanity, images included.
 *
 *   SANITY_WRITE_TOKEN=... SANITY_STUDIO_PROJECT_ID=... npm run seed
 *
 * Options
 *   --dry-run         print what would be written; needs no token and no network
 *   --draft=a,b       create these slugs as unpublished drafts instead of live
 *   --force           overwrite documents that already exist (default: leave them,
 *                     so re-running never undoes an editor's changes)
 *
 * The token needs Editor access: Sanity dashboard, API, Tokens, Add API token.
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildDocument, documentId } from "./seedDocs.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];

const dryRun = flag("dry-run");
const force = flag("force");
const drafts = new Set((option("draft") ?? "").split(",").map((s) => s.trim()).filter(Boolean));

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!dryRun && (!projectId || !token)) {
  console.error("Set SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN, or pass --dry-run to preview.");
  process.exit(1);
}

const seedPath = new URL("../seed/case-studies.json", import.meta.url);
const { caseStudies } = JSON.parse(readFileSync(seedPath, "utf8"));
const mediaDir = new URL("../../public/media/", import.meta.url);

const unknown = [...drafts].filter((slug) => !caseStudies.some((c) => c.slug === slug));
if (unknown.length) {
  console.error(`--draft names slugs that are not in the seed: ${unknown.join(", ")}`);
  process.exit(1);
}

// Imported only when writing, so --dry-run works before `npm install`.
const client = dryRun
  ? null
  : (await import("@sanity/client")).createClient({ projectId, dataset, token, apiVersion: "2025-02-19", useCdn: false });

let created = 0;
let skipped = 0;

for (const entry of caseStudies) {
  const draft = drafts.has(entry.slug);
  const label = `${draft ? "draft " : "live  "} ${entry.slug}`;

  if (dryRun) {
    console.log(`would write ${label}  (image: ${entry.imageFile})`);
    console.log(JSON.stringify(buildDocument(entry, null, { draft }), null, 2).split("\n").slice(0, 8).join("\n") + "\n  ...");
    continue;
  }

  // Either form existing counts: a published copy, or a draft someone is editing.
  const existing = await client.fetch(`count(*[_id in [$live, $draft]])`, {
    live: documentId(entry.slug),
    draft: documentId(entry.slug, { draft: true }),
  });
  if (existing > 0 && !force) {
    console.log(`skip   ${label} (already exists; use --force to overwrite)`);
    skipped++;
    continue;
  }

  const file = new URL(entry.imageFile, mediaDir);
  if (!existsSync(file)) {
    console.error(`missing image ${fileURLToPath(file)}`);
    process.exit(1);
  }
  const asset = await client.assets.upload("image", createReadStream(file), { filename: entry.imageFile });

  const doc = buildDocument(entry, asset._id, { draft });
  await (force ? client.createOrReplace(doc) : client.createIfNotExists(doc));
  console.log(`wrote  ${label}`);
  created++;
}

if (!dryRun) console.log(`\nDone: ${created} written, ${skipped} skipped. Open the Studio to review.`);
