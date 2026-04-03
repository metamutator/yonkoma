"use client"
import { useLocalStorage } from "./useLocalStorage"
import { Day, Panel, Task } from "@/lib/types"
import { todayISO, generateId } from "@/lib/utils"

export function useToday() {
  const [days, setDays] = useLocalStorage<Day[]>("yonkoma-days", [])

  const todayDate = todayISO()
  const today = days.find(d => d.date === todayDate) ?? null

  function createDay(day: Omit<Day, "planCreatedAt">) {
    const newDay: Day = { ...day, planCreatedAt: new Date().toISOString() }
    setDays(prev => [...prev.filter(d => d.date !== todayDate), newDay])
  }

  function updateToday(updater: (day: Day) => Day) {
    if (!today) return
    setDays(prev => prev.map(d => d.date === todayDate ? updater(d) : d))
  }

  function toggleTask(panelId: string, taskId: string) {
    updateToday(day => ({
      ...day,
      panels: day.panels.map(p => {
        if (p.id !== panelId) return p
        const updatedTasks = p.tasks.map(t =>
          t.id === taskId ? { ...t, done: !t.done } : t
        )
        const allDone = updatedTasks.length > 0 && updatedTasks.every(t => t.done)
        return {
          ...p,
          tasks: updatedTasks,
          completedAt: allDone && !p.completedAt ? new Date().toISOString() : p.completedAt,
        }
      }),
    }))
  }

  function setPanelMood(panelId: string, mood: Panel["mood"]) {
    updateToday(day => ({
      ...day,
      panels: day.panels.map(p => p.id === panelId ? { ...p, mood } : p),
    }))
  }

  function completeReflection() {
    updateToday(day => ({ ...day, reflectedAt: new Date().toISOString() }))
  }

  function markPanelComplete(panelId: string) {
    updateToday(day => ({
      ...day,
      panels: day.panels.map(p =>
        p.id === panelId && !p.completedAt
          ? { ...p, completedAt: new Date().toISOString() }
          : p
      ),
    }))
  }

  function lockPlan(panels: Panel[]) {
    updateToday(day => ({ ...day, panels, planCreatedAt: new Date().toISOString() }))
  }

  return { today, days, createDay, updateToday, toggleTask, setPanelMood, completeReflection, lockPlan, markPanelComplete }
}
