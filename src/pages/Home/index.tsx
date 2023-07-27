import { HandPalm, Play } from 'phosphor-react'

import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import { NewActivityForm } from './components/NewActivityForm'
import { Countdown } from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Activity {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ActivitiesContextType {
  activeActivity: Activity | undefined
  activeActivityID: string | null
  activeActivityName: string | null
  markCurrentActivityAsFinished: () => void
  resetCurrentActivity: () => void
}

export const ActivitiesContext = createContext({} as ActivitiesContextType)

export function Home() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeActivityID, setActiveActivityID] = useState<string | null>(null)

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    null,
  )

  const activeActivity = activities.find((item) => item.id === activeActivityID)

  const activeTaskName = activities.find(
    (item) => item.task === activeActivityName,
  )

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

  // function handleCreateNewActivity(data: NewActivityFormProps) {
  //   const newActivity: Activity = {
  //     id: String(new Date().getTime()),
  //     task: data.taskDescription,
  //     duration: data.timeAmount,
  //     startDate: new Date(),
  //   }

  //   setActivities((state) => [...state, newActivity])
  //   setActiveActivityID(newActivity.id)
  //   setActiveActivityName(newActivity.task)
  //   setSecondsTimerPassed(0)

  //   reset()
  // }

  function handleInterruptActivity() {
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

  // Declarative const, explaining the condition is being watched.

  // const inputTaskDescriptionHasContent = watch('taskDescription')

  return (
    <HomeContainer>
      {/* A function => to => execute a function // This is like registering the function/event */}
      <form /* onSubmit={handleSubmit(handleCreateNewActivity)} */>
        <ActivitiesContext.Provider
          value={{
            activeActivity,
            activeActivityID,
            activeActivityName,
            markCurrentActivityAsFinished,
            resetCurrentActivity,
          }}
        >
          {/* <NewActivityForm /> */}
          <Countdown />
        </ActivitiesContext.Provider>

        {activeActivity ? (
          <StopCountdownButton type="button" onClick={handleInterruptActivity}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            /* disabled={!inputTaskDescriptionHasContent} */
            type="submit"
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
