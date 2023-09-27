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

export enum ActionTypes {
  ADD_NEW_ACTIVITY = 'ADD_NEW_ACTIVITY',
  MARK_CURRENT_ACTIVITY_AS_FINISHED = 'MARK_CURRENT_ACTIVITY_AS_FINISHED',
  INTERRUPT_CURRENT_ACTIVITY = 'INTERRUPT_CURRENT_ACTIVITY',
}

export function activitiesReducer(
  state: activitiesReducerInterface,
  action: any,
) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload.newActivity],
        activeActivityID: action.payload.newActivity.id,
      }

    case ActionTypes.MARK_CURRENT_ACTIVITY_AS_FINISHED:
      return {
        ...state,
        activities: state.activities.map((item) => {
          if (item.id === state.activeActivityID) {
            return { ...item, finishedDate: new Date() }
          } else {
            return item
          }
        }),
        activeActivityID: null,
      }

    case ActionTypes.INTERRUPT_CURRENT_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((item) => {
          if (item.id === state.activeActivityID) {
            return { ...item, interruptedDate: new Date() }
          } else {
            return item
          }
        }),
        activeActivityID: null,
      }

    default:
      return state
  }
}
