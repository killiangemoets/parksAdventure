import { createGlobalStyle } from "styled-components";
import colors from "./colors";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: sans-serif;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${colors.darkGrey};
  font-weight: 300;
  background-color: ${colors.background};
  overflow-x: hidden;

  .ant-picker-dropdown
    .ant-picker-time-panel-column
    > li.ant-picker-time-panel-cell-selected
    .ant-picker-time-panel-cell-inner {
    background: ${colors.primaryVeryLight};
  }

  .ant-btn-primary{
    background-color: ${colors.primary};

    &:hover{
      background-color: ${colors.primaryDark} !important;
    }
  }

  a{
    color: ${colors.darkGrey};

    &:hover{
      color: ${colors.primary};

    }
  }

  @media (max-width: 700px) {
    .ant-picker-clear {
      color: red !important;
    }

    .ant-picker-dropdown .ant-picker-panel-container .ant-picker-presets {
      display: none !important;
    }

    .ant-picker-dropdown .ant-picker-panel-container .ant-picker-panels {
      flex-direction: column;
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
