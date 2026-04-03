"use client"

type Props = {
  planStreak: number
  reflectStreak: number
}

const DAYS = 7

function Bar({ label, count }: { label: string; count: number }) {
  const filled = Math.min(count, DAYS)
  return (
    <div className="flex items-center gap-3 font-body">
      <span className="text-sm text-text-muted w-28 flex-shrink-0">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: DAYS }, (_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-sm border ${
              i < filled
                ? "bg-accent border-accent"
                : "bg-surface border-border"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="font-display text-accent text-lg leading-none">{count}</span>
    </div>
  )
}

export default function StreakBar({ planStreak, reflectStreak }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Bar label="Plan streak" count={planStreak} />
      <Bar label="Reflect streak" count={reflectStreak} />
    </div>
  )
}
