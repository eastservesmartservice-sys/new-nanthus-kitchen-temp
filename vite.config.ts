import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";

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
          if (id.includes("node_modules/framer-motion")) return "motion-vendor";
          if (id.includes("@mui/material") || id.includes("@emotion")) return "mui-vendor";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
