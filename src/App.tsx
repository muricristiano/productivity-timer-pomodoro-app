import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/defaultTheme'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ActivitiesContextProvider } from './contexts/ActivitiesContext'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <ActivitiesContextProvider>
          <Router />
        </ActivitiesContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
