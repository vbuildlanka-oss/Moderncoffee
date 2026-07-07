import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain Vite + React SPA. Builds to static assets in `dist/`,
// deployable to any static host (Netlify, Vercel, Cloudflare Pages,
// GitHub Pages, S3, etc.).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Resolve the "@/*" alias from tsconfig.json paths (native in Vite 8+).
    tsconfigPaths: true,
  },
  server: {
    host: true,
    port: 8080,
  },
  preview: {
    host: true,
    port: 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
