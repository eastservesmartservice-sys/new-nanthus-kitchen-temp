/**
 * Pre-build script: converts every JPG in public/optimized/ to WebP.
 * Run via: npm run generate-webp  (called automatically before build)
 *
 * Requires: npm install --save-dev sharp
 */

import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "../public/optimized");

const files = readdirSync(DIR).filter((f) =>
  [".jpg", ".jpeg"].includes(extname(f).toLowerCase())
);

console.log(`Converting ${files.length} images to WebP…`);

await Promise.all(
  files.map(async (file) => {
    const input  = join(DIR, file);
    const output = join(DIR, basename(file, extname(file)) + ".webp");
    if (existsSync(output)) {
      console.log(`  [skip] ${file} (webp already exists)`);
      return;
    }
    await sharp(input).webp({ quality: 82 }).toFile(output);
    console.log(`  [ok]   ${file} → ${basename(output)}`);
  })
);

console.log("WebP generation complete.");
