# Epic YONKO-E3 — Reflect Mode

> As a child user, I want to rate how each panel felt and see a summary of my whole day so that I can close the chapter with intention.

**Label:** `epic:reflect-mode`
**Routes:** `/reflect`

---

## YONKO-015 — Rate a panel's mood

**As a** child user,
**I want to** tap a mood reaction for each panel at the end of the day,
**so that** I can reflect on how that chunk of my day actually felt.

### Acceptance Criteria
- [ ] The `/reflect` route shows all panels for today in order
- [ ] Each panel presents three mood options: **😊 Felt good**, **😐 It was okay**, **😞 Tough one**
- [ ] Moods are rendered as **chibi manga-style expression faces** (line-art), not standard emoji
- [ ] Tapping a mood selects it; tapping again deselects (allows re-selection but not deselection to nothing once one is chosen)
- [ ] Selected mood is saved to the panel record (`mood: "happy" | "neutral" | "sad"`)
- [ ] The mood selection triggers a **chibi face bounce-in animation**, and the selected face enlarges (see YONKO-E5)

**Story Points:** 3
**Priority:** High

---

## YONKO-016 — Complete the day's reflection

**As a** child user,
**I want to** finish rating all panels and see a "Complete" action,
**so that** the day is officially closed and my streak is recorded.

### Acceptance Criteria
- [ ] A **"Complete chapter"** (or equivalent) CTA becomes active once all panels have a mood rating
- [ ] Tapping it sets `reflectedAt` to the current ISO timestamp on the day record
- [ ] The reflection streak counter is incremented (see YONKO-E4)
- [ ] After completing, the app transitions to the **Chapter Summary** screen (YONKO-017)
- [ ] Once `reflectedAt` is set, the `/reflect` route shows a read-only view (no re-rating)

**Story Points:** 2
**Priority:** High

---

## YONKO-017 — View the Chapter Summary screen

**As a** child user,
**I want to** see a full end-of-day Chapter Summary screen,
**so that** I get a satisfying, complete view of the manga page I lived today.

### Acceptance Criteria
- [ ] The Chapter Summary displays all panels as a completed manga page
- [ ] Each panel shows its name, Focus, Treat, and mood reaction
- [ ] Mood ratings are shown using the same chibi manga-style faces
- [ ] The current streak update is displayed (e.g. *"🔥 4-day plan streak!"*)
- [ ] A closing narrator line is shown in manga style, e.g. *"Chapter complete. See you tomorrow."*
- [ ] Panels **"assemble" onto the page one by one** via animation when the screen first loads (see YONKO-E5)
- [ ] A "See history" action links to `/history`

**Story Points:** 5
**Priority:** High

---

## YONKO-018 — Access reflect mode from Today view

**As a** child user,
**I want to** navigate to Reflect Mode directly from the Today view,
**so that** I don't have to remember the URL.

### Acceptance Criteria
- [ ] The Today view (`/`) shows a **"Reflect on today"** CTA once the plan is locked
- [ ] The CTA is only active/visible after all panels have been marked complete **or** after a defined evening time threshold (e.g. 6:00 PM) — whichever comes first
- [ ] Tapping the CTA navigates to `/reflect`

**Story Points:** 2
**Priority:** Medium
