# CLAUDE.md — Omega Digital Website

This file documents the codebase structure, conventions, and development workflows for AI assistants working on this project.

---

## Project Overview

**Omega Digital** is a single-page React portfolio website for a creative web design and development studio. It features a dark-themed, neon-accented aesthetic with a multi-section layout showcasing services, work, and contact information.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^19.2.0 |
| Language | TypeScript | ~5.9.3 |
| Build Tool | Vite | ^7.2.4 |
| Styling | Tailwind CSS | ^3.4.19 |
| Icons | Lucide React | ^0.562.0 |
| Linting | ESLint | ^9.39.1 |
| Testing | None configured | — |

---

## Commands

```bash
npm run dev       # Start local development server (Vite HMR)
npm run build     # Type-check (tsc -b) then production bundle
npm run lint      # Run ESLint across the entire codebase
npm run preview   # Serve the production build locally
```

There is no test runner configured. Do not add test scripts unless explicitly asked.

---

## Repository Structure

```
omega-website/
├── public/                    # Static assets (served as-is)
│   ├── assets/images/         # Portfolio and UI images
│   ├── hero-bg-poster.jpg     # Hero video fallback poster
│   ├── hero-logo-circle.png   # Circular logo variant
│   ├── hero-logo.jpg          # Primary logo
│   ├── logo-circular.png      # Brand logo (circular)
│   ├── omega-background.mp4   # Hero background video
│   └── project-1.jpg … project-4.jpg  # Portfolio thumbnails
│
├── src/
│   ├── sections/              # One file per page section (see below)
│   │   ├── Navigation.tsx     # Sticky nav with scroll-based state
│   │   ├── Hero.tsx           # Landing section (video bg, CTA)
│   │   ├── Introduction.tsx   # About / studio intro
│   │   ├── Services.tsx       # Expandable service cards
│   │   ├── Process.tsx        # Workflow/process visualization
│   │   ├── SelectedWorks.tsx  # Portfolio showcase
│   │   ├── Testimonials.tsx   # Client testimonials
│   │   ├── Contact.tsx        # Contact form
│   │   └── Footer.tsx         # Footer links and info
│   ├── App.tsx                # Root component — SplashScreen + section ordering
│   ├── main.tsx               # React DOM entry point
│   ├── index.css              # Global styles, Tailwind directives, custom animations
│   └── vite-env.d.ts          # Vite client type shims
│
├── index.html                 # HTML shell — mounts #root
├── vite.config.ts             # Vite config (React plugin, @ alias, relative base)
├── tailwind.config.js         # Tailwind theme extensions (colors, shadows, keyframes)
├── tsconfig.json              # TypeScript compiler options (strict mode)
├── postcss.config.js          # PostCSS: Tailwind + autoprefixer
├── eslint.config.js           # ESLint flat config (TS + React hooks)
└── package.json               # Scripts and dependencies
```

---

## Architecture

### Single-Page Application

The site is a single HTML page. All sections are rendered sequentially inside `App.tsx`:

```
SplashScreen (unmounts after ~4s)
└── Navigation (fixed, receives scrollY prop)
└── main
    ├── Hero
    ├── Introduction
    ├── Services
    ├── Process
    ├── Testimonials
    └── Contact
└── Footer
```

`App.tsx` owns:
- `scrollY` state (passed to `Navigation` for scroll-aware styling)
- `splashDone` state (controls `SplashScreen` lifecycle and body scroll lock)

### Section Components

Each section is a self-contained React component in `src/sections/`. They manage their own local state and animations. There is no shared state management library (no Redux, no Context); props are used only where necessary.

### Path Alias

Use `@/` to import from `src/`:

```ts
import Navigation from '@/sections/Navigation';
```

---

## Styling Conventions

### Tailwind-first

All styling uses Tailwind utility classes. Avoid inline `style` props except for dynamic values that cannot be expressed as Tailwind classes (e.g., progress bar width driven by JS state).

