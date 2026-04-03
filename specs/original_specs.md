# Yonkoma / Yonko — Product Specification v1.0

> *"Did you yonko today?"*

---

## 1. Name

| Option | Notes |
|---|---|
| **Yonkoma** (4コマ) | Full name. References the classic Japanese 4-panel manga format. Authentic, culturally rich, slightly longer. |
| **Yonko** | Everyday shorthand. Punchy, verb-friendly (*"yonko your day"*, *"did you yonko today?"*). Also a nod to the Four Emperors in One Piece — a potential bonus depending on the daughter's fandom. |

**Decision pending**: final name to be confirmed after a conversation with the daughter. Either works — the codebase, repo, and domain should use `yonkoma` as the canonical slug, with `Yonko` as the in-app display name if the shorter form is chosen.

---

## 2. Concept

**Yonkoma** is a day-chunking app for an 11-year-old, built around the manga panel metaphor.

> Your day is a manga page. Each chunk is a panel. Plan your story. Live it panel by panel. Reflect on how the chapter went.

The app teaches the concept of *chunking* — breaking a day into a few meaningful, manageable blocks — through a structure that feels cool and personal rather than like a productivity tool for adults.

It is used as a **shared ritual** between parent and child: briefly together in the morning to plan, and again in the evening to reflect.

---

## 3. Core Metaphor

Yonkoma (4コマ漫画) is the traditional Japanese 4-panel manga strip format — the format behind Doraemon, Chibi Maruko-chan, and countless others. Each strip tells a small complete story: setup → development → twist → resolution.

A chunked day maps perfectly onto this:

| Panel | Day Equivalent |
|---|---|
| Panel 1 | Morning — set the scene |
| Panel 2 | Main act — the bulk of the day |
| Panel 3 | Turn — afternoon shift in energy |
| Panel 4 | Resolution — wind down and reflect |

The number of chunks per day (4–6) is flexible, but the *feeling* is always: a complete story with a beginning, middle, and end.

---

## 4. Day Templates

Rather than building chunks from scratch each day, the app offers two pre-loaded templates. Choosing which applies is itself part of the morning ritual.

### 🏫 School Day — 4 Panels

| # | Panel Name | Time | Vibe |
|---|---|---|---|
| 1 | Rise & Go | 6:30–7:20AM | Get up, get ready, out the door |
| 2 | After School | 2:30–4:00PM | CCAs, student care, decompress |
| 3 | Focus Time | 4:00–6:00PM | Homework, hobbies, snack |
| 4 | Wind Down | 6:00–9:30PM | Dinner → relax → sleep |

### 🏠 Home Day — 5 Panels

| # | Panel Name | Time | Vibe |
|---|---|---|---|
| 1 | Slow Morning | Wake–10:00AM | No rush — breakfast, ease in |
| 2 | Morning Focus | 10:00AM–12:30PM | Best time for homework or projects |
| 3 | Afternoon Drift | 12:30–4:00PM | Lunch + free time, low pressure |
| 4 | Tea & Recharge | 4:00–6:00PM | Snack, hobbies, screen time |
| 5 | Evening Close | 6:00–9:30PM | Dinner → wind down → sleep |

**Template rules:**
- Panel names are pre-filled but fully editable
- Middle panels (2–4) can be renamed, added, or removed (min 3 panels, max 6)
- First and last panels are anchored but still renameable
- Template choice is saved per day

---

## 5. What Goes Inside Each Panel

Each panel has three layers:

| Layer | Description | Example |
|---|---|---|
| **Focus** | One intention for this chunk — a single sentence | *"Smash my revision notes"* |
| **Tasks** | A short checklist — up to 5 items | *[ ] Finish maths worksheet* |
| **Treat** | Something to look forward to at the end | *"Bubble tea after school 🧋"* |

The **Treat** field is a first-class citizen — not optional, not an afterthought. It teaches that rest and reward are part of a well-structured day, not a guilty add-on.

---

## 6. Daily Flow

### Morning — Plan Mode
1. Choose day type: School Day or Home Day
2. Template loads with default panel names and times
3. For each panel, fill in: Focus, Tasks (optional), Treat
4. Tap **"Start your story"** to lock in the plan

### During the Day — Active Mode
- View each panel's plan
- Tick off tasks as completed
- Progress indicator per panel (e.g. *"2 / 3 tasks"*)
- Panels visually "fill in" as tasks are completed (green wash)

### End of Panel / Day — Reflect Mode
- For each completed panel, tap a mood reaction:
  - 😊 Felt good
  - 😐 It was okay
  - 😞 Tough one
- Mood reactions rendered as chibi manga-style expression faces (line-art consistent style), not plain emoji
- End-of-day **Chapter Summary** screen:
  - All panels shown as a completed manga page
  - Moods visible on each panel
  - Streak update displayed
  - Closing line in manga narrator style (e.g. *"Chapter complete. See you tomorrow."*)

---

## 7. Streaks & History

### Streaks
- **Planning streak** — consecutive days a plan was created
- **Reflection streak** — consecutive days all panels were rated
- Displayed as a manga "power bar" or panel sequence on the home screen

### History
- Scrollable list of past days, each shown as a mini manga page
- Shows: date, day type, panel names, mood ratings, treats
- Accessed via `/history` route
- No editing of past days

---

## 8. Navigation & Routes

| Route | Description |
|---|---|
| `/` | Today's view — shows plan / active / reflect state depending on time of day |
| `/plan` | Set up today's panels (or edit today's plan if not yet locked) |
| `/reflect` | End-of-day mood rating and chapter summary |
| `/history` | Past days and streaks |

---

## 9. Design System

