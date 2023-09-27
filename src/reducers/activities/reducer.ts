import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Activity {
  id: string
  task: string
  duration: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface activitiesReducerInterface {
  activities: Activity[]
  activeActivityID: string | null
}

export function activitiesReducer(
  state: activitiesReducerInterface,
  action: any,
) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ACTIVITY:
      return produce(state, (draft) => {
        draft.activities.push(action.payload.newActivity)
        draft.activeActivityID = action.payload.newActivity.id
      })

    case ActionTypes.MARK_CURRENT_ACTIVITY_AS_FINISHED:
      return produce(state, (draft) => {
        const currentActivityIndex = draft.activities.findIndex((item) => {
          return item.id === draft.activeActivityID
        })

        if (currentActivityIndex < 0) {
          return state
        }

        draft.activities[currentActivityIndex].finishedDate = new Date()
        draft.activeActivityID = null
      })

    case ActionTypes.INTERRUPT_CURRENT_ACTIVITY:
      return produce(state, (draft) => {
        const currentActivityIndex = draft.activities.findIndex((item) => {
          return item.id === draft.activeActivityID
        })

        if (currentActivityIndex < 0) {
          return state
        }

        draft.activities[currentActivityIndex].interruptedDate = new Date()
        draft.activeActivityID = null
      })

    default:
      return state
  }
}
