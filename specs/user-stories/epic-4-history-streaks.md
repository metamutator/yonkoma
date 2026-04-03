# Epic YONKO-E4 — History & Streaks

> As a child user, I want to see my past days and track how consistently I've been planning and reflecting so that I feel motivated to keep the streak alive.

**Label:** `epic:history-streaks`
**Routes:** `/history`

---

## YONKO-019 — View history of past days

**As a** child user,
**I want to** scroll through a list of my past days,
**so that** I can look back at the story I've been building.

### Acceptance Criteria
- [ ] The `/history` route shows a scrollable list of all past days (excluding today)
- [ ] Each day entry is rendered as a **mini manga page** showing: date, day type (School/Home), panel names, mood ratings, and Treats
- [ ] Days are sorted with most recent first
- [ ] The screen header uses the narrator copy: *"Your story so far…"*
- [ ] If no past days exist, the empty state shows: *"Your manga hasn't started yet. Plan your first day."*
- [ ] Past days are **read-only** — no editing affordance

**Story Points:** 3
**Priority:** High

---

## YONKO-020 — View planning streak

**As a** child user,
**I want to** see my planning streak — how many consecutive days I've created a plan,
**so that** I'm motivated to keep showing up in the morning.

### Acceptance Criteria
- [ ] The planning streak (`planStreak`) is displayed on the home screen and/or history screen
- [ ] It is rendered as a manga **"power bar"** or panel sequence visual, not a plain number
- [ ] The streak increments by 1 each day that `planCreatedAt` is set
- [ ] The streak resets to 0 if a day passes without a plan being created
- [ ] Streak value is stored in `yonkoma-meta` under `planStreak` and `lastPlanDate`

**Story Points:** 3
**Priority:** High

---

## YONKO-021 — View reflection streak

**As a** child user,
**I want to** see my reflection streak — how many consecutive days I've completed a full mood rating,
**so that** I'm encouraged to close each day properly.

### Acceptance Criteria
- [ ] The reflection streak (`reflectStreak`) is displayed alongside the planning streak
- [ ] The streak increments by 1 each day that `reflectedAt` is set
- [ ] The streak resets to 0 if a day passes without completing reflection
- [ ] Streak value is stored in `yonkoma-meta` under `reflectStreak` and `lastReflectDate`

**Story Points:** 2
**Priority:** High

---

## YONKO-022 — Celebrate a streak milestone

**As a** child user,
**I want to** see a dramatic celebration when I hit a streak milestone,
**so that** reaching that number feels like a real achievement.

### Acceptance Criteria
- [ ] Milestone thresholds: **3, 7, 14, 30 days** (for either streak type)
- [ ] On reaching a milestone, a **full-screen manga effect flash** is shown with bold panel lettering (e.g. *"7 DAY STREAK!"*)
- [ ] The flash appears once per milestone and is not shown again on subsequent visits
- [ ] The narrator copy matches the tone: *"Plot twist: you showed up 7 days in a row."*
- [ ] The celebration is dismissible with a tap

**Story Points:** 3
**Priority:** Medium
