# GitHub Copilot Instructions — Yonkoma

## Project Overview

**Yonkoma** (display name: *Yonko*) is a day-chunking app for an 11-year-old, built around the Japanese 4-panel manga strip metaphor. A day is a manga page; each chunk is a panel. The app supports a morning planning ritual, active task-tracking during the day, and an evening reflection — shared between parent and child.

> *"Did you yonko today?"*

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Google Fonts — **Bangers** (display) + **DM Sans** (body) via `next/font/google` |
| Language | TypeScript — strict, no `any` in data-layer code |
| State | React `useState` / `useReducer` |
| Persistence | `localStorage` via custom `useLocalStorage` hook |
| Deployment | Vercel (free tier) |

No backend. No auth. No third-party services.

---

## Repo Structure

```
yonkoma/
├── app/
│   ├── page.tsx              # Today's view (/) — Plan / Active / Reflect state
│   ├── plan/page.tsx         # Plan mode (/plan)
│   ├── reflect/page.tsx      # Reflect mode (/reflect)
│   ├── history/page.tsx      # History + streaks (/history)
│   └── layout.tsx            # Root layout, fonts, global styles
├── components/
│   ├── PanelCard.tsx         # Individual manga panel
│   ├── MangaPage.tsx         # Full day panel grid
│   ├── MoodPicker.tsx        # Chibi mood selector
│   ├── TaskList.tsx          # Checklist within a panel
│   ├── StreakBar.tsx          # Streak display
│   └── ChapterSummary.tsx    # End-of-day summary screen
├── hooks/
│   ├── useLocalStorage.ts    # Persistent state hook
│   ├── useToday.ts           # Today's day data
│   └── useStreaks.ts         # Streak calculation logic
├── lib/
│   ├── templates.ts          # School day + Home day templates
│   ├── types.ts              # All TypeScript types
│   └── utils.ts              # Date helpers
└── specs/                    # Product specs and user stories
```

---

## Data Model

All data lives in `localStorage`. Never suggest a backend or external API.

```typescript
// Key: "yonkoma-days"
type DayType = "school" | "home"

type Day = {
  date: string           // "YYYY-MM-DD"
  type: DayType
  panels: Panel[]
  planCreatedAt: string  // ISO timestamp
  reflectedAt?: string   // ISO timestamp
}

type Panel = {
  id: string
  name: string           // e.g. "After Hours"
  anchor: "first" | "last" | "middle"
  timeLabel?: string     // e.g. "2:30–6:00PM"
  focus: string          // one intention for this chunk
  tasks: Task[]          // up to 5 items
  treat: string          // something to look forward to
  mood?: "happy" | "neutral" | "sad"
  completedAt?: string   // ISO timestamp
}

type Task = {
  id: string
  label: string
  done: boolean
}

// Key: "yonkoma-meta"
type Meta = {
  planStreak: number
  reflectStreak: number
  lastPlanDate: string   // "YYYY-MM-DD"
  lastReflectDate: string
}
```

---

## Design System

### Colours (Tailwind tokens)

| Token | Value | Usage |
|---|---|---|
| `background` | `#0F0F0F` / `#111318` | App background |
| `surface` | `#1A1A22` | Panel cards |
| `border` | `#FFFFFF` / `#E8E8E8` | Manga-style panel borders |
| `accent` | `#4ADE80` | Primary accent — electric green |
| `accent-soft` | `#86EFAC` | Progress fills, softer green |
| `text-primary` | `#F5F5F5` | Main text |
| `text-muted` | `#9CA3AF` | Metadata, secondary text |

### Typography Rules
- **Bangers** (or Black Han Sans) → panel titles, app name, chapter headings
- **DM Sans** (or Plus Jakarta Sans) → all body and UI text
- **Never** use Inter, Roboto, or Arial

### Layout
- Day view is a **manga page grid** — bold borders, slight size variation, not a flat list
- Mobile-first: single column on phone, two-column on tablet/desktop
- Every `PanelCard` reserves a small corner area (~32×32px) for the future Koma-chan mascot (v2) — leave it empty in v1 with a `// TODO: Koma-chan (v2)` comment

### Animations
All animations must respect `prefers-reduced-motion`.

| Trigger | Effect |
|---|---|
| Task tick | Speed-line burst radiating from checkbox (~350ms) |
| Panel complete | Soft green wash fill (~500ms) |
| Mood selection | Chibi face bounces in; selected face enlarges |
| Chapter Summary load | Panels assemble one-by-one (staggered ~150ms) |
| Streak milestone | Full-screen manga panel flash, dismissible |

---

## Copy & Tone of Voice

Punchy, dramatic, warm — like a manga narrator rooting for the protagonist. Never corporate, never condescending.

| Moment | Copy |
|---|---|
| Start of day | *"A new page begins."* |
| Task completed | *"Panel in progress… 🟩"* |
| Panel done | *"Chapter complete!"* |
| Mood prompt | *"How did this panel feel?"* |
| History view | *"Your story so far…"* |
| Streak milestone | *"Plot twist: you showed up X days in a row."* |
| Empty history | *"Your manga hasn't started yet. Plan your first day."* |

All copy lives in a constants/config file — never hardcoded inline.

---

## Key Behaviours & Rules

- **Panel count**: min 3, max 6 per day. First and last panels are anchor panels (cannot be deleted, but can be renamed). Middle panels (2–4) can be added or removed.
- **Focus field**: required on every panel before the plan can be locked.
- **Tasks**: optional, up to 5 per panel.
- **Treat field**: optional but first-class — visually distinguished, never hidden or de-emphasised.
- **Plan lock**: triggered by "Start your story" CTA. Sets `planCreatedAt`. Locked plans are read-only.
- **Reflection**: available once all panels are complete or after ~6:00 PM. Sets `reflectedAt` and is then read-only.
- **Streaks**: calculated by comparing `lastPlanDate` / `lastReflectDate` against today on every app load. A missed day resets the streak to 0.
- **Milestone thresholds**: 3, 7, 14, 30 days. Celebrate once per milestone.

---

## Day Templates

### 🏫 School Day (5 panels)
| # | Name | Time | Anchor |
|---|---|---|---|
| 1 | Rise & Go | 6:30–7:20AM | first |
| 2 | School Mode | 7:20AM–1:30PM | middle |
| 3 | Midday Reset | 1:30–2:30PM | middle |
| 4 | After Hours | 2:30–6:00PM | middle |
| 5 | Wind Down | 6:00–9:30PM | last |

### 🏠 Home Day (5 panels)
| # | Name | Time | Anchor |
|---|---|---|---|
| 1 | Slow Morning | Wake–10:00AM | first |
| 2 | Morning Focus | 10:00AM–12:30PM | middle |
| 3 | Afternoon Drift | 12:30–4:00PM | middle |
| 4 | Tea & Recharge | 4:00–6:00PM | middle |
| 5 | Evening Close | 6:00–9:30PM | last |

---

## Out of Scope (v1)

Do **not** implement or suggest these unless explicitly asked:

- Push notifications or reminders
- Multiple user profiles
- Cloud sync or cross-device support
- Points, badges, or leaderboards beyond streaks
- Editing past days
- Koma-chan mascot (reserved space only)
- Internationalisation (i18n)
- Any backend, database, or authentication
