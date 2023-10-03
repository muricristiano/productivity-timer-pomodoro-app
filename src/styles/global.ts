import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['red-medium']}
    }

    body {
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    /* Ocultar o scrollbar padrão */
::-webkit-scrollbar {
  width: 10px; /* Largura do scrollbar */
  background-color: transparent; /* Cor de fundo transparente */
}

/* Estilizar a parte que representa a posição do scroll */
::-webkit-scrollbar-thumb {
  background-color: ${(props) =>
    props.theme['gray-600']}; /* Substitua #cor-do-tema pela cor desejada */
  border-radius: 5px; /* Borda arredondada */
  width: 1px;
}

/* Estilizar o track (a trilha do scrollbar) */
::-webkit-scrollbar-track {
  background-color: transparent; /* Cor de fundo transparente */
}
`
