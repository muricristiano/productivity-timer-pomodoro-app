import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { HistoryContainer, HistoryList, Status } from './styles'
import { ActivitiesContext } from '../../contexts/ActivitiesContext'

export function History() {
  const { activities } = useContext(ActivitiesContext)
  const reversedActivitiesList = [...activities].reverse()
  const recentActivitiesOrderedList = reversedActivitiesList

  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivitiesOrderedList.map((activity) => {
              return (
                <tr key={activity.id}>
                  <td>{activity.task}</td>
                  <td>{activity.duration} minutes</td>
                  <td>
                    {formatDistanceToNow(activity.startDate, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {activity.finishedDate && (
                      <Status statusColor="green">Completed</Status>
                    )}
                    {activity.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}
                    {!activity.finishedDate && !activity.interruptedDate && (
                      <Status statusColor="yellow">In progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
