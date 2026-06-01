import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";

const realtimePackages = [
  "socket.io-client",
  "engine.io-client",
  "socket.io-parser",
  "engine.io-parser",
  "@socket.io/component-emitter",
];

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithms: ["brotliCompress"], exclude: [/\.(br)$/, /\.(gz)$/] }),
    compression({ algorithms: ["gzip"],           exclude: [/\.(br)$/, /\.(gz)$/] }),
  ],
  base: "/",
  build: {
    outDir:     "dist",
    assetsDir:  "assets",
    target:     "es2020",
    minify:     "esbuild",
    cssMinify:  true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (realtimePackages.some((pkg) => id.includes(`node_modules/${pkg}`))) return "realtime-vendor";
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) return "motion-vendor";
          if (id.includes("@mui/") || id.includes("@emotion/")) return "mui-vendor";
          // Keep SEO/helmet library in its own small chunk so it loads fast on first paint
          if (id.includes("node_modules/react-helmet-async") || id.includes("node_modules/helmet")) return "seo-vendor";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
