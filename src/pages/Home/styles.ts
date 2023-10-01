import { styled } from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;

  margin-top: -4rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

  h1 {
    font-size: 3rem;
    color: ${(props) => props.theme['red-medium']};
  }
`

export const BaseCountdownButton = styled.button`
  width: 100%;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-medium']};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme['red-light']};
  }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['gray-700']};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme['gray-600']};
  }
`
