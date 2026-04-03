"use client"

import { COPY } from "@/lib/copy"

type Props = {
  days: number
  type: "plan" | "reflect"
  onDismiss: () => void
}

// SVG speed-lines pattern for manga effect
function SpeedLines() {
  const lines = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360
    const rad = (angle * Math.PI) / 180
    const x1 = 50 + 5 * Math.cos(rad)
    const y1 = 50 + 5 * Math.sin(rad)
    const x2 = 50 + 70 * Math.cos(rad)
    const y2 = 50 + 70 * Math.sin(rad)
    return { x1, y1, x2, y2 }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full opacity-10"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#4ADE80"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export default function MilestoneFlash({ days, type, onDismiss }: Props) {
  const typeLabel = type === "plan" ? "Planning streak" : "Reflection streak"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm cursor-pointer"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label={`${typeLabel} milestone: ${days} days`}
    >
      <SpeedLines />

      <div
        className="relative z-10 flex flex-col items-center gap-4 text-center px-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Milestone number */}
        <div className="flex flex-col items-center leading-none">
          <span className="font-display text-accent"
            style={{ fontSize: "clamp(5rem, 20vw, 9rem)" }}>
            {days}
          </span>
          <span className="font-display text-text-primary text-3xl tracking-widest uppercase">
            Day Streak!
          </span>
        </div>

        {/* Type label */}
        <p className="font-body text-text-muted text-sm uppercase tracking-widest">
          {typeLabel}
        </p>

        {/* Milestone copy */}
        <p className="font-body text-text-primary text-lg max-w-xs border-2 border-border bg-surface px-6 py-4 rounded-sm">
          {COPY.streakMilestone(days)}
        </p>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="font-display text-accent border-2 border-accent px-8 py-3 rounded-sm hover:bg-accent hover:text-background transition-colors mt-2"
        >
          Keep going →
        </button>
      </div>
    </div>
  )
}
