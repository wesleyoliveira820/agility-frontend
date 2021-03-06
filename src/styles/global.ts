import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: ${(props) => props.theme.colors.base.primary};
    color: ${(props) => props.theme.colors.text.primary};

    font-size: 16px;

    -webkit-font-smoothing: antialiased !important;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    color: ${(props) => props.theme.colors.text.primary};
  }

  p, strong, span {
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.colors.text.primary};
  }

  button {
    font-size: 16px;
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;

    border: 0;
    background: 0;
    cursor: pointer;
  }

  input {
    font-family: 'Open Sans', sans-serif;
  }

  textarea {
    font-family: 'Open Sans', sans-serif;
    resize: none;
  }
`;
