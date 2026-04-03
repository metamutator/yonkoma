# Epic YONKO-E1 — Day Planning

> As a child user, I want to plan my day as a manga page so that I feel organised and excited about what's ahead.

**Label:** `epic:day-planning`
**Routes:** `/plan`

---

## YONKO-001 — Choose a day type

**As a** child user,
**I want to** choose between a *School Day* or *Home Day* template at the start of each morning,
**so that** my panels reflect the actual structure of my day.

### Acceptance Criteria
- [ ] The `/plan` screen presents two options: **School Day** and **Home Day**
- [ ] Selecting a template loads the corresponding 5 pre-defined panels with names and time labels
- [ ] The chosen day type is saved to the day record (`type: "school" | "home"`)
- [ ] If today already has a plan that is not yet locked, the previously selected template is pre-selected
- [ ] Tapping either option does **not** immediately lock the plan — the user can still edit panels first

**Story Points:** 2
**Priority:** High

---

## YONKO-002 — View pre-loaded panel defaults

**As a** child user,
**I want to** see the default panel names and time labels after choosing a template,
**so that** I have a ready-made structure I can customise rather than starting from scratch.

### Acceptance Criteria
- [ ] School Day loads 5 panels: Rise & Go, School Mode, Midday Reset, After Hours, Wind Down — with their defined time labels
- [ ] Home Day loads 5 panels: Slow Morning, Morning Focus, Afternoon Drift, Tea & Recharge, Evening Close — with their defined time labels
- [ ] Each panel displays its name and time label in the plan editor
- [ ] Default values are editable (covered by YONKO-003)

**Story Points:** 2
**Priority:** High

---

## YONKO-003 — Edit panel name

**As a** child user,
**I want to** rename any panel,
**so that** the panel title matches how I actually think about that part of my day.

### Acceptance Criteria
- [ ] Every panel (including first and last anchor panels) has an editable name field
- [ ] The name field is pre-filled with the template default
- [ ] Changes are reflected immediately in the panel display
- [ ] Panel name is persisted to the day record on save / lock

**Story Points:** 1
**Priority:** Medium

---

## YONKO-004 — Add or remove middle panels

**As a** child user,
**I want to** add or remove middle panels (panels 2–4),
**so that** I can customise how many chunks my day has.

### Acceptance Criteria
- [ ] The first (anchor) and last (anchor) panels cannot be deleted
- [ ] Middle panels can be removed individually
- [ ] A new blank middle panel can be inserted
- [ ] Total panel count is constrained to **3 minimum, 6 maximum**
- [ ] The UI clearly indicates when the min/max limit is reached (add/remove buttons disabled with a hint)

**Story Points:** 3
**Priority:** Medium

---

## YONKO-005 — Set a Focus for a panel

**As a** child user,
**I want to** write a single intention (Focus) for each panel,
**so that** I know exactly what I'm aiming to achieve in that chunk.

### Acceptance Criteria
- [ ] Each panel in plan mode has a **Focus** text input (single line, max ~100 chars)
- [ ] Placeholder copy: *"One thing to focus on…"*
- [ ] Focus is required before the plan can be locked (non-empty)
- [ ] Focus value is saved to the panel record

**Story Points:** 2
**Priority:** High

---

## YONKO-006 — Add tasks to a panel

**As a** child user,
**I want to** add a checklist of tasks to a panel,
**so that** I have concrete steps to follow during that chunk.

### Acceptance Criteria
- [ ] Each panel supports up to **5 tasks**
- [ ] Tasks can be added one at a time via a text input + "Add" action
- [ ] Each task has a label and starts with `done: false`
- [ ] Tasks can be deleted in plan mode
- [ ] Task list is optional (a panel with no tasks is valid)
- [ ] When the 5-task limit is reached, the add input is hidden/disabled

**Story Points:** 3
**Priority:** High

---

## YONKO-007 — Set a Treat for a panel

**As a** child user,
**I want to** write a Treat — something to look forward to after this panel,
**so that** I have a reward to motivate me through the chunk.

### Acceptance Criteria
- [ ] Each panel has a **Treat** text input (single line, max ~80 chars)
- [ ] Placeholder copy: *"Something to look forward to…"*
- [ ] The Treat field is visually distinguished (e.g. a small icon or accent colour) — it is a first-class field, not a footnote
- [ ] Treat is optional (a panel without a treat is valid)
- [ ] Treat value is saved to the panel record

**Story Points:** 2
**Priority:** High

---

## YONKO-008 — Lock in the plan ("Start your story")

**As a** child user,
**I want to** confirm and lock my plan with a single tap,
**so that** the planning phase ends and the active day begins.

### Acceptance Criteria
- [ ] A **"Start your story"** CTA button is shown at the bottom of the `/plan` screen
- [ ] Tapping it validates that every panel has a non-empty Focus
- [ ] On success, `planCreatedAt` is recorded as an ISO timestamp on the day record
- [ ] After locking, the app navigates to the Today view (`/`)
- [ ] A locked plan cannot be re-edited via `/plan` (the route shows a read-only view or redirects)
- [ ] The planning streak counter is incremented (see YONKO-E4)

**Story Points:** 3
**Priority:** High

---

## YONKO-009 — Return to today's plan before locking

**As a** child user,
**I want to** go back and edit my plan before I lock it,
**so that** I can correct mistakes without starting over.

### Acceptance Criteria
- [ ] Before locking, navigating to `/plan` always shows the current draft plan in editable state
- [ ] All previously entered values (panel names, focus, tasks, treats) are preserved
- [ ] There is no "reset" or "start over" affordance that silently clears data

**Story Points:** 1
**Priority:** Medium
