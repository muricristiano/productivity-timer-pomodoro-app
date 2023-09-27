import { Activity } from './reducer'

export enum ActionTypes {
  ADD_NEW_ACTIVITY = 'ADD_NEW_ACTIVITY',
  MARK_CURRENT_ACTIVITY_AS_FINISHED = 'MARK_CURRENT_ACTIVITY_AS_FINISHED',
  INTERRUPT_CURRENT_ACTIVITY = 'INTERRUPT_CURRENT_ACTIVITY',
}

export function addNewActivityAction(newActivity: Activity) {
  return {
    type: ActionTypes.ADD_NEW_ACTIVITY,
    payload: {
      newActivity,
    },
  }
}

export function markCurrentActivityAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_ACTIVITY_AS_FINISHED,
  }
}

export function interruptCurrentActivityAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_ACTIVITY,
  }
}
