# Epic YONKO-E5 — Design System & UI

> As a child user, I want the app to look and feel like a cool manga experience so that I'm genuinely excited to use it every day.

**Label:** `epic:design-system`

---

## YONKO-023 — Manga page panel grid layout

**As a** child user,
**I want to** see my panels arranged as a manga page grid with bold borders,
**so that** the day feels like an actual comic strip, not a boring to-do list.

### Acceptance Criteria
- [ ] The day view renders panels in a **manga page grid** — bold black/white borders, slight size variation (the main day chunk is visually larger)
- [ ] Layout is **not** a flat vertical list — it is a 2D page composition
- [ ] Mobile: single column; Tablet/Desktop: two-column
- [ ] Panel borders use `#FFFFFF` or `#E8E8E8` against the dark background (`#0F0F0F` / `#111318`)
- [ ] Panel surfaces use `#1A1A22`

**Story Points:** 5
**Priority:** High

---

## YONKO-024 — Apply the colour palette and typography

**As a** child user,
**I want to** see a dark, manga-flavoured colour scheme with expressive fonts,
**so that** the app feels cool and unlike any boring productivity app.

### Acceptance Criteria
- [ ] Background: `#0F0F0F` or `#111318`
- [ ] Surface (panel cards): `#1A1A22`
- [ ] Primary accent: `#4ADE80` (electric green — confirmed)
- [ ] Secondary accent: `#86EFAC` (softer green for progress fills)
- [ ] Primary text: `#F5F5F5`; Secondary/metadata text: `#9CA3AF`
- [ ] Display/heading font: **Bangers** or **Black Han Sans** (Google Fonts) — used for panel titles, app name, chapter headings
- [ ] Body/UI font: **DM Sans** or **Plus Jakarta Sans** — clean and legible
- [ ] Inter, Roboto, and Arial are **never** used

**Story Points:** 3
**Priority:** High

---

## YONKO-025 — Task tick-off speed-line animation

**As a** child user,
**I want to** see a small speed-line burst when I tick off a task,
**so that** completing a task feels energetic and satisfying.

### Acceptance Criteria
- [ ] On ticking a task, a short burst of radiating speed-lines animates from the checkbox
- [ ] Animation duration: ~300–400ms, non-blocking
- [ ] Animation does not repeat on re-tick (uncheck is silent)
- [ ] Accessible: animation respects `prefers-reduced-motion` (no animation if set)

**Story Points:** 2
**Priority:** Medium

---

## YONKO-026 — Panel completion green wash animation

**As a** child user,
**I want to** see a soft green fill wash over a panel when it's complete,
**so that** finishing a chunk of the day is visually celebrated.

### Acceptance Criteria
- [ ] On panel completion, the panel surface transitions to a soft green wash (`#86EFAC` at low opacity)
- [ ] The fill animates in over ~500ms (fade or sweep from left)
- [ ] The green state persists for the rest of the day view
- [ ] Accessible: animation respects `prefers-reduced-motion`

**Story Points:** 2
**Priority:** Medium

---

## YONKO-027 — Chibi mood face animations

**As a** child user,
**I want to** see chibi manga-style faces animate when I pick a mood,
**so that** the reflection moment feels expressive and fun rather than flat.

### Acceptance Criteria
- [ ] Mood options are rendered as custom line-art chibi faces — **not** standard emoji
- [ ] On selecting a mood, the chosen face **bounces in** and **enlarges** relative to the unselected faces
- [ ] Unselected faces reduce in scale/opacity
- [ ] Three faces available: happy (`mood: "happy"`), neutral (`mood: "neutral"`), sad (`mood: "sad"`)
- [ ] Accessible: animation respects `prefers-reduced-motion`

**Story Points:** 3
**Priority:** High

---

## YONKO-028 — Chapter Summary panel assembly animation

**As a** child user,
**I want to** watch my panels assemble onto the summary page one by one,
**so that** the end-of-day moment feels like the final reveal of a manga chapter.

### Acceptance Criteria
- [ ] On entering the Chapter Summary screen, panels animate in sequentially (staggered, ~150ms delay between each)
- [ ] Each panel slides or fades into position
- [ ] Full assembly completes within ~1.5s for a 5-panel day
- [ ] Accessible: animation respects `prefers-reduced-motion` (all panels appear instantly)

**Story Points:** 3
**Priority:** Medium

---

## YONKO-029 — Streak milestone full-screen flash

**As a** child user,
**I want to** see a dramatic full-screen manga panel flash when I hit a streak milestone,
**so that** the achievement feels massive.

### Acceptance Criteria
- [ ] On milestone (3, 7, 14, 30 days), a full-screen overlay appears with bold panel lettering
- [ ] Style: manga speed lines, bold typography, high-contrast (white on black or green on black)
- [ ] Copy example: *"7 DAY STREAK!"* with sub-copy *"Plot twist: you showed up 7 days in a row."*
- [ ] Dismissible with a tap anywhere
- [ ] Accessible: static version shown if `prefers-reduced-motion` is set

**Story Points:** 3
**Priority:** Medium

---

## YONKO-030 — Manga narrator copy throughout the app

**As a** child user,
**I want to** read punchy, dramatic narrator-style copy across the app,
**so that** every moment feels like I'm the protagonist of my own manga.

### Acceptance Criteria
- [ ] All key moments use the defined copy from the spec:
  - Start of day: *"A new page begins."*
  - Task completed: *"Panel in progress… 🟩"*
  - Panel done: *"Chapter complete!"*
  - Mood prompt: *"How did this panel feel?"*
  - History view: *"Your story so far…"*
  - Streak milestone: *"Plot twist: you showed up X days in a row."*
  - Empty history: *"Your manga hasn't started yet. Plan your first day."*
- [ ] Copy is implemented as constants/config (not hardcoded inline) so it can be updated easily
- [ ] Tone is consistently punchy, warm, and dramatic — never corporate or condescending

**Story Points:** 2
**Priority:** Medium

---

## YONKO-031 — Reserve space for Koma-chan mascot

**As a** product owner,
**I want to** reserve visual space in each panel for the future Koma-chan mascot,
**so that** adding the mascot in v2 doesn't require redesigning the panel layout.

### Acceptance Criteria
- [ ] Each panel card has a small reserved corner area (e.g. bottom-right, ~32×32px)
- [ ] In v1 this area is empty (no placeholder text or icon)
- [ ] The reserved area does not interfere with other panel content
- [ ] Documented in the component with a `// TODO: Koma-chan mascot (v2)` comment

**Story Points:** 1
**Priority:** Low
