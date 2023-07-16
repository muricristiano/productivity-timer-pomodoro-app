import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
    /* margin-right: 3rem; */

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: none;

      color: ${(props) => props.theme.white};

      border-top: 3px solid transparent; // for :hover
      border-bottom: 3px solid transparent; // for :hover

      &:hover {
        border-bottom: ${(props) => props.theme['red-medium']} 3px solid; // for :hover
      }

      &.active {
        color: ${(props) => props.theme['red-light']};
      }
    }
  }
`
