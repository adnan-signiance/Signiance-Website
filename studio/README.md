# Signiance Studio

The editing screen for **case studies** and the **blog**. It is a
[Sanity](https://www.sanity.io) Studio: a web app, hosted by Sanity at an address like
`signiance.sanity.studio`, that an editor signs into with their own account. No Git, no
code, no developer needed to publish.

```
editor ──publish──▶ Sanity ──webhook──▶ host rebuilds the website ──▶ live in a few minutes
```

The website reads the content when it is built, so it stays fast and fully static. The
trade-off is that a change goes live after a rebuild (a few minutes), not instantly.

Contents: [Editors](#for-editors) · [One-time setup](#one-time-setup-developer) ·
[Import the existing content](#import-the-existing-content) ·
[Connect the website](#connect-the-website) · [Troubleshooting](#troubleshooting)

---

## For editors

Sign in at your Studio address. There are three kinds of content:

| Type | What it is |
| --- | --- |
| **Case study** | One engagement. Appears on the homepage, the Case Studies page and its own page. |
| **Blog post** | An article. Appears on `/blog` and its own page. |
| **Author** | A person a post can be credited to. |

### Publishing a blog post

1. **Blog post → Create.**
2. Fill in the title, then press **Generate** next to *Web address*. Do not change the
   address after the post is published, because anything linking to the old address would
   break.
3. Add a **Summary** (shown on the blog list and in search), a **Cover image**, an
   **Author** and a few **Topics**.
4. Write the article. Headings, lists, links, images, tables, code and YouTube links are
   all in the **+** menu and the toolbar. Give every image a short description for people
   who cannot see it.
5. Press **Publish**. The post is live in a few minutes.

A post that is saved but not published does not appear on the website. To take a post
down, use **Unpublish**.

### Editing a case study

Everything on a case study page is a field here. A few have rules that keep the site
consistent:

- **Practice** must be one of the five practices; it controls the filter chips on the Case
  Studies page and the related work on each service page.
- **Engagement length** must start with a number of weeks, for example *4 weeks, single
  workflow*. The homepage's "median engagement" is worked out from these.
- **Headline number** and *what it measures* go together: both or neither.
- **Position in the list** sets the order and the card number (01, 02, ...).
- **Homepage slot** (1 to 4) puts the study on the homepage grid. Use each slot once.
- **Feature on the Case Studies page** is the big banner at the top. Turn it on for one
  study only.

A case study that is not published is not on the website. Keep one unpublished until
the client has approved it.

### If something looks wrong

The Studio checks fields as you type and will not let you publish a document with a
required field empty. If the website still fails to rebuild, the previous version stays
live and nothing is lost. See [Troubleshooting](#troubleshooting).

---

## One-time setup (developer)

You need Node 22.12 or newer.

### 1. Create the Sanity project

1. Sign up at <https://www.sanity.io> (the free plan is enough to start; check their current
   limits) and create a project. Choose the **production** dataset, left at its default of
   *public*. Published content is public anyway because it is on the website; drafts are
   never exposed.
2. Copy the **project ID** (sanity.io/manage, then your project).

### 2. Run and deploy the Studio

```bash
cd studio
cp .env.example .env        # put the project ID in SANITY_STUDIO_PROJECT_ID
npm install
npm run dev                 # http://localhost:3333, to try it out
npm run deploy              # publishes the Studio at <name>.sanity.studio
```

### 3. Invite the editor

sanity.io/manage, then your project, then **Members**: invite them with the **Editor** role.
They sign in at the Studio address with their own account.

---

## Import the existing content

### Case studies (the nine on the site today)

The seed file `seed/case-studies.json` is a copy of `lib/data.ts`; a test fails if they
drift apart. You need an **Editor** API token (sanity.io/manage, **API**, **Tokens**).

```bash
cd studio
npm run seed -- --dry-run                       # shows what would be written; no token, no network
SANITY_WRITE_TOKEN=... npm run seed             # writes them, images included
```

- Existing documents are left alone, so running it again never undoes an editor's work.
  `--force` overwrites.
- `--draft=slug-a,slug-b` creates those studies **unpublished**, for ones that still need
  client approval before they go live.

### Blog posts (from the WordPress site)

`scripts/import-wordpress.mjs` reads posts from the old site's public REST API, converts
each one (headings, lists, tables, links, images, code and YouTube embeds), and writes a
file Sanity can import. It never writes to Sanity itself; you load the file in a second
step, after looking at it.

```bash
cd studio && npm install
node scripts/import-wordpress.mjs --limit=20      # try the 20 newest first
node scripts/import-wordpress.mjs                 # or everything
```

Other options: `--slugs=a,b`, `--since=2025-01-01`, `--site=https://signiance.com`.

It writes `wordpress-posts.ndjson` and `wordpress-redirects.json`, and prints a report:
posts, authors, images, tables, skipped content, and the links to other pages on the old
site. Then load the posts (Sanity downloads and uploads every image itself; `--missing`
skips anything already there):

```bash
npx sanity dataset import wordpress-posts.ndjson production --missing
```

What to check afterwards, in the Studio:

- **Authors.** WordPress names are copied as they are. One author on the old site is
  called just "S T"; fix names in the Studio, once, and every post updates.
- **Topics** are the old WordPress categories, typos included ("Artifical Intelligence").
  Edit them per post, or search and fix in bulk with a short script.
- **Summaries.** WordPress fills an empty excerpt with the start of the post. The
  importer replaces those with the first real paragraph; hand-written excerpts are kept.
- **Cover images.** The featured image becomes the cover. If the first image in the body
  repeats it, the importer drops the duplicate.
- **Videos.** YouTube embeds become *Watch the video on YouTube* links, so nothing from
  YouTube loads until a reader chooses to watch.
- **Links.** Links between imported posts are rewritten to `/blog/<slug>`. Links to other
  old pages (`/contact/`, `/services/...`) become relative paths and need redirects.

### Redirects from the old addresses

Old posts lived at `signiance.com/<slug>/`; the new ones are at `/blog/<slug>`.
`wordpress-redirects.json` lists every old-to-new pair in the form Next.js accepts
(`source`, `destination`, `permanent`). Those redirects, together with redirects for the
old service and contact pages, must be in place at launch or the old addresses (and
their search rankings) will return "not found". How they are applied depends on where
the site is hosted.

---

## Connect the website

Set these on the host that builds the website (and in `.env.local` to build locally):

| Variable | Value |
| --- | --- |
| `SANITY_PROJECT_ID` | the project ID |
| `SANITY_DATASET` | `production` |

Then make publishing trigger a rebuild. In sanity.io/manage, your project, **API**,
**Webhooks**, create a webhook:

- **URL**: your host's build hook (below)
- **Trigger on**: create, update, delete
- **Filter**: `_type in ["caseStudy", "post", "author"]`
- **Drafts / versions**: leave **off**. With these off the webhook fires when someone
  presses **Publish**, not on every keystroke of a draft.
- **Method**: POST

| Host | Where to get the build hook |
| --- | --- |
| Vercel | Project, Settings, Git, **Deploy Hooks** |
| AWS Amplify | App, Hosting, Build settings, **Incoming webhooks** |
| Anything else | A pipeline that runs `npm ci && npm run build` and deploys the output |

Check it end to end: publish a small change, watch the host start a build, and confirm the
change is live when it finishes.

---

## Troubleshooting

**The website build fails with `[cms] case studies need fixing in Sanity ...` or
`[cms] blog posts need fixing ...`.** A published document has a problem. The message names
the document and the field. Fix it in the Studio and publish again; the build runs again
automatically. The live site keeps its previous version meanwhile.

**`[cms] Sanity returned no published case studies`.** `SANITY_DATASET` is wrong, or
nothing is published yet. The build refuses to publish a site with no case studies.

**`[cms] query failed with status 401/403`.** The dataset is private. Either make it
public, or set `SANITY_READ_TOKEN` (a Viewer token) on the host.

**A published change is not on the site.** The webhook did not fire or the build is still
running. Check the webhook's recent deliveries in sanity.io/manage and the host's build
list. A change that is saved as a draft is not published.

**An image is missing.** In the Studio, check the document has one; case studies require
a cover image. Images load from `cdn.sanity.io`; the site only allows this project's path
on it.

## What is in this folder

```
sanity.config.ts      Studio setup (reads SANITY_STUDIO_PROJECT_ID from .env)
schemaTypes/          caseStudy, post, author: the fields, rules and help text editors see
seed/                 case-studies.json, the one-time import of today's case studies
scripts/              seed.mjs, import-wordpress.mjs, and the helpers behind them
```

The fields in `schemaTypes/` and the parsing in `lib/content/` on the website describe the
same documents, and each rejects what the other would. Change them together. The
five practice names in `schemaTypes/caseStudy.ts` repeat `caseStudyFilters` in `lib/data.ts`.
