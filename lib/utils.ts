export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function isSameDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10)
}

export function formatDisplayDate(iso: string): string {
  const date = new Date(iso + "T00:00:00")
  return date.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}
