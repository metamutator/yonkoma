# Epic YONKO-E2 — Active Mode

> As a child user, I want to see my plan and tick off tasks during the day so that I can track my progress panel by panel.

**Label:** `epic:active-mode`
**Routes:** `/` (Today view — Active state)

---

## YONKO-010 — View today's plan in Active Mode

**As a** child user,
**I want to** see all my panels laid out as a manga page after locking the plan,
**so that** I have a clear visual overview of my whole day.

### Acceptance Criteria
- [ ] The Today view (`/`) automatically shows the Active Mode layout once a plan is locked
- [ ] All panels are visible, rendered as a manga page grid (not a flat list)
- [ ] Each panel displays: name, time label, Focus, task list, and Treat
- [ ] Panels not yet started appear in a default/idle visual state
- [ ] The layout is mobile-first (single column on phone, two-column on tablet/desktop)

**Story Points:** 3
**Priority:** High

---

## YONKO-011 — Tick off a task

**As a** child user,
**I want to** mark a task as done with a single tap,
**so that** I get a satisfying sense of progress.

### Acceptance Criteria
- [ ] Each task in a panel has a checkbox/tick affordance
- [ ] Tapping toggles `done` between `true` and `false`
- [ ] A completed task is visually struck through or dimmed
- [ ] The tick action triggers a **speed-line burst** animation radiating from the tick (see YONKO-E5)
- [ ] State is persisted to `localStorage` immediately on toggle

**Story Points:** 2
**Priority:** High

---

## YONKO-012 — See per-panel task progress

**As a** child user,
**I want to** see how many tasks I've completed in a panel,
**so that** I know at a glance how close I am to finishing that chunk.

### Acceptance Criteria
- [ ] Each panel displays a progress indicator in the format *"X / Y tasks"*
- [ ] The indicator updates in real time as tasks are ticked
- [ ] When all tasks are done the indicator shows a completed state (e.g. *"3 / 3 ✓"*)
- [ ] Panels with no tasks show no progress indicator (or a neutral placeholder)

**Story Points:** 2
**Priority:** High

---

## YONKO-013 — Panel completes with a visual fill

**As a** child user,
**I want to** see a panel visually "fill in" when all its tasks are ticked,
**so that** completing a chunk feels rewarding and obvious.

### Acceptance Criteria
- [ ] When the last task in a panel is ticked, the panel undergoes a soft **green wash fill animation**
- [ ] The filled panel remains visually distinct from incomplete panels for the rest of the day
- [ ] If there are no tasks in a panel, completion is triggered by the user manually marking the panel done (or via the reflect action — covered in YONKO-E3)
- [ ] `completedAt` timestamp is written to the panel record when the panel is marked complete

**Story Points:** 3
**Priority:** Medium

---

## YONKO-014 — View today's state on app open

**As a** child user,
**I want to** open the app and immediately see the correct day state (Plan / Active / Reflect),
**so that** I never have to navigate manually to the right mode.

### Acceptance Criteria
- [ ] If no plan exists for today → show Plan prompt / redirect to `/plan`
- [ ] If a plan is locked but reflection is incomplete → show Active Mode on `/`
- [ ] If reflection is complete for today → show the Chapter Summary / completed state
- [ ] State detection is based on the current date (`date` field on the day record) and `planCreatedAt` / `reflectedAt` timestamps
- [ ] Transitions between states do not require a page reload

**Story Points:** 3
**Priority:** High
