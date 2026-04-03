export const COPY = {
  startOfDay: "A new page begins.",
  taskCompleted: "Panel in progress… 🟩",
  panelDone: "Chapter complete!",
  moodPrompt: "How did this panel feel?",
  historyHeader: "Your story so far…",
  streakMilestone: (days: number) => `Plot twist: you showed up ${days} days in a row.`,
  emptyHistory: "Your manga hasn't started yet. Plan your first day.",
  chapterClosing: "Chapter complete. See you tomorrow.",
  planCTA: "Start your story",
  reflectCTA: "Complete chapter",
  reflectPromptCTA: "Reflect on today",
} as const
