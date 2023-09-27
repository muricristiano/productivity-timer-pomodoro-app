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

interface activitiesReducer {
  activities: Activity[]
  activeActivityID: string | null
}

export function ActivitiesContextProvider({
  children,
}: ActivitiesContextProviderProps) {
  const [activitiesState, dispatch] = useReducer(
    (state: activitiesReducer, action: any) => {
      if (action.type === 'ADD_NEW_ACTIVITY') {
        return {
          ...state,
          activities: [...state.activities, action.payload.newActivity],
          activeActivityID: action.payload.newActivity.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_ACTIVITY') {
        return {
          ...state,
          activities: state.activities.map((item) => {
            if (item.id === state.activeActivityID) {
              return { ...item, interruptedDate: new Date() }
            } else {
              return item
            }
          }),
          activeActivityID: null,
        }
      }

      return state
    },
    {
      activities: [],
      activeActivityID: null,
    },
  )

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    null,
  )

  const [secondsTimerPassed, setSecondsTimerPassed] = useState(0)

  const { activities, activeActivityID } = activitiesState

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
