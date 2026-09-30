/**
 * One-off re-encode of the oversized source images in public/media.
 *
 * Two separate problems are being fixed:
 *
 *  1. hero-portal.png is 2752x1536 — far larger than it is ever displayed, and
 *     6 MB. It is resized as well as re-encoded.
 *  2. The eight 960x540 "slide" PNGs are ~1 MB each purely because PNG is the
 *     wrong container for photographic gradients. They keep their dimensions
 *     and only change format.
 *
 * Logos, testimonial avatars and og-image.png are deliberately untouched: they
 * are already small, and og-image must stay PNG because social scrapers have
 * patchy WebP support.
 *
 * Run with: node scripts/reencode-images.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join("public", "media");

const jobs = [
  { file: "hero-portal.png", maxWidth: 1920, quality: 80 },
  { file: "eng-01.png", quality: 82 },
  { file: "eng-02.png", quality: 82 },
  { file: "eng-03.png", quality: 82 },
  { file: "light-01.png", quality: 82 },
  { file: "light-02.png", quality: 82 },
  { file: "light-03.png", quality: 82 },
  { file: "case-health.png", quality: 82 },
  { file: "case-fintech.png", quality: 82 },
  { file: "case-engineering.jpg", quality: 82 },
];

(async () => {
  let before = 0;
  let after = 0;

  for (const job of jobs) {
    const src = path.join(dir, job.file);
    if (!fs.existsSync(src)) {
      console.log("skip (missing): " + job.file);
      continue;
    }

    const out = path.join(dir, job.file.replace(/\.(png|jpe?g)$/i, ".webp"));
    const srcSize = fs.statSync(src).size;

    let pipeline = sharp(src);
    if (job.maxWidth) {
      const meta = await pipeline.metadata();
      if (meta.width && meta.width > job.maxWidth) {
        pipeline = pipeline.resize({ width: job.maxWidth, withoutEnlargement: true });
      }
    }

    await pipeline.webp({ quality: job.quality, effort: 6 }).toFile(out);

    const outSize = fs.statSync(out).size;
    before += srcSize;
    after += outSize;

    const pct = Math.round((1 - outSize / srcSize) * 100);
    console.log(
      job.file.padEnd(24) +
        String(Math.round(srcSize / 1024)).padStart(6) +
        " KB -> " +
        String(Math.round(outSize / 1024)).padStart(5) +
        " KB  (-" +
        pct +
        "%)"
    );

    fs.unlinkSync(src);
  }

  console.log("");
  console.log(
    "total: " +
      (before / 1024 / 1024).toFixed(2) +
      " MB -> " +
      (after / 1024 / 1024).toFixed(2) +
      " MB  (saved " +
      ((before - after) / 1024 / 1024).toFixed(2) +
      " MB)"
  );
})();
