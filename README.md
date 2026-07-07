# Brew & Bloom

A single-page marketing website for a specialty coffee roastery, built as a
static **Vite + React + TypeScript** app styled with **Tailwind CSS v4** and
animated with **GSAP** and **Lenis**.

The project builds to plain static assets in `dist/`, so it can be hosted on
any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 +
CloudFront, nginx, etc.). There is no server runtime, no SSR, and no
build-time framework lock-in.

## Requirements

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- Any package manager: npm, pnpm, yarn, or bun

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:8080)
npm run dev

# type-check + build for production into dist/
npm run build

# preview the production build locally
npm run preview
```

Other scripts:

```bash
npm run lint      # run ESLint
npm run format    # format with Prettier
```

## Project structure

```
index.html            App entry HTML (meta tags, fonts, root element)
src/
  main.tsx            React entry — mounts <App /> into #root
  App.tsx             Page composition (sections + sticky CTA)
  styles.css          Tailwind v4 theme + global styles
  components/         Page sections (Hero, Story, Menu, Visit, ...)
  components/ui/      Reusable shadcn/ui primitives
  hooks/              useLenis (smooth scroll), useGsapContext
  lib/                gsap setup + cn() class helper
public/               Static assets served as-is (favicon, _redirects)
```

## Deployment

The production build is fully static. Build command: `npm run build`.
Publish/output directory: `dist`.

### Netlify

Configured via `netlify.toml`. Connect the repo and deploy — the SPA
fallback redirect is already set. Or deploy manually:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Vercel

Configured via `vercel.json` (framework preset `vite`). Import the repo in
Vercel, or run:

```bash
npm run build
npx vercel --prod
```

### Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`

### GitHub Pages

Build and publish `dist/` (e.g. via GitHub Actions or `gh-pages`). If the site
is served from a subpath (`https://user.github.io/repo/`), set Vite's base:

```bash
# build with a base path
npx vite build --base=/repo/
```

The `public/_redirects` file provides an SPA fallback for hosts that honor it
(Netlify, Cloudflare Pages).
