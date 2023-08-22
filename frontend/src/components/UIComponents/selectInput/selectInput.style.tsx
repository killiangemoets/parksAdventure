import styled from "styled-components";
import colors from "../../../colors";

export const SelectContainer = styled.select`
  font-size: 1.6rem;
  font-family: inherit;
  background-color: ${colors.backgroundDark};

  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.grey};
  }
  box-shadow: none;
  display: block;
  color: inherit;
  padding: 1.25rem 1.75rem;
  border: none;
  width: 100%;
  min-width: 48rem;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom: 3px solid ${colors.flashGreen};
  }

  &:focus:invalid {
    border-bottom: 3px solid ${colors.flashRed};
  }

  @media (max-width: 540px) {
    min-width: 40rem;
  }
  @media (max-width: 500px) {
    min-width: 0;
  }
`;

export const Option = styled.option`
  background-color: ${colors.backgroundDark} !important;
`;
