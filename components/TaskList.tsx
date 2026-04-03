"use client"

import { useState } from "react"
import type { Task } from "@/lib/types"

type Props = {
  tasks: Task[]
  editable?: boolean
  onToggle?: (id: string) => void
  onAdd?: (label: string) => void
  onRemove?: (id: string) => void
}

const MAX_TASKS = 5

export default function TaskList({ tasks, editable = false, onToggle, onAdd, onRemove }: Props) {
  const [input, setInput] = useState("")
  const [burstIds, setBurstIds] = useState<Set<string>>(new Set())

  function handleToggle(task: Task) {
    if (!task.done) {
      setBurstIds(prev => new Set(prev).add(task.id))
      setTimeout(() => {
        setBurstIds(prev => {
          const next = new Set(prev)
          next.delete(task.id)
          return next
        })
      }, 400)
    }
    onToggle?.(task.id)
  }

  function handleAdd() {
    const trimmed = input.trim()
    if (!trimmed || tasks.length >= MAX_TASKS) return
    onAdd?.(trimmed)
    setInput("")
  }

  const doneCount = tasks.filter(t => t.done).length

  return (
    <div className="font-body flex flex-col gap-1.5">
      {!editable && tasks.length > 0 && (
        <span className="text-xs text-text-muted mb-1">
          {doneCount} / {tasks.length} tasks
        </span>
      )}

      <ul className="flex flex-col gap-1">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-2">
            {editable ? (
              <>
                <span className="w-3 h-3 rounded-sm border border-border flex-shrink-0" />
                <span className="flex-1 text-sm text-text-primary">{task.label}</span>
                <button
                  onClick={() => onRemove?.(task.id)}
                  className="text-text-muted hover:text-text-primary text-xs leading-none px-1"
                  aria-label="Remove task"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <span className={burstIds.has(task.id) ? "animate-speedburst" : ""}>
                <button
                  onClick={() => handleToggle(task)}
                  className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    task.done
                      ? "bg-accent border-accent"
                      : "border-accent bg-transparent"
                  }`}
                  aria-label={task.done ? "Mark incomplete" : "Mark complete"}
                >
                  {task.done && (
                    <svg className="w-2.5 h-2.5 text-surface" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                </span>
                <span
                  className={`text-sm transition-colors ${
                    task.done ? "line-through text-text-muted" : "text-text-primary"
                  }`}
                >
                  {task.label}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      {editable && tasks.length < MAX_TASKS && (
        <div className="flex gap-1.5 mt-1">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Add a task…"
            className="flex-1 text-sm bg-background border border-border rounded-sm px-2 py-1 text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            className="text-sm px-3 py-1 bg-accent text-surface rounded-sm font-semibold disabled:opacity-40 hover:bg-accent-soft transition-colors"
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}
