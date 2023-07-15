import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariants = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 4px;
  border-radius: 4px;
  border: 0;

  background-color: ${(props) => props.theme['green-500']};
  color: white;

  /* ${(props) => {
    return `background-color: ${ButtonVariants[props.variant]}`
  }} */
`
