"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToday } from "@/hooks/useToday"
import { useStreaks } from "@/hooks/useStreaks"
import { COPY } from "@/lib/copy"
import { todayISO, formatDisplayDate } from "@/lib/utils"
import Link from "next/link"
import StreakBar from "@/components/StreakBar"
import MangaPage from "@/components/MangaPage"
import ChapterSummary from "@/components/ChapterSummary"

const DAY_TYPE_LABELS: Record<string, string> = {
  school: "🏫 School Day",
  home: "🏠 Home Day",
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { today, toggleTask } = useToday()
  const { meta } = useStreaks()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  // State 3 — Reflection complete
  if (today?.reflectedAt) {
    return (
      <main className="min-h-screen bg-background text-text-primary px-4 py-8 max-w-2xl mx-auto relative">
        <Link href="/history" className="absolute top-4 right-4 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
          History →
        </Link>
        <ChapterSummary
          day={today}
          planStreak={meta.planStreak}
          reflectStreak={meta.reflectStreak}
        />
      </main>
    )
  }

  // State 2 — Plan locked, reflection not complete
  if (today) {
    const completedCount = today.panels.filter(p => p.completedAt).length
    const totalCount = today.panels.length
    const canReflect =
      today.panels.every(p => p.completedAt) || new Date().getHours() >= 18

    return (
      <main className="min-h-screen bg-background text-text-primary px-4 py-8 max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted font-body">
            {formatDisplayDate(today.date)}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-body px-2 py-1 rounded-full bg-surface border border-border text-text-muted">
              {DAY_TYPE_LABELS[today.type] ?? today.type}
            </span>
            <Link href="/history" className="font-body text-sm text-text-muted hover:text-text-primary transition-colors">
              History →
            </Link>
          </div>
        </div>

        {/* Streak bar */}
        <StreakBar planStreak={meta.planStreak} reflectStreak={meta.reflectStreak} />

        {/* Manga page */}
        <MangaPage
          panels={today.panels}
          mode="active"
          onToggleTask={(panelId, taskId) => toggleTask(panelId, taskId)}
        />

        {/* Progress summary */}
        <p className="text-sm text-text-muted font-body text-center">
          {completedCount} of {totalCount} panels complete
        </p>

        {/* Reflect CTA */}
        <button
          disabled={!canReflect}
          onClick={() => router.push("/reflect")}
          className={`w-full py-3 rounded-sm font-display text-lg tracking-wide transition-colors ${
            canReflect
              ? "bg-accent text-surface hover:opacity-90"
              : "bg-surface text-text-muted cursor-not-allowed border border-border"
          }`}
        >
          {COPY.reflectPromptCTA}
        </button>
      </main>
    )
  }

  // State 1 — No plan today
  return (
    <main className="min-h-screen bg-background text-text-primary px-4 py-8 max-w-2xl mx-auto flex flex-col gap-8 items-center justify-center relative">
      <Link href="/history" className="absolute top-4 right-4 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
        History →
      </Link>
      <h1 className="font-display text-5xl md:text-6xl text-accent text-center tracking-wide">
        {COPY.startOfDay}
      </h1>

      <StreakBar planStreak={meta.planStreak} reflectStreak={meta.reflectStreak} />

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => router.push("/plan")}
          className="bg-accent text-surface font-display text-xl px-8 py-4 rounded-sm hover:opacity-90 transition-opacity tracking-wide"
        >
          Plan today&apos;s page →
        </button>
        <span className="text-sm text-text-muted font-body">
          {formatDisplayDate(todayISO())}
        </span>
      </div>
    </main>
  )
}
