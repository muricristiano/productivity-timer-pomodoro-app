import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { ActivitiesContext } from '../..'

export function Countdown() {
  const {
    activeActivity,
    activeActivityID,
    activeActivityName,
    markCurrentActivityAsFinished,
    resetCurrentActivity,
    secondsTimerPassed,
    updateSecondsTimerPassed,
  } = useContext(ActivitiesContext)

  // First, check if there any active activity, then convert the duration to seconds
  const totalActivitySeconds = activeActivity ? activeActivity.duration * 60 : 0

  const currentSecondsRemaining = activeActivity
    ? totalActivitySeconds - secondsTimerPassed
    : 0

  const minutesAmount = Math.floor(currentSecondsRemaining / 60)
  const secondsAmount = currentSecondsRemaining % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Page Title: Duration + Task
  useEffect(() => {
    if (activeActivity) {
      document.title = `${minutes}:${seconds} 
    - ${activeActivityName}`
    }
  }, [minutes, seconds, activeActivity, activeActivityName])

  useEffect(() => {
    let interval: number

    if (activeActivity) {
      interval = setInterval(() => {
        const differenceTime = differenceInSeconds(
          new Date(),
          activeActivity.startDate,
        )

        if (differenceTime >= totalActivitySeconds) {
          markCurrentActivityAsFinished()
          updateSecondsTimerPassed(totalActivitySeconds)
          clearInterval(interval)
          document.title = `Success! - ${activeActivityName}`
          resetCurrentActivity()
        } else {
          updateSecondsTimerPassed(differenceTime)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeActivity,
    totalActivitySeconds,
    activeActivityID,
    activeActivityName,
    markCurrentActivityAsFinished,
    resetCurrentActivity,
    updateSecondsTimerPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
