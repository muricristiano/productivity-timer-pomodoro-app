import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import {
  Activity,
  activitiesReducerActions,
} from '../reducers/activities/reducer'
import {
  addNewActivityAction,
  interruptCurrentActivityAction,
  markCurrentActivityAsFinishedAction,
} from '../reducers/activities/actions'
import { differenceInSeconds } from 'date-fns'

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
  const [activitiesState, dispatch] = useReducer(
    activitiesReducerActions,
    {
      activities: [],
      activeActivityID: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@productivity-timer:activities-state-v1.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { activities, activeActivityID } = activitiesState
  const activeActivity = activities.find((item) => item.id === activeActivityID)

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    () => {
      if (activeActivity) {
        return activeActivity.task
      }
      return ''
    },
  )

  const [secondsTimerPassed, setSecondsTimerPassed] = useState(() => {
    if (activeActivity) {
      return differenceInSeconds(new Date(), new Date(activeActivity.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(activitiesState)
    localStorage.setItem('@productivity-timer:activities-state-v1.0', stateJSON)
  }, [activitiesState])

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
