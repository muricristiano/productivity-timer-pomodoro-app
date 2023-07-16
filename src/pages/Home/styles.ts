import { styled } from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  color: ${(props) => props.theme['gray-300']};
  font-size: 1.125rem;
  font-weight: bold;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  padding: 0 0.5rem;

  font-weight: bold;
  font-size: 1.125rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['red-medium']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  color: ${(props) => props.theme['red-light']};
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  font-size: 8rem;

  color: ${(props) => props.theme['red-light']};

  width: 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const StartCountdownButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme['red-medium']};
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  font-size: 1.125rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme['red-light']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`