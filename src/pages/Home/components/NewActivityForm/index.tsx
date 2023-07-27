import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newActivityFormValidationSchemaZod = zod.object({
  taskDescription: zod.string().min(1, 'Inform your activity'),
  timeAmount: zod
    .number()
    .min(1, 'Inform a time between 1 and 90 minutes')
    .max(90, 'Inform a time between 1 and 90 minutes'),
})

type NewActivityFormProps = zod.infer<typeof newActivityFormValidationSchemaZod>

export function NewActivityForm() {
  const { register, handleSubmit, watch, reset } =
    useForm<NewActivityFormProps>({
      resolver: zodResolver(newActivityFormValidationSchemaZod),
      defaultValues: {
        taskDescription: '',
        timeAmount: 0,
      },
    })

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
