import { Panel } from "./types"

type PanelTemplate = Pick<Panel, "id" | "name" | "anchor" | "timeLabel">

export const SCHOOL_DAY_TEMPLATE: PanelTemplate[] = [
  { id: "s1", name: "Rise & Go",    anchor: "first",  timeLabel: "6:30–7:20AM" },
  { id: "s2", name: "After School", anchor: "middle", timeLabel: "2:30–4:00PM" },
  { id: "s3", name: "Focus Time",   anchor: "middle", timeLabel: "4:00–6:00PM" },
  { id: "s4", name: "Wind Down",    anchor: "last",   timeLabel: "6:00–9:30PM" },
]

export const HOME_DAY_TEMPLATE: PanelTemplate[] = [
  { id: "h1", name: "Slow Morning",    anchor: "first",  timeLabel: "Wake–10:00AM"    },
  { id: "h2", name: "Morning Focus",   anchor: "middle", timeLabel: "10:00AM–12:30PM" },
  { id: "h3", name: "Afternoon Drift", anchor: "middle", timeLabel: "12:30–4:00PM"    },
  { id: "h4", name: "Tea & Recharge",  anchor: "middle", timeLabel: "4:00–6:00PM"     },
  { id: "h5", name: "Evening Close",   anchor: "last",   timeLabel: "6:00–9:30PM"     },
]

export function templateToPanels(template: PanelTemplate[]): Panel[] {
  return template.map(t => ({
    ...t,
    focus: "",
    tasks: [],
    treat: "",
  }))
}
