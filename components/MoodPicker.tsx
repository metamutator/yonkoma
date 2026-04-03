"use client"

import { useState, useEffect } from "react"

type Mood = "happy" | "neutral" | "sad"

type Props = {
  selected?: Mood
  onChange?: (mood: Mood) => void
  readOnly?: boolean
}

const MOODS: { mood: Mood; label: string }[] = [
  { mood: "happy", label: "Felt good" },
  { mood: "neutral", label: "It was okay" },
  { mood: "sad", label: "Tough one" },
]

function HappyFace() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* curved-up eyes */}
      <path d="M15 20 Q17 17 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M29 20 Q31 17 33 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* big smile */}
      <path d="M16 29 Q24 37 32 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function NeutralFace() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* straight eyes */}
      <line x1="15" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="19" x2="33" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* flat mouth */}
      <line x1="17" y1="31" x2="31" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SadFace() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* curved-down eyes */}
      <path d="M15 18 Q17 21 19 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M29 18 Q31 21 33 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* small frown */}
      <path d="M17 32 Q24 27 31 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

const FACE_MAP: Record<Mood, React.FC> = {
  happy: HappyFace,
  neutral: NeutralFace,
  sad: SadFace,
}

export default function MoodPicker({ selected, onChange, readOnly = false }: Props) {
  const [bounceMood, setBounceMood] = useState<Mood | null>(null)

  useEffect(() => {
    if (selected) {
      setBounceMood(selected)
      const timer = setTimeout(() => setBounceMood(null), 300)
      return () => clearTimeout(timer)
    }
  }, [selected])

  return (
    <div className="font-body flex gap-4 items-end">
      {MOODS.map(({ mood, label }) => {
        const Face = FACE_MAP[mood]
        const isSelected = selected === mood
        return (
          <button
            key={mood}
            onClick={() => !readOnly && onChange?.(mood)}
            disabled={readOnly}
            className={`flex flex-col items-center gap-1 transition-all select-none ${
              readOnly ? "cursor-default" : "cursor-pointer hover:opacity-80"
            } ${bounceMood === mood ? "animate-moodbounce" : ""}`}
            aria-label={label}
            aria-pressed={isSelected}
          >
            <div
              className={`w-12 h-12 rounded-full transition-all ${
                isSelected
                  ? "scale-125 border-2 border-accent text-text-primary"
                  : "opacity-50 border-2 border-transparent text-text-muted"
              }`}
            >
              <Face />
            </div>
            <span className={`text-xs ${isSelected ? "text-text-primary" : "text-text-muted"}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
