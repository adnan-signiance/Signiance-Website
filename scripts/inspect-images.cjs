const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join("public", "media");

(async () => {
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));
  const rows = [];
  for (const f of files) {
    const p = path.join(dir, f);
    const { size } = fs.statSync(p);
    try {
      const m = await sharp(p).metadata();
      rows.push({ f, kb: Math.round(size / 1024), w: m.width, h: m.height, fmt: m.format });
    } catch {
      rows.push({ f, kb: Math.round(size / 1024), w: "?", h: "?", fmt: "err" });
    }
  }
  rows.sort((a, b) => b.kb - a.kb);
  for (const r of rows) {
    console.log(
      String(r.kb).padStart(6) +
        " KB  " +
        String(r.w).padStart(5) +
        "x" +
        String(r.h).padEnd(6) +
        String(r.fmt).padEnd(6) +
        r.f
    );
  }
})();
