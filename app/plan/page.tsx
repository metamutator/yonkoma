"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { DayType, Panel } from "@/lib/types"
import { SCHOOL_DAY_TEMPLATE, HOME_DAY_TEMPLATE, templateToPanels } from "@/lib/templates"
import { COPY } from "@/lib/copy"
import { generateId, todayISO } from "@/lib/utils"
import { useToday } from "@/hooks/useToday"
import { useStreaks } from "@/hooks/useStreaks"
import PanelCard from "@/components/PanelCard"

const MAX_PANELS = 6
const MIN_PANELS = 3

export default function PlanPage() {
  const router = useRouter()
  const { today, createDay, lockPlan } = useToday()
  const { recordPlan } = useStreaks()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedType, setSelectedType] = useState<DayType | null>(null)
  const [panels, setPanels] = useState<Panel[]>([])

  // Guard: already locked
  if (today?.planCreatedAt) {
    return (
      <main className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center gap-4 p-6">
        <p className="font-body text-lg text-text-muted">Today&apos;s story is already locked.</p>
        <a href="/" className="text-accent font-body text-sm underline">Go to today →</a>
      </main>
    )
  }

  function selectDayType(type: DayType) {
    setSelectedType(type)
    const template = type === "school" ? SCHOOL_DAY_TEMPLATE : HOME_DAY_TEMPLATE
    setPanels(templateToPanels(template))
    setStep(2)
  }

  function handlePanelChange(index: number, updated: Panel) {
    setPanels(prev => prev.map((p, i) => (i === index ? updated : p)))
  }

  function handleAddPanel() {
    if (panels.length >= MAX_PANELS) return
    const lastIndex = panels.length - 1
    const newPanel: Panel = {
      id: generateId(),
      name: "",
      anchor: "middle",
      focus: "",
      tasks: [],
      treat: "",
    }
    setPanels(prev => [
      ...prev.slice(0, lastIndex),
      newPanel,
      ...prev.slice(lastIndex),
    ])
  }

  function handleRemovePanel(index: number) {
    if (panels.length <= MIN_PANELS) return
    setPanels(prev => prev.filter((_, i) => i !== index))
  }

  async function handleStart() {
    if (!selectedType || !canStart) return
    if (!today) {
      createDay({ date: todayISO(), type: selectedType, panels })
    } else {
      lockPlan(panels)
    }
    recordPlan()
    router.push("/")
  }

  const canStart = panels.length > 0 && panels.every(p => p.focus.trim() !== "")

  if (step === 1) {
    return (
      <main className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center gap-8 p-6">
        <div className="text-center">
          <h1 className="font-display text-4xl text-text-primary mb-2">{COPY.startOfDay}</h1>
          <p className="font-body text-text-muted text-lg">What kind of day is it?</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          {(
            [
              { type: "school" as DayType, label: "School Day", emoji: "🏫" },
              { type: "home" as DayType, label: "Home Day", emoji: "🏠" },
            ] as const
          ).map(({ type, label, emoji }) => (
            <button
              key={type}
              onClick={() => selectDayType(type)}
              className="flex-1 flex flex-col items-center justify-center gap-3 p-8 bg-surface border-2 border-border rounded-sm font-body text-text-primary hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <span className="text-4xl">{emoji}</span>
              <span className="text-lg font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-text-primary pb-28">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setStep(1)}
          className="font-body text-sm text-text-muted hover:text-accent transition-colors"
        >
          ← Change
        </button>
        <span className="font-body text-sm text-text-primary px-2 py-0.5 bg-surface border border-border rounded-sm">
          {selectedType === "school" ? "🏫 School Day" : "🏠 Home Day"}
        </span>
      </div>

      {/* Panel list */}
      <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto">
        {panels.map((panel, index) => (
          <div key={panel.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-1">
              {panel.timeLabel ? (
                <span className="font-body text-xs text-text-muted">{panel.timeLabel}</span>
              ) : (
                <span />
              )}
              {panel.anchor === "middle" && (
                <button
                  onClick={() => handleRemovePanel(index)}
                  disabled={panels.length <= MIN_PANELS}
                  className="font-body text-xs text-text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Remove panel"
                >
                  × Remove panel
                </button>
              )}
            </div>
            <PanelCard
              panel={panel}
              mode="plan"
              onPanelChange={updated => handlePanelChange(index, updated)}
            />
          </div>
        ))}

        <button
          onClick={handleAddPanel}
          disabled={panels.length >= MAX_PANELS}
          className="w-full py-3 border-2 border-dashed border-border rounded-sm font-body text-sm text-text-muted hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Add panel +
        </button>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-4 rounded-sm font-display text-xl tracking-wide transition-colors ${
            canStart
              ? "bg-accent text-background cursor-pointer hover:bg-accent-soft"
              : "bg-surface text-text-muted cursor-not-allowed"
          }`}
        >
          {COPY.planCTA}
        </button>
      </div>
    </main>
  )
}

