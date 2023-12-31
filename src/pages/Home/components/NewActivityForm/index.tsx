import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ActivitiesContext } from '../../../../contexts/ActivitiesContext'

export function NewActivityForm() {
  const { activeActivity } = useContext(ActivitiesContext)
  const { register } = useFormContext()

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
        <option value="Work" />
        <option value="Study" />
        <option value="Research" />
        <option value="Plan" />
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
