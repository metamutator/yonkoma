export type DayType = "school" | "home"

export type Task = {
  id: string
  label: string
  done: boolean
}

export type Panel = {
  id: string
  name: string
  anchor: "first" | "last" | "middle"
  timeLabel?: string
  focus: string
  tasks: Task[]
  treat: string
  mood?: "happy" | "neutral" | "sad"
  completedAt?: string  // ISO timestamp
}

export type Day = {
  date: string           // "YYYY-MM-DD"
  type: DayType
  panels: Panel[]
  planCreatedAt: string  // ISO timestamp
  reflectedAt?: string   // ISO timestamp
}

export type Meta = {
  planStreak: number
  reflectStreak: number
  lastPlanDate: string   // "YYYY-MM-DD"
  lastReflectDate: string // "YYYY-MM-DD"
}
