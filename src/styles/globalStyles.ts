import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        transition: background-color .3s linear;
    }

    *::-webkit-scrollbar {
        display: none;
    }

    body {
        font-family: Outfit;
        color: ${(props) => props.theme.text};
        font-size: 14px;
        user-select: none;
        scroll-behavior: smooth;
    }

    button {
        font-family: Outfit;
    }

    #root {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        overflow: scroll;
    }
`

export default GlobalStyles
