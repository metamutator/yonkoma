"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useToday } from "@/hooks/useToday"
import { useStreaks } from "@/hooks/useStreaks"
import StreakBar from "@/components/StreakBar"
import MilestoneFlash from "@/components/MilestoneFlash"
import MoodPicker from "@/components/MoodPicker"
import { COPY } from "@/lib/copy"
import { todayISO, formatDisplayDate } from "@/lib/utils"
import { Day } from "@/lib/types"

const MILESTONE_THRESHOLDS = [3, 7, 14, 30]
const MILESTONES_KEY = "yonkoma-milestones"

type ShownMilestones = { plan: number[]; reflect: number[] }

function getShownMilestones(): ShownMilestones {
  try {
    const raw = window.localStorage.getItem(MILESTONES_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { plan: [], reflect: [] }
}

function saveShownMilestones(data: ShownMilestones) {
  try {
    window.localStorage.setItem(MILESTONES_KEY, JSON.stringify(data))
  } catch {}
}

const DAY_TYPE_LABEL: Record<string, string> = {
  school: "🏫 School Day",
  home: "🏠 Home Day",
}

function PastDayCard({ day }: { day: Day }) {
  const treats = day.panels.map(p => p.treat).filter(Boolean)

  return (
    <div className="bg-surface border-2 border-border rounded-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="font-display text-text-primary text-base">
          {formatDisplayDate(day.date)}
        </span>
        <span className="text-text-muted text-sm">•</span>
        <span className="font-body text-text-muted text-sm">
          {DAY_TYPE_LABEL[day.type] ?? day.type}
        </span>
      </div>

      {/* Panels */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {day.panels.map(panel => (
          <div key={panel.id} className="flex items-center justify-between gap-3">
            <span className="font-body text-text-primary text-sm flex-1 truncate">
              {panel.name}
            </span>
            {panel.mood && (
              <div className="flex-shrink-0">
                <MoodPicker selected={panel.mood} readOnly />
              </div>
            )}
          </div>
        ))}

        {/* Treats */}
        {treats.length > 0 && (
          <div className="mt-1 pt-2 border-t border-border">
            {treats.map((treat, i) => (
              <p key={i} className="font-body text-text-muted text-xs italic">
                Treat: &ldquo;{treat}&rdquo;
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false)
  const { days } = useToday()
  const { meta } = useStreaks()

  type ActiveFlash = { days: number; type: "plan" | "reflect" } | null
  const [activeFlash, setActiveFlash] = useState<ActiveFlash>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check milestone on mount (after hydration)
  useEffect(() => {
    if (!mounted) return
    const shown = getShownMilestones()
    const { planStreak, reflectStreak } = meta

    const planMilestone = MILESTONE_THRESHOLDS.find(
      t => planStreak === t && !shown.plan.includes(t)
    )
    if (planMilestone !== undefined) {
      setActiveFlash({ days: planMilestone, type: "plan" })
      return
    }

    const reflectMilestone = MILESTONE_THRESHOLDS.find(
      t => reflectStreak === t && !shown.reflect.includes(t)
    )
    if (reflectMilestone !== undefined) {
      setActiveFlash({ days: reflectMilestone, type: "reflect" })
    }
  }, [mounted, meta])

  function handleDismiss() {
    if (!activeFlash) return
    const shown = getShownMilestones()
    if (activeFlash.type === "plan") {
      shown.plan = [...shown.plan, activeFlash.days]
    } else {
      shown.reflect = [...shown.reflect, activeFlash.days]
    }
    saveShownMilestones(shown)
    setActiveFlash(null)
  }

  if (!mounted) return null

  const today = todayISO()
  const pastDays = [...days]
    .filter(d => d.date !== today)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      {activeFlash && (
        <MilestoneFlash
          days={activeFlash.days}
          type={activeFlash.type}
          onDismiss={handleDismiss}
        />
      )}

      <main className="min-h-screen bg-background text-text-primary px-4 py-8 max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="font-body text-text-muted text-sm hover:text-text-primary transition-colors"
          >
            ← Today
          </Link>
          <h1 className="font-display text-3xl text-accent mt-2 mb-4">
            {COPY.historyHeader}
          </h1>
          <StreakBar
            planStreak={meta.planStreak}
            reflectStreak={meta.reflectStreak}
          />
        </div>

        {/* Past days list */}
        {pastDays.length === 0 ? (
          <div className="bg-surface border-2 border-border rounded-sm px-6 py-8 text-center">
            <p className="font-body text-text-muted italic">{COPY.emptyHistory}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pastDays.map(day => (
              <PastDayCard key={day.date} day={day} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}

