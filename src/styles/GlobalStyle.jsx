// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Optional: Add a font similar to TripAdvisor's if available */
  /* @import url('URL_TO_TRIP_SANS_FONT'); */

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    /* Use Trip Sans if loaded, otherwise fall back */
    font-family: 'Trip Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #fff; // Or #f7f7f7 if the body bg is slightly grey
    color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit; // Ensure buttons use the body font
    border: none;
    cursor: pointer;
    background: none;
    padding: 0; // Reset padding
  }

  input {
     font-family: inherit; // Ensure inputs use the body font
  }
`;

export default GlobalStyle;