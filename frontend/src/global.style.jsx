import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: sans-serif;
  font-family: "Open Sans", sans-serif;
  /* font-family: "Lato", sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-weight: 300;
  background-color: #fff;
  background-color: #FEFCFA;
  background-color: #faf2e5;
  background-color: #fdfaf5;
  overflow-x: hidden;
  

}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
}

html {
  font-size: 62.5%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


`;
