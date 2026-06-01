/**
 * Post-build prerender script.
 *
 * Starts a local static server over dist/, visits each route with a headless
 * Chromium browser, waits for React to hydrate, then saves the rendered HTML
 * to dist/<route>/index.html.
 *
 * Nginx's `try_files $uri $uri/ /index.html` directive then serves these
 * static files directly to crawlers — no JS execution required for bots.
 * Regular users still get full SPA hydration after the HTML loads.
 *
 * Usage (standalone): npm run prerender
 * Called automatically by:  npm run build  (after vite build completes)
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

// Use a port that doesn't conflict with the Vite dev server (5173) or the
// NestJS backend (5000). 4175 is arbitrary and almost never in use.
const PORT = 4175;
const BASE = `http://localhost:${PORT}`;

const ROUTES = [
  "/",
  "/menu",
  "/specials",
  "/order",
  "/catering",
  "/contact",
  "/gallery",
];

// ─── Minimal static file server ──────────────────────────────────────────────

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".webp": "image/webp",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff2":"font/woff2",
  ".br":   "application/x-brotli",
  ".gz":   "application/gzip",
};

function serveStatic(req, res) {
  let urlPath = req.url.split("?")[0];

  // Strip trailing slash except root
  if (urlPath !== "/" && urlPath.endsWith("/")) urlPath = urlPath.slice(0, -1);

  // Try exact file match first
  let filePath = path.join(DIST, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  // Try with .html extension
  if (fs.existsSync(filePath + ".html")) {
    return sendFile(res, filePath + ".html");
  }

  // SPA fallback — let React Router handle the route
  return sendFile(res, path.join(DIST, "index.html"));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const mime = MIME[ext] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": mime });
  fs.createReadStream(filePath).pipe(res);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error("❌  dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  // Check port availability before launching
  await new Promise((resolve, reject) => {
    const probe = http.createServer();
    probe.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        reject(new Error(`Port ${PORT} is already in use. Kill the process using it and retry.`));
      } else {
        reject(err);
      }
    });
    probe.once("listening", () => { probe.close(resolve); });
    probe.listen(PORT);
  });

  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
  console.log(`🌐  Static server ready at ${BASE}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // Required on Ubuntu/Debian servers (low /dev/shm allocation)
      "--disable-dev-shm-usage",
      // Headless servers don't have a GPU
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
    ],
  });

  try {
    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      console.log(`⏳  Rendering ${route} …`);

      const page = await browser.newPage();

      // Block external requests during prerender so the script runs fast and
      // deterministically regardless of network or backend availability.
      // We only need the local JS/CSS assets — API data is a bonus if available.
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const reqUrl = req.url();
        const isLocal = reqUrl.startsWith(BASE);
        const isDataUrl = reqUrl.startsWith("data:");
        if (isLocal || isDataUrl) {
          req.continue();
        } else {
          // Block fonts (Google Fonts CDN), external images, analytics, etc.
          req.abort();
        }
      });

      page.on("console", () => {});
      page.on("pageerror", () => {});

      // Use "load" — not "networkidle2" — because Socket.IO keeps connections
      // alive indefinitely, which prevents networkidle2 from ever firing.
      await page.goto(url, { waitUntil: "load", timeout: 30_000 });

      // Wait until React has hydrated at least one child inside <main>
      await page
        .waitForFunction(
          () => {
            const main = document.getElementById("main-content");
            return main != null && main.children.length > 0;
          },
          { timeout: 10_000 },
        )
        .catch(() => {
          // Shell HTML with correct <head> SEO tags is still useful even if
          // the page body didn't fully hydrate (e.g. backend not running).
          console.warn(`  ⚠️  Hydration wait timed out for ${route} — saving shell HTML`);
        });

      // Give react-helmet-async one tick to flush its <head> updates
      await new Promise((r) => setTimeout(r, 200));

      const html = await page.content();
      await page.close();

      // Write to dist/<route>/index.html
      // For "/" write to dist/index.html (already exists, we overwrite it)
      // For "/menu" write to dist/menu/index.html (nginx serves via $uri/)
      const outDir =
        route === "/" ? DIST : path.join(DIST, route.slice(1));
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, "index.html");
      fs.writeFileSync(outFile, html, "utf-8");

      console.log(`  ✅  Saved → ${path.relative(process.cwd(), outFile)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log("\n🎉  Prerendering complete.");
}

main().catch((err) => {
  console.error("❌  Prerender failed:", err.message ?? err);
  process.exit(1);
});
