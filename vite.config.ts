import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain Vite + React SPA. Builds to static assets in `dist/`,
// deployable to any static host (Netlify, Vercel, Cloudflare Pages,
// GitHub Pages, S3, etc.).
//
// `base` defaults to "/" (Netlify, Vercel, Cloudflare, custom domains).
// For GitHub Pages project sites the app is served from a subpath
// (https://<user>.github.io/<repo>/), so the deploy workflow sets
// BASE_PATH="/Moderncoffee/" to prefix all asset URLs correctly.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
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
