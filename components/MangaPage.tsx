"use client"

import type { Panel } from "@/lib/types"
import PanelCard from "./PanelCard"

type Props = {
  panels: Panel[]
  mode: "plan" | "active" | "reflect" | "summary"
  onPanelChange?: (index: number, updated: Panel) => void
  onToggleTask?: (panelId: string, taskId: string) => void
  onMoodChange?: (panelId: string, mood: Panel["mood"]) => void
}

export default function MangaPage({ panels, mode, onPanelChange, onToggleTask, onMoodChange }: Props) {
  const mainIndex = panels.findIndex(p => p.anchor === "middle") !== -1
    ? Math.floor(panels.length / 2)
    : 1
  const isSummary = mode === "summary"

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border-strong"
      role="main"
      aria-label="Manga page"
    >
      {panels.map((panel, index) => {
        const isMain = index === mainIndex
        return (
          <div
            key={panel.id}
            className={`${isMain ? "md:col-span-2" : ""} ${isSummary ? "animate-panelassemble" : ""}`}
            style={isSummary ? { animationDelay: `${index * 150}ms` } : undefined}
          >
            <PanelCard
              panel={panel}
              mode={mode}
              isMain={false}
              onPanelChange={updated => onPanelChange?.(index, updated)}
              onToggleTask={taskId => onToggleTask?.(panel.id, taskId)}
              onMoodChange={mood => onMoodChange?.(panel.id, mood)}
            />
          </div>
        )
      })}
    </div>
  )
}
