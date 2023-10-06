import styled from "styled-components";
import colors from "../../../colors";

export const SpinnerOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WhiteSpinner = styled.div`
  display: inline-block;
  width: 3.6rem;
  height: 3.6rem;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  border-top-color: ${colors.white};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const LargeSpinner = styled.div`
  display: inline-block;
  width: 8rem;
  height: 8rem;
  border: 8px solid rgba(204, 112, 75, 0.6);
  border-radius: 50%;
  border-top-color: ${colors.primary};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const SmallSpinner = styled.div`
  display: inline-block;
  width: 2.1rem;
  height: 2.1rem;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  border-top-color: ${colors.white};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
