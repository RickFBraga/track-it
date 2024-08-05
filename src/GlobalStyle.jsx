import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #F2F2F2;
}

  #root {
    height: 100%;
  }
`;

export const Main = styled.main`
  min-height: 100vh;
  margin-bottom: 80px;
`;

export default GlobalStyle;
