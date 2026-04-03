# GitHub Copilot Instructions — Yonkoma

## What this project is

Yonkoma is a day-chunking app for an 11-year-old, built around a manga panel metaphor.

- **Full product spec**: `specs/original_specs.md`
- **User stories (JIRA-style)**: `specs/user-stories/` — one file per epic

Read those files first when working on any feature. Do not re-derive product rules from memory.

---

## Tech stack

- **Framework**: Next.js 14 (App Router) — file-based routing under `app/`
- **Styling**: Tailwind CSS — colour tokens already defined in `tailwind.config.ts`
- **Language**: TypeScript — strict, no `any` in data-layer code
- **Fonts**: Bangers (display) + DM Sans (body) — loaded via `next/font/google` in `app/layout.tsx`
- **Persistence**: `localStorage` only — custom `useLocalStorage` hook in `hooks/useLocalStorage.ts`
- **No backend. No auth. No external APIs.**

---

## Where things live

```
app/
  page.tsx              # Today view (/) — auto-detects Plan / Active / Reflect state
  plan/page.tsx         # Plan mode
  reflect/page.tsx      # Reflect mode
  history/page.tsx      # History + streaks
  layout.tsx            # Root layout, fonts, global styles
  globals.css           # Tailwind directives + CSS animations

components/
  PanelCard.tsx         # Individual manga panel card
  MangaPage.tsx         # Full-day panel grid layout
  TaskList.tsx          # Checklist within a panel
  MoodPicker.tsx        # Chibi SVG mood face selector
  StreakBar.tsx         # Streak power-bar display
  ChapterSummary.tsx    # End-of-day summary screen
  MilestoneFlash.tsx    # Full-screen streak milestone overlay

hooks/
  useLocalStorage.ts    # Generic SSR-safe localStorage hook
  useToday.ts           # Today's Day record + all mutations
  useStreaks.ts         # Streak read/update logic

lib/
  types.ts              # All TypeScript types (Day, Panel, Task, Meta, DayType)
  templates.ts          # School Day + Home Day panel templates
  copy.ts               # All UI copy strings — never hardcode inline
  utils.ts              # Date helpers (todayISO, isSameDay, formatDisplayDate, generateId)

specs/
  original_specs.md     # Full product specification
  user-stories/         # JIRA-style stories per epic
```

New components go in `components/`. New hooks go in `hooks/`. New shared logic goes in `lib/`.

---

## How to work on this project

- **Product rules** (panel limits, templates, streak logic, copy tone): read `specs/original_specs.md`
- **Feature scope per story**: read the relevant file in `specs/user-stories/`
- **Data shapes**: read `lib/types.ts` — do not redefine types inline
- **Copy strings**: use `COPY` from `lib/copy.ts` — never hardcode UI strings
- **Day templates**: use `templateToPanels()` from `lib/templates.ts` — never hardcode panel arrays in components
- **All mutations to today's data**: go through `useToday` — do not write to localStorage directly
- **All streak updates**: go through `useStreaks` — do not write to `yonkoma-meta` directly

---

## Coding conventions

- All page and component files that use React hooks or browser APIs must start with `"use client"`
- Handle SSR with a `mounted` state guard before reading from `useLocalStorage`
- CSS animations live in `app/globals.css` and must respect `prefers-reduced-motion`
- Tailwind colour tokens (`bg-background`, `bg-surface`, `text-accent`, etc.) are defined — use them, don't use raw hex values inline
- Font classes: `.font-display` for headings, `.font-body` for body text
- New `localStorage` keys must be documented in `lib/types.ts` as a comment

---

## Running the project

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build + type check
npm run lint    # ESLint
```

