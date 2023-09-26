import { ReactNode, createContext, useState, useReducer } from 'react'

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

interface ActivitiesContextProviderProps {
  children: ReactNode
}

export function ActivitiesContextProvider({
  children,
}: ActivitiesContextProviderProps) {
  const [activities, dispatch] = useReducer(
    (state: Activity[], action: any) => {
      if (action.type === 'ADD_NEW_ACTIVITY') {
        return [...state, action.payload.newActivity]
      }

      return state
    },
    [],
  )

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
    dispatch({
      type: 'MARK_CURRENT_ACTIVITY_AS_FINISHED',
      payload: {
        activeActivityID,
      },
    })

    /* setActivities((state) =>
      state.map((item) => {
        if (item.id === activeActivityID) {
          return { ...item, finishedDate: new Date() }
        } else {
          return item
        }
      }),
    ) */
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

    dispatch({
      type: 'ADD_NEW_ACTIVITY',
      payload: {
        newActivity,
      },
    })

    // setActivities((state) => [...state, newActivity])
    setActiveActivityID(newActivity.id)
    setActiveActivityName(newActivity.task)
    setSecondsTimerPassed(0)
  }

  function interruptCurrentActivity() {
    dispatch({
      type: 'INTERRUPT_CURRENT_ACTIVITY',
      payload: {
        activeActivityID,
      },
    })

    /*     setActivities((state) =>
      state.map((item) => {
        if (item.id === activeActivityID) {
          return { ...item, interruptedDate: new Date() }
        } else {
          return item
        }
      }),
    )
    */

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
