import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: sans-serif;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-weight: 300;
  background-color: #fdfaf5;
  overflow-x: hidden;

  .ant-picker-dropdown
    .ant-picker-time-panel-column
    > li.ant-picker-time-panel-cell-selected
    .ant-picker-time-panel-cell-inner {
    background: #ebc6b7;
  }

  .ant-btn-primary{
    background-color: #cc704b;

    &:hover{
      background-color: #b86544 !important;
    }
  }

  a{
    color: #333;

    &:hover{
      color: #cc704b

    }
  }
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
}

html {
  /* font-size: 62.5%; */
  font-size: 50%;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


`;
