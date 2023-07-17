import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: object) {
    console.log(data)
  }

  // Declarative const, explaining the condition is being watched.
  const inputTaskDescriptionHasContent = watch('task-description')

  return (
    <HomeContainer>
      {/* A function => to => execute a function // This is like registering the function/event */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task"> Activity: </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="What are you going to work on?"
            list="task-suggestions"
            {...register('task-description')}
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
            min={5}
            max={90}
            step={5}
            {...register('minutesAmount', { valueAsNumber: true })}
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
