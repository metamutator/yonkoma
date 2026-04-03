"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToday } from "@/hooks/useToday"
import { useStreaks } from "@/hooks/useStreaks"
import { COPY } from "@/lib/copy"
import { todayISO, formatDisplayDate } from "@/lib/utils"
import MoodPicker from "@/components/MoodPicker"
import ChapterSummary from "@/components/ChapterSummary"
import type { Panel } from "@/lib/types"

export default function ReflectPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const router = useRouter()
  const { today, setPanelMood, completeReflection } = useToday()
  const { meta, recordReflect } = useStreaks()

  if (!mounted) return null

  if (!today || !today.planCreatedAt) {
    router.replace("/")
    return null
  }

  if (today.reflectedAt) {
    return (
      <main className="min-h-screen bg-background text-text-primary px-4 py-8 max-w-2xl mx-auto">
        <ChapterSummary
          day={today}
          planStreak={meta.planStreak}
          reflectStreak={meta.reflectStreak}
        />
      </main>
    )
  }

  const allRated = today.panels.every((p: Panel) => p.mood !== undefined)

  async function handleComplete() {
    completeReflection()
    recordReflect()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background text-text-primary px-4 pt-8 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-1">
          How did today&apos;s chapter go?
        </h1>
        <p className="text-text-muted font-body text-sm mb-4">
          {formatDisplayDate(todayISO())}
        </p>
        <div className="inline-block bg-surface border border-border-strong px-3 py-2 rounded-sm">
          <p className="font-body text-xs italic text-text-primary">{COPY.moodPrompt}</p>
        </div>
      </div>

      {/* Panel list */}
      <div>
        {today.panels.map((panel: Panel) => (
          <div
            key={panel.id}
            className="bg-surface border border-border rounded-sm p-4 mb-4"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-base text-text-primary">{panel.name}</span>
                {panel.mood !== undefined && (
                  <span className="text-accent text-sm leading-none">✓</span>
                )}
              </div>
              {panel.timeLabel && (
                <span className="font-body text-xs text-text-muted">{panel.timeLabel}</span>
              )}
            </div>

            {/* Focus */}
            <p className="font-body text-sm text-accent mb-3">{panel.focus || "—"}</p>

            {/* Treat */}
            <p className="font-body text-xs text-text-muted mb-4">
              🎁 {panel.treat || "—"}
            </p>

            {/* MoodPicker */}
            <MoodPicker
              selected={panel.mood}
              onChange={(mood) => setPanelMood(panel.id, mood)}
            />
          </div>
        ))}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleComplete}
            disabled={!allRated}
            className={`w-full font-display text-base py-3 rounded-sm transition-colors ${
              allRated
                ? "bg-accent text-background hover:bg-accent-soft"
                : "bg-surface text-text-muted cursor-not-allowed"
            }`}
          >
            {COPY.reflectCTA}
          </button>
        </div>
      </div>
    </main>
  )
}
