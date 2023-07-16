import { Scroll, Timer } from 'phosphor-react'
import { HeaderContainer } from './styles'
import logo from '../../assets/productivity-timer.png'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="Productivity Timer Pomodoro" width={'150px'} />
      <nav>
        <NavLink to="/" title="Timer Page">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History Page">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
