import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
  }

  ol, ul {
    list-style: none;
  }

  input, textarea, select {
    font: inherit;
    border: none;
    outline: none;
  }

  main {
    min-height: 100vh;
    padding-top: 250px;
    padding-bottom: 120px;
  }
`;
