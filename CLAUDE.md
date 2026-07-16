# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js version

This project runs **Next.js 16** with **React 19**. As AGENTS.md warns, this is not the Next.js in your training data — APIs, conventions, and file structure may differ. Before writing framework code, read the relevant guide under `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) and heed deprecation notices.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`).

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (flat config, `eslint.config.mjs`)

There is no test runner configured yet.

## Architecture

App Router project (`app/`) with a shadcn/ui design system layered on Tailwind CSS v4.

- **UI components** live in `components/ui/` and are built on **Base UI** (`@base-ui/react`), not Radix. Components use `class-variance-authority` (`cva`) for variants and the `cn` helper from `lib/utils.ts` (clsx + tailwind-merge) for class composition. Add new components via the shadcn CLI configured by `components.json` (style `base-luma`, base color `zinc`, icons from `lucide-react`, RSC enabled).
- **Path aliases** (`tsconfig.json`, `components.json`): `@/*` maps to the repo root — `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.
- **Styling** is Tailwind v4, configured entirely in CSS — there is no `tailwind.config`. `app/globals.css` imports Tailwind, `tw-animate-css`, and `shadcn/tailwind.css`, then defines the theme via `@theme inline` and CSS custom properties. Design tokens are **oklch** color variables with light defaults under `:root` and dark overrides under `.dark` (dark mode via the `.dark` class, not media query). Radius scale derives from a single `--radius`. When adding tokens, define the CSS variable and expose it in the `@theme inline` block.
- **Fonts** are wired in `app/layout.tsx` via `next/font/google` (Geist, Geist Mono, Inter) as CSS variables composed with `cn`.
