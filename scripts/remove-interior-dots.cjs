/**
 * Removes the interior grid-crossing dots.
 *
 * The corner-dot motif is the site's signature, but it was applied to every grid
 * cell intersection as well as every section corner — over 100 marks on a full
 * journey, which turned a signature into wallpaper. It also notched the hairline
 * rails at every crossing. Section corners keep their dots; interior crossings
 * lose them.
 *
 * This also removes a ResizeObserver per grid, since the measurement existed only
 * to place these dots.
 *
 * Run with: node scripts/remove-interior-dots.cjs
 */
const fs = require("fs");
const path = require("path");

const files = fs
  .readdirSync("components")
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => path.join("components", f))
  .filter((f) => !f.endsWith("useGridIntersectionDots.tsx"));

let changed = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const lines = original.split(/\r?\n/);

  const kept = lines.filter((line) => {
    if (line.includes("GridDotsOverlay")) return false;
    if (/const\s+\w+\s*=\s*useGridIntersectionDots\(/.test(line)) return false;
    return true;
  });

  let out = kept.join("\n");
  // Collapse the blank line a removed hook call may leave behind.
  out = out.replace(/\n{3,}/g, "\n\n");

  if (out !== original) {
    fs.writeFileSync(file, out, { encoding: "utf8" });
    changed += 1;
    console.log("  " + file);
  }
}

console.log("");
console.log("updated " + changed + " components");

const hookFile = path.join("components", "useGridIntersectionDots.tsx");
if (fs.existsSync(hookFile)) {
  fs.unlinkSync(hookFile);
  console.log("deleted " + hookFile);
}
