import { HistoryContainer, HistoryList } from './styles'

export function History() {
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
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>10 days ago</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
