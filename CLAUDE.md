# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Macy, a Bernese Mountain Dog. Single-page React app with an Express backend for the contact form (sends email via Resend).

## Commands

- `npm run dev` — starts both Vite (port 3000) and Express API (port 3001) concurrently
- `npm run dev:vite` — Vite frontend only
- `npm run dev:api` — Express API only
- `npm run build` — production build via Vite
- `npm run lint` — type-check with `tsc --noEmit`

## Architecture

**Frontend:** React 19 + Vite + Tailwind CSS v4. The entire UI lives in `src/App.tsx` as a set of section components (Navbar, Hero, About, GrowthBanner, Gallery, Testimonial, Footer). Animations use `motion/react` (Motion library). Icons from `lucide-react`.

**Backend:** `server/index.ts` — Express server with two endpoints:
- `GET /api/health` — health check
- `POST /api/contact` — sends email via Resend SDK

Vite dev server proxies `/api` requests to the Express backend (configured in `vite.config.ts`).

**Styling:** Tailwind v4 with custom theme tokens defined in `src/index.css` using `@theme`. Custom colors are prefixed `macy-` (e.g., `macy-black`, `macy-rust`, `macy-cream`). Fonts: Inter (sans), Playfair Display (serif), JetBrains Mono (mono).

## Environment Variables

Copy `.env.example` to `.env.local`. Key variables:
- `GEMINI_API_KEY` — injected into frontend via Vite's `define` in `vite.config.ts`
- `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL` — used by the Express contact endpoint
- `API_PORT` — Express server port (default 3001)

## Path Alias

`@/*` maps to the project root (configured in both `tsconfig.json` and `vite.config.ts`).
