import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newActivityFormValidationSchemaZod = zod.object({
  taskDescription: zod.string().min(1, 'Inform your activity'),
  timeAmount: zod
    .number()
    .min(5, 'Inform a time between 5 and 90 minutes')
    .max(90, 'Inform a time between 5 and 90 minutes'),
})

type NewActivityFormProps = zod.infer<typeof newActivityFormValidationSchemaZod>

interface Activity {
  id: string
  task: string
  duration: number
}

export function Home() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeActivityID, setActiveActivityID] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } =
    useForm<NewActivityFormProps>({
      resolver: zodResolver(newActivityFormValidationSchemaZod),
      defaultValues: {
        taskDescription: '',
        timeAmount: 0,
      },
    })

  function handleCreateNewActivity(data: NewActivityFormProps) {
    const newActivity: Activity = {
      id: String(new Date().getTime()),
      task: data.taskDescription,
      duration: data.timeAmount,
    }

    setActivities((state) => [...state, newActivity])
    setActiveActivityID(newActivity.id)
    reset()
  }

  const activeActivity = activities.find((item) => item.id === activeActivityID)

  console.log(activeActivity)

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
            // step={5}
            {...register('timeAmount', { valueAsNumber: true })}
          />

          <span> minutes. </span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton
          disabled={!inputTaskDescriptionHasContent}
          type="submit"
        >
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
