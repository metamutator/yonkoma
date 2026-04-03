"use client"

import type { Panel } from "@/lib/types"
import TaskList from "./TaskList"
import MoodPicker from "./MoodPicker"
import { generateId } from "@/lib/utils"

type Props = {
  panel: Panel
  mode: "plan" | "active" | "reflect" | "summary"
  onPanelChange?: (updated: Panel) => void
  onToggleTask?: (taskId: string) => void
  onMoodChange?: (mood: Panel["mood"]) => void
  onMarkComplete?: () => void
  isMain?: boolean
}

export default function PanelCard({
  panel,
  mode,
  onPanelChange,
  onToggleTask,
  onMoodChange,
  onMarkComplete,
  isMain = false,
}: Props) {
  const isCompleted = mode === "active" && !!panel.completedAt
  const isPlan = mode === "plan"
  const showMood = mode === "reflect" || mode === "summary"

  function updateField<K extends keyof Panel>(key: K, value: Panel[K]) {
    onPanelChange?.({ ...panel, [key]: value })
  }

  function handleAddTask(label: string) {
    const newTask = { id: generateId(), label, done: false }
    onPanelChange?.({ ...panel, tasks: [...panel.tasks, newTask] })
  }

  function handleRemoveTask(id: string) {
    onPanelChange?.({ ...panel, tasks: panel.tasks.filter(t => t.id !== id) })
  }

  return (
    <div
      className={`
        border-2 border-border bg-surface rounded-sm flex flex-col
        ${isMain ? "md:col-span-2" : ""}
        ${isCompleted ? "bg-accent-soft/10 animate-greenwash" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        {isPlan ? (
          <input
            type="text"
            value={panel.timeLabel ?? ""}
            onChange={e => updateField("timeLabel", e.target.value)}
            placeholder="Time…"
            className="text-xs bg-transparent border-b border-border outline-none focus:border-accent text-text-muted font-body w-28"
          />
        ) : (
          <span className="text-xs text-text-muted font-body">{panel.timeLabel}</span>
        )}
        {isPlan ? (
          <input
            type="text"
            value={panel.name}
            onChange={e => updateField("name", e.target.value)}
            className="font-display text-base text-text-primary bg-transparent border-b border-border outline-none focus:border-accent text-right"
          />
        ) : (
          <span className="font-display text-base text-text-primary">{panel.name}</span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-3 p-3">
        {/* Focus */}
        <div>
          <span className="text-xs text-text-muted font-body block mb-1">Focus</span>
          {isPlan ? (
            <input
              type="text"
              value={panel.focus}
              onChange={e => updateField("focus", e.target.value)}
              placeholder="What matters most…"
              className="w-full text-sm bg-background border border-border rounded-sm px-2 py-1 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors font-body"
            />
          ) : (
            <p className="text-sm text-text-primary font-body">{panel.focus || "—"}</p>
          )}
        </div>

        {/* Tasks */}
        <div>
          <span className="text-xs text-text-muted font-body block mb-1">Tasks</span>
          <TaskList
            tasks={panel.tasks}
            editable={isPlan}
            onToggle={onToggleTask}
            onAdd={handleAddTask}
            onRemove={handleRemoveTask}
          />
        </div>

        {/* Treat */}
        <div>
          <span className="text-xs text-text-muted font-body block mb-1">🎁 Treat</span>
          {isPlan ? (
            <input
              type="text"
              value={panel.treat}
              onChange={e => updateField("treat", e.target.value)}
              placeholder="Your reward…"
              className="w-full text-sm bg-background border border-border rounded-sm px-2 py-1 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors font-body"
            />
          ) : (
            <p className="text-sm text-text-primary font-body">{panel.treat || "—"}</p>
          )}
        </div>

        {/* Mood */}
        {showMood && (
          <div className="mt-1">
            <span className="text-xs text-text-muted font-body block mb-2">Mood</span>
            <MoodPicker
              selected={panel.mood}
              onChange={onMoodChange}
              readOnly={mode === "summary"}
            />
          </div>
        )}
      </div>

      {/* Active mode: mark done button for panels with no tasks */}
      {mode === "active" && panel.tasks.length === 0 && !panel.completedAt && (
        <div className="px-3 pb-3">
          <button
            onClick={onMarkComplete}
            className="w-full text-xs font-body border border-border text-text-muted rounded-sm py-1.5 hover:border-accent hover:text-accent transition-colors"
          >
            Mark panel done ✓
          </button>
        </div>
      )}

      {/* Footer: Koma-chan corner stub */}
      <div className="flex justify-end px-3 pb-2">
        {/* TODO: Koma-chan (v2) */}
        <div className="w-8 h-8" />
      </div>
    </div>
  )
}
