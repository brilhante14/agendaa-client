import { createGlobalStyle } from "styled-components";


// Estilo padrão para toda a aplicação.
export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #EBEFFF;
        --purple: #656ED3;
        --purple_dark: #5616AA;
        --white: #FFFFFF;
        --black: #000000;
    }

    /* Default Patterns */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    /* From here on down these are styles that will automatically be applied to the default components */
    html, body, #root {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: var(--black);
    }
    button {
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;