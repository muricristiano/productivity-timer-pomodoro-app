import { ReactNode, createContext, useState, useReducer } from 'react'
import { Activity, activitiesReducer } from '../reducers/activities/reducer'
import {
  addNewActivityAction,
  interruptCurrentActivityAction,
  markCurrentActivityAsFinishedAction,
} from '../reducers/activities/actions'

interface CreateActivityData {
  taskDescription: string
  timeAmount: number
}

interface ActivitiesContextType {
  activities: Activity[]
  activeActivity: Activity | undefined
  activeActivityID: string | null
  activeActivityName: string | null
  secondsTimerPassed: number
  markCurrentActivityAsFinished: () => void
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
  const [activitiesState, dispatch] = useReducer(activitiesReducer, {
    activities: [],
    activeActivityID: null,
  })

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    null,
  )
  // const activeTaskName = activities.find(
  //   (item) => item.task === activeActivityName,
  // )

  const [secondsTimerPassed, setSecondsTimerPassed] = useState(0)

  const { activities, activeActivityID } = activitiesState

  const activeActivity = activities.find((item) => item.id === activeActivityID)

  // function resetCurrentActivity() {
  //   setActiveActivityID(null) // Clear action
  // }

  function createNewActivity(data: CreateActivityData) {
    const newActivity: Activity = {
      id: String(new Date().getTime()),
      task: data.taskDescription,
      duration: data.timeAmount,
      startDate: new Date(),
    }

    dispatch(addNewActivityAction(newActivity))

    setActiveActivityName(newActivity.task)
    setSecondsTimerPassed(0)
  }

  function markCurrentActivityAsFinished() {
    dispatch(markCurrentActivityAsFinishedAction())
  }

  function interruptCurrentActivity() {
    dispatch(interruptCurrentActivityAction())
    document.title = 'Pomodoro - Productivity Timer'
  }

  function updateSecondsTimerPassed(seconds: number) {
    setSecondsTimerPassed(seconds)
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
        updateSecondsTimerPassed,
        createNewActivity,
        interruptCurrentActivity,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
