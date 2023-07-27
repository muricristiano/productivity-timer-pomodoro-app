import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

const newActivityFormValidationSchemaZod = zod.object({
  taskDescription: zod.string().min(1, 'Inform your activity'),
  timeAmount: zod
    .number()
    .min(1, 'Inform a time between 1 and 90 minutes')
    .max(90, 'Inform a time between 1 and 90 minutes'),
})

type NewActivityFormProps = zod.infer<typeof newActivityFormValidationSchemaZod>

interface Activity {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeActivityID, setActiveActivityID] = useState<string | null>(null)
  const [secondsTimerPassed, setSecondsTimerPassed] = useState(0)

  // Page Title = Duration + Activity Name
  const [activeActivityName, setActiveActivityName] = useState<string | null>(
    null,
  )

  const { register, handleSubmit, watch, reset } =
    useForm<NewActivityFormProps>({
      resolver: zodResolver(newActivityFormValidationSchemaZod),
      defaultValues: {
        taskDescription: '',
        timeAmount: 0,
      },
    })

  const activeActivity = activities.find((item) => item.id === activeActivityID)
  const activeTaskName = activities.find(
    (item) => item.task === activeActivityName,
  )

  // First, check if there any active activity, then convert the duration to seconds
  const totalActivitySeconds = activeActivity ? activeActivity.duration * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeActivity) {
      interval = setInterval(() => {
        const differenceTime = differenceInSeconds(
          new Date(),
          activeActivity.startDate,
        )

        if (differenceTime >= totalActivitySeconds) {
          setActivities((state) =>
            state.map((item) => {
              if (item.id === activeActivityID) {
                return { ...item, finishedDate: new Date() }
              } else {
                return item
              }
            }),
          )

          setSecondsTimerPassed(totalActivitySeconds)
          clearInterval(interval)
          document.title = `Success! - ${activeActivityName}`
          setActiveActivityID(null) // Clear action
        } else {
          setSecondsTimerPassed(differenceTime)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeActivity,
    totalActivitySeconds,
    activeActivityID,
    activeActivityName,
  ])

  function handleCreateNewActivity(data: NewActivityFormProps) {
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

    reset()
  }

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

  const currentSecondsRemaining = activeActivity
    ? totalActivitySeconds - secondsTimerPassed
    : 0

  const minutesAmount = Math.floor(currentSecondsRemaining / 60)
  const secondsAmount = currentSecondsRemaining % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Page Title: Duration + Task

  useEffect(() => {
    if (activeActivity) {
      document.title = `${minutes}:${seconds} 
    - ${activeTaskName?.task}`
    }
  }, [minutes, seconds, activeActivity, activeTaskName])

  // Declarative const, explaining the condition is being watched.
  const inputTaskDescriptionHasContent = watch('taskDescription')

  return (
    <HomeContainer>
      {/* A function => to => execute a function // This is like registering the function/event */}
      <form onSubmit={handleSubmit(handleCreateNewActivity)}>
        <FormContainer>
          <label htmlFor="task"> Activity: </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="What are you going to work on?"
            list="task-suggestions"
            disabled={!!activeActivity}
            {...register('taskDescription')}
          />

          <datalist id="task-suggestions">
            <option value="Study" />
            <option value="Working on projects" />
            <option value="Research" />
            <option value="Practice Video Editing" />
          </datalist>

          <label htmlFor="timeAmount"> for </label>
          <MinutesAmountInput
            type="number"
            id="timeAmount"
            placeholder="00"
            min={1}
            max={90}
            disabled={!!activeActivity}
            // step={5}
            {...register('timeAmount', { valueAsNumber: true })}
          />

          <span> minutes. </span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeActivity ? (
          <StopCountdownButton type="button" onClick={handleInterruptActivity}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={!inputTaskDescriptionHasContent}
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
