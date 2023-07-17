import { Play } from 'phosphor-react'
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
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Activity: </label>
          <TaskInput
            type="text"
            id="task"
            name="taskInputName"
            placeholder="What are you going to work on?"
            list="task-suggestions"
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
            name=""
            id="timeAmount"
            placeholder="00"
            min={5}
            max={90}
            step={5}
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