### Custom Design Tokens (tailwind.config.js)

**Brand colors:**
```
neon.yellow  → #F1FE42   (primary accent — neon yellow)
neon.cyan    → #00BFFF   (secondary accent — cyan glow)
neon.blue    → #00FFFF
neon.purple  → #8A2BE2
omega.black  → #000000
omega.dark   → #111111
omega.gray   → #1a1a1a
omega.light  → #F2F2F2
omega.muted  → #CCCCCC
```

**Custom shadows:**
```
shadow-neon     → Yellow neon glow (subtle)
shadow-neon-lg  → Yellow neon glow (strong)
shadow-glow     → Cyan glow
```

**Custom animations (use via Tailwind class):**
```
animate-float         → Vertical float loop (6s)
animate-pulse-glow    → Opacity pulse (2s)
animate-rotate-slow   → Full rotation (20s)
animate-shimmer       → Shimmer sweep (2s)
```

### Global CSS (src/index.css)

Custom utility classes and keyframes not expressible in `tailwind.config.js` live here. The `.text-gradient` class is defined here and applies the neon yellow→cyan gradient to text. The `.grain-overlay` pseudo-element provides the film grain texture over the entire page.

### Font

Primary typeface is **Bai Jamjuree** (loaded via Google Fonts in `index.html`). Tailwind's `font-sans` is remapped to this font.

---

## TypeScript Conventions

The TypeScript configuration (`tsconfig.json`) is strict. All rules below are enforced at build time:

- `strict: true` — enables all strict type checks
- `noUnusedLocals: true` — no unused local variables
- `noUnusedParameters: true` — no unused function parameters
- `noFallthroughCasesInSwitch: true`
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no experimental decorators or `const enum`

**Always** use `import type` when importing types only:
```ts
import type { FC } from 'react';
```

---

## Component Conventions

- All components are **React functional components** with hooks.
- Export components as **default exports** (one component per file).
- Component files are in `src/sections/` and named with **PascalCase**.
- No class components.
- Animation/transition effects are handled with CSS (Tailwind + custom keyframes) and conditional class application rather than animation libraries.

---

## Key Patterns

### Scroll-Aware Navigation

`App.tsx` tracks `window.scrollY` via a passive scroll listener and passes it as a prop to `Navigation`. The nav uses this to toggle background opacity/blur when the user scrolls past the hero.

### Splash Screen

`App.tsx` renders `SplashScreen` before the main content. The splash progresses through phases: `loading → name → fadeout → done`. On `done`, `splashDone` is set to `true`, which removes the splash and re-enables body scrolling.

### Static Assets

Images and video in `public/` are referenced with root-relative paths (e.g., `/omega-background.mp4`, `/project-1.jpg`). Vite serves `public/` directly at the root during dev and copies it verbatim on build.

---

## What Does Not Exist (Do Not Add Without Being Asked)

- **No test framework** — do not configure Vitest, Jest, or any testing library unless explicitly requested.
- **No state management library** — no Redux, Zustand, or React Context across sections.
- **No routing** — no React Router; this is a single scrollable page.
- **No backend / API** — purely static frontend.
- **No environment variables** — no `.env` files needed; all config is static.
- **No CI/CD configuration** — no GitHub Actions, Netlify config, etc.

---

## Development Workflow

1. **Install dependencies:** `npm install`
2. **Start dev server:** `npm run dev` — runs on `http://localhost:5173` by default
3. **Lint before committing:** `npm run lint`
4. **Build to verify:** `npm run build` — this type-checks AND bundles; fix all TS errors before considering work complete
5. **Preview production build:** `npm run preview`

The build command (`tsc -b && vite build`) will fail if there are any TypeScript errors. Always verify the build passes after making changes.

---

## Git

- **Main branch:** `master`
- **Remote:** `origin`
- Claude AI development branches follow the pattern: `claude/<task-id>`
- Commit messages should be descriptive and scoped (e.g., `Update Services.tsx: add hover animation to cards`)
