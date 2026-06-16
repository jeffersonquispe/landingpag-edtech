# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server at http://localhost:3000 (with Turbopack)
npm run build     # Production build (with Turbopack)
npm start         # Start production server
npm run lint      # Run ESLint
```

## Architecture

This is a **Next.js 15 App Router** landing page for "Net Academy" — a Spanish-language AI education platform featuring a mascot called "Nano Banana."

**Single-page layout** — the entire site lives in `src/app/page.tsx` as a client component (`"use client"`). All navigation links are anchor links (`#cursos`, `#planes`, `#beneficios`, `#contacto`) that scroll within this single page.

**Component structure** (`src/components/`):
- `Header.tsx` — sticky navbar with scroll-aware background, mobile hamburger menu
- `Footer.tsx` — site footer
- `CourseCard.tsx` — reusable card for course listings
- `PricingCard.tsx` — reusable card for pricing tiers (supports `isPopular` highlight)
- `CoursesCarousel.tsx` — carousel component for displaying course cards with touch/keyboard navigation

**Styling approach:**
- Tailwind CSS v4 (configured via `@import "tailwindcss"` in `globals.css`, no `tailwind.config.js`)
- CSS theme tokens defined in `globals.css` under `@theme inline`: `--color-primary` (#6366f1), `--color-secondary` (#06b6d4), `--color-accent` (#8b5cf6)
- Neon color palette used inline: `#00ffff` (cyan), `#ff007f` (magenta), `#39ff14` (green) — these are hardcoded in JSX, not in the theme
- Custom utilities: `.glass-panel` (glassmorphism), `.glow-bg`, `.animate-float`, `.animate-pulse-slow`
- Fonts: `Plus_Jakarta_Sans` (body) and `Geist_Mono` (code), loaded via `next/font/google` in `layout.tsx`

**No backend** — the email subscription form in the CTA section is client-side only (sets `submitted` state, no API call).
