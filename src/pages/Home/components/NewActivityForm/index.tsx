import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewActivityForm() {
  return (
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
  )
}
