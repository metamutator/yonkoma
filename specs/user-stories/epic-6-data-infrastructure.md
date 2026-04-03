# Epic YONKO-E6 — Data & Infrastructure

> As a developer, I want a solid data layer and deployment pipeline so that the app is reliable, fast, and easy to ship.

**Label:** `epic:data-infrastructure`

---

## YONKO-032 — Persist day data to localStorage

**As a** child user,
**I want to** have my plan, tasks, and moods saved automatically,
**so that** closing or refreshing the app never loses my work.

### Acceptance Criteria
- [ ] All day data is stored under the key `yonkoma-days` in `localStorage` as a JSON array of `Day` objects
- [ ] Data is written on every state mutation (panel edit, task toggle, mood selection, plan lock, reflection complete)
- [ ] On app load, existing data is read from `localStorage` and hydrated into React state
- [ ] A `useLocalStorage` custom hook encapsulates all read/write logic
- [ ] No data is sent to any external server

**Story Points:** 3
**Priority:** High

---

## YONKO-033 — Persist streak metadata to localStorage

**As a** child user,
**I want to** have my streak counts saved across sessions,
**so that** my streak doesn't reset every time I open the app.

### Acceptance Criteria
- [ ] Streak metadata is stored under the key `yonkoma-meta` in `localStorage`
- [ ] Schema: `{ planStreak, reflectStreak, lastPlanDate, lastReflectDate }`
- [ ] `lastPlanDate` and `lastReflectDate` are ISO date strings (`"2026-04-03"`)
- [ ] On app load, streak logic checks today's date against `lastPlanDate` / `lastReflectDate` to determine if a streak has been broken overnight
- [ ] The `useStreaks` hook encapsulates all streak read/update logic

**Story Points:** 3
**Priority:** High

---

## YONKO-034 — TypeScript data model enforcement

**As a** developer,
**I want to** have the full data model defined as TypeScript types,
**so that** the compiler catches type errors before they reach the user.

### Acceptance Criteria
- [ ] `types.ts` defines: `DayType`, `Day`, `Panel`, `Task`, `Meta` exactly as specified in the spec
- [ ] All component props and hook return types reference these shared types
- [ ] No `any` types used in data-layer code
- [ ] Types are exported from `lib/types.ts` and imported consistently across the codebase

**Story Points:** 2
**Priority:** High

---

## YONKO-035 — Load day templates from config

**As a** developer,
**I want to** define the School Day and Home Day templates as static config,
**so that** template data is never duplicated across components.

### Acceptance Criteria
- [ ] `lib/templates.ts` exports `SCHOOL_DAY_TEMPLATE` and `HOME_DAY_TEMPLATE` as typed arrays of `Omit<Panel, "focus" | "tasks" | "treat" | "mood" | "completedAt">`
- [ ] Each template entry includes: `id`, `name`, `anchor`, `timeLabel`
- [ ] Components import templates from this single source of truth
- [ ] Adding a new template in the future requires only editing `templates.ts`

**Story Points:** 1
**Priority:** High

---

## YONKO-036 — Next.js App Router scaffold

**As a** developer,
**I want to** set up the project with Next.js 14 App Router, Tailwind CSS, and Google Fonts,
**so that** the tech stack matches the spec and development can begin immediately.

### Acceptance Criteria
- [ ] Project initialised with `create-next-app` using the App Router
- [ ] Tailwind CSS configured and working
- [ ] Google Fonts (**Bangers** + **DM Sans**) loaded via `next/font/google` in `app/layout.tsx`
- [ ] Colour palette tokens defined as Tailwind `theme.extend.colors`
- [ ] Global dark background applied via root layout
- [ ] Routes scaffolded: `/`, `/plan`, `/reflect`, `/history` (each with a placeholder page)
- [ ] Repo pushed to GitHub (public)

**Story Points:** 3
**Priority:** High

---

## YONKO-037 — Deploy to Vercel

**As a** product owner,
**I want to** have the app deployed on Vercel from the GitHub repo,
**so that** the app is accessible from any device without running it locally.

### Acceptance Criteria
- [ ] The GitHub repo is connected to a Vercel project
- [ ] Every push to `main` triggers an automatic production deployment
- [ ] The deployed URL is accessible on mobile (primary use device)
- [ ] No environment variables or secrets are required (no backend, no API keys)
- [ ] Deployment runs on Vercel free tier

**Story Points:** 1
**Priority:** High

---

## YONKO-038 — Date utility helpers

**As a** developer,
**I want to** have shared date utility functions,
**so that** date formatting and comparison logic is consistent and not duplicated.

### Acceptance Criteria
- [ ] `lib/utils.ts` provides at minimum:
  - `todayISO(): string` — returns today's date as `"YYYY-MM-DD"`
  - `isSameDay(a: string, b: string): boolean` — compares two ISO date strings
  - `formatDisplayDate(iso: string): string` — human-readable date for History view (e.g. *"Thursday, 3 Apr"*)
- [ ] All date logic across the app imports from `lib/utils.ts`
- [ ] Functions are pure (no side effects) and unit-testable

**Story Points:** 1
**Priority:** Medium
