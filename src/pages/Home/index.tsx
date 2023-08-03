import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewActivityForm } from './components/NewActivityForm'
import { Countdown } from './components/Countdown'
import { ActivitiesContext } from '../../contexts/ActivitiesContext'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newActivityFormValidationSchemaZod = zod.object({
  taskDescription: zod.string().min(1, 'Inform your activity'),
  timeAmount: zod
    .number()
    .min(1, 'Inform a time between 1 and 90 minutes')
    .max(90, 'Inform a time between 1 and 90 minutes'),
})

type NewActivityFormProps = zod.infer<typeof newActivityFormValidationSchemaZod>

export function Home() {
  const { createNewActivity, interruptCurrentActivity, activeActivity } =
    useContext(ActivitiesContext)

  const newActivityForm = useForm<NewActivityFormProps>({
    resolver: zodResolver(newActivityFormValidationSchemaZod),
    defaultValues: {
      taskDescription: '',
      timeAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newActivityForm

  function handleCreateNewActivity(data: NewActivityFormProps) {
    createNewActivity(data)
    reset()
  }

  // Declarative const, explaining the condition is being watched.
  const inputTaskDescriptionHasContent = watch('taskDescription')

  return (
    <HomeContainer>
      {/* A function => to => execute a function // This is like registering the function/event */}
      <form onSubmit={handleSubmit(handleCreateNewActivity)}>
        <FormProvider {...newActivityForm}>
          <NewActivityForm />
        </FormProvider>
        <Countdown />
        {activeActivity ? (
          <StopCountdownButton type="button" onClick={interruptCurrentActivity}>
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
