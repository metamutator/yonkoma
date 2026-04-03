"use client"

import Link from "next/link"
import type { Day } from "@/lib/types"
import { COPY } from "@/lib/copy"
import MangaPage from "./MangaPage"
import StreakBar from "./StreakBar"

type Props = {
  day: Day
  planStreak: number
  reflectStreak: number
}

export default function ChapterSummary({ day, planStreak, reflectStreak }: Props) {
  return (
    <div className="font-body flex flex-col gap-6">
      {/* Heading */}
      <h1 className="font-display text-4xl md:text-5xl text-accent tracking-wide">
        {COPY.panelDone}
      </h1>

      {/* Manga page in summary mode (read-only) */}
      <MangaPage panels={day.panels} mode="summary" />

      {/* Streak update */}
      <p className="text-text-primary text-base">
        🔥 {COPY.streakMilestone(planStreak)}
      </p>

      {/* Streak bars */}
      <StreakBar planStreak={planStreak} reflectStreak={reflectStreak} />

      {/* Closing narrator caption box */}
      <div className="border border-border-strong bg-surface px-4 py-3 rounded-sm">
        <p className="italic text-text-primary text-sm">{COPY.chapterClosing}</p>
      </div>

      {/* History link */}
      <Link
        href="/history"
        className="text-accent hover:text-accent-soft transition-colors text-sm font-semibold"
      >
        See history →
      </Link>
    </div>
  )
}
