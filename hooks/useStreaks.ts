"use client"
import { useLocalStorage } from "./useLocalStorage"
import { Meta } from "@/lib/types"
import { todayISO } from "@/lib/utils"

const DEFAULT_META: Meta = {
  planStreak: 0,
  reflectStreak: 0,
  lastPlanDate: "",
  lastReflectDate: "",
}

function isConsecutive(lastDate: string, today: string): boolean {
  if (!lastDate) return false
  const last = new Date(lastDate)
  const tod = new Date(today)
  const diff = (tod.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  return diff === 1
}

export function useStreaks() {
  const [meta, setMeta] = useLocalStorage<Meta>("yonkoma-meta", DEFAULT_META)

  function recordPlan() {
    const today = todayISO()
    if (meta.lastPlanDate === today) return // already recorded today
    setMeta(m => ({
      ...m,
      planStreak: isConsecutive(m.lastPlanDate, today) ? m.planStreak + 1 : 1,
      lastPlanDate: today,
    }))
  }

  function recordReflect() {
    const today = todayISO()
    if (meta.lastReflectDate === today) return
    setMeta(m => ({
      ...m,
      reflectStreak: isConsecutive(m.lastReflectDate, today) ? m.reflectStreak + 1 : 1,
      lastReflectDate: today,
    }))
  }

  return { meta, recordPlan, recordReflect }
}