### Aesthetic Direction
**Manga-editorial meets modern mobile app.** Cool, sleek, and confident — something an 11-year-old would genuinely think is cool and be proud to show friends. Not a pastel kids app. Not a corporate productivity tool.

### Colour Palette

| Role | Value | Notes |
|---|---|---|
| Background | `#0F0F0F` or `#111318` | Near-black, like manga ink on dark paper |
| Surface (panels) | `#1A1A22` | Slightly lifted dark for panel cards |
| Panel border | `#FFFFFF` or `#E8E8E8` | Bold manga-style borders |
| Accent — Primary | `#4ADE80` or `#22C55E` | Daughter's green — electric, vivid |
| Accent — Secondary | `#86EFAC` | Softer green for progress fills |
| Text — Primary | `#F5F5F5` | Near-white |
| Text — Secondary | `#9CA3AF` | Muted for metadata |

### Typography
- **Display / headings**: A bold, expressive font with manga energy — e.g. *Bangers*, *Black Han Sans*, or a variable weight that goes very heavy. Used for panel titles, the app name, chapter headings.
- **Body / UI**: A clean, modern sans-serif — e.g. *DM Sans*, *Plus Jakarta Sans*. Legible and unfussy.
- Never Inter, Roboto, or Arial.

### Panel Layout
- Day view renders as a **manga page grid** — panels arranged with bold black borders, slight size variation (the main chunk of the day slightly larger)
- Not a list. Not cards in a column. A *page*.
- Mobile-first — single column on phone, two-column on tablet/desktop

### Motion & Interactions
| Moment | Treatment |
|---|---|
| Task tick-off | Small speed-line burst radiating from the tick |
| Panel completion | Panel washes with soft green fill animation |
| Mood selection | Chibi face bounces in, selected face enlarges |
| Chapter summary | Panels "assemble" onto the page one by one |
| Streak milestone | Full-screen manga effect flash (*"7 DAY STREAK!"* in bold panel lettering) |

### Copy & Tone of Voice
Punchy, dramatic, warm. Like a manga narrator rooting for the protagonist.

| Moment | Copy |
|---|---|
| Start of day | *"A new page begins."* |
| Task completed | *"Panel in progress… 🟩"* |
| Panel done | *"Chapter complete!"* |
| Mood prompt | *"How did this panel feel?"* |
| History view | *"Your story so far…"* |
| Streak milestone | *"Plot twist: you showed up 7 days in a row."* |
| Empty history | *"Your manga hasn't started yet. Plan your first day."* |

### Mascot — Koma-chan (v2)
A small chibi character to be introduced in a future version. Lives in panel corners, reacts to events:
- Cheering when tasks are ticked
- Sleeping in Wind Down panels
- Excited face next to the Treat field
- Victory pose on streak milestones

Design space should be reserved for this from v1 (e.g. a small empty corner in each panel).

---

## 10. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Modern, file-based routing, great DX |
| Styling | Tailwind CSS | Fast, consistent, mobile-first |
| Fonts | Google Fonts (Bangers + DM Sans) | Free, expressive |
| State | React `useState` / `useReducer` | Simple, no overkill |
| Persistence | `localStorage` via custom `useLocalStorage` hook | No backend needed |
| Deployment | Vercel (free tier) | Zero-config, instant deploys from GitHub |
| Repo | GitHub (public) | Open source, inspires others |

No backend. No auth. No third-party services beyond Vercel hosting.

---

## 11. Data Model

Stored in `localStorage` under the key `yonkoma-days`.

```typescript
type DayType = "school" | "home"

type Day = {
  date: string           // "2026-04-03"
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
  focus: string
  tasks: Task[]
  treat: string
  mood?: "happy" | "neutral" | "sad"
  completedAt?: string
}

type Task = {
  id: string
  label: string
  done: boolean
}

// Stored separately for quick access
// Key: "yonkoma-meta"
type Meta = {
  planStreak: number
  reflectStreak: number
  lastPlanDate: string
  lastReflectDate: string
}
```

---

## 12. Repo Structure (suggested)

```
yonkoma/
├── app/
│   ├── page.tsx              # Today's view (/)
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
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Date helpers etc.
├── public/
│   └── fonts/                # If self-hosting fonts
└── README.md
```

---

## 13. Build Order (suggested)

1. **Scaffold** — Next.js + Tailwind setup, fonts, colour tokens, global styles
2. **Data layer** — `useLocalStorage` hook, types, template definitions
3. **Panel component** — the core `PanelCard` with manga border aesthetic
4. **Manga page layout** — `MangaPage` grid that arranges panels
5. **Plan flow** — `/plan` route, template selection, panel editing
6. **Active mode** — task tick-off, progress indicators, panel completion
7. **Reflect flow** — mood picker, `/reflect` route, chapter summary
8. **History & streaks** — `/history` route, streak calculation
9. **Polish** — animations, copy, motion, mobile QA
10. **Deploy** — Vercel + GitHub public repo

---

## 14. Out of Scope (v1)

- Notifications / reminders
- Multiple user profiles
- Cloud sync or cross-device support
- Gamification beyond streaks (no points, badges, leaderboards)
- Editing past days
- Koma-chan mascot (v2)
- Internationalisation (Chinese / Telugu UI strings)

---

## 15. Open Questions

| # | Question | Status |
|---|---|---|
| 1 | **App name**: Yonkoma or Yonko? | Yonkoma for name, yonko as a verb, or for short |
| 2 | **One Piece reference**: feature or problem? | feature |
| 3 | **Accent green shade**: electric (`#4ADE80`) or deeper (`#16A34A`)? | electric |
| 4 | **Domain**: yonkoma.app / yonko.day / something else? | ⏳ Optional for v1 |

---

*Spec version 1.0 — ready for build once name is confirmed.*