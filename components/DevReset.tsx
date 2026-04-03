"use client"

export default function DevReset() {
  if (process.env.NODE_ENV !== "development") return null

  function handleReset() {
    Object.keys(localStorage)
      .filter(k => k.startsWith("yonkoma"))
      .forEach(k => localStorage.removeItem(k))
    window.location.href = "/"
  }

  return (
    <button
      onClick={handleReset}
      title="Clear all app data (dev only)"
      className="fixed bottom-4 left-4 z-50 text-xs font-body px-2 py-1 rounded bg-red-900/80 text-red-300 border border-red-700 hover:bg-red-800 transition-colors"
    >
      ⚠ Reset data
    </button>
  )
}
