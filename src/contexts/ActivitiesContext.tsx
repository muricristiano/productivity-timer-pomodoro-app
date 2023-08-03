import { ReactNode, createContext, useState } from 'react'

interface CreateActivityData {
  taskDescription: string
  timeAmount: number
}

interface Activity {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ActivitiesContextType {
  activities: Activity[]
  activeActivity: Activity | undefined
  activeActivityID: string | null
  activeActivityName: string | null
  secondsTimerPassed: number
  markCurrentActivityAsFinished: () => void
  resetCurrentActivity: () => void
  updateSecondsTimerPassed: (seconds: number) => void
  createNewActivity: (data: CreateActivityData) => void
  interruptCurrentActivity: () => void
}

export const ActivitiesContext = createContext({} as ActivitiesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function ActivitiesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  const [activeActivityID, setActiveActivityID] = useState<string | null>(null)

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    null,
  )

  const [secondsTimerPassed, setSecondsTimerPassed] = useState(0)

  const activeActivity = activities.find((item) => item.id === activeActivityID)
  /*   const activeTaskName = activities.find(
    (item) => item.task === activeActivityName,
  ) */

  function resetCurrentActivity() {
    setActiveActivityID(null) // Clear action
  }

  function markCurrentActivityAsFinished() {
    setActivities((state) =>
      state.map((item) => {
        if (item.id === activeActivityID) {
          return { ...item, finishedDate: new Date() }
        } else {
          return item
        }
      }),
    )
  }

  function updateSecondsTimerPassed(seconds: number) {
    setSecondsTimerPassed(seconds)
  }

  function createNewActivity(data: CreateActivityData) {
    const newActivity: Activity = {
      id: String(new Date().getTime()),
      task: data.taskDescription,
      duration: data.timeAmount,
      startDate: new Date(),
    }

    setActivities((state) => [...state, newActivity])
    setActiveActivityID(newActivity.id)
    setActiveActivityName(newActivity.task)
    setSecondsTimerPassed(0)
  }

  function interruptCurrentActivity() {
    setActivities((state) =>
      state.map((item) => {
        if (item.id === activeActivityID) {
          return { ...item, interruptedDate: new Date() }
        } else {
          return item
        }
      }),
    )

    setActiveActivityID(null) // Clear action
    document.title = 'Pomodoro - Productivity Timer'
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        activeActivity,
        activeActivityID,
        activeActivityName,
        secondsTimerPassed,
        markCurrentActivityAsFinished,
        resetCurrentActivity,
        updateSecondsTimerPassed,
        createNewActivity,
        interruptCurrentActivity,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
