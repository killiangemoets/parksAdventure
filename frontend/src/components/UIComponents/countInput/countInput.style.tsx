import styled from "styled-components";
import { ReactComponent as MinusSVG } from "../../../assets/icons/minus.svg";
import { ReactComponent as PlusSVG } from "../../../assets/icons/plus.svg";
import colors from "../../../colors";

export const CountInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  button {
    width: 2.4rem !important;
  }
`;

export const CountValue = styled.input`
  width: 4rem;
  padding: 0.8rem;
  font-size: 1.4rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: ${colors.background};

  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid ${colors.grey};
  text-align: center;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.grey};
  }
`;

export const Minus = styled(MinusSVG)`
  width: 2.4rem;
  height: 2.4rem;
  transition: all 0.3s;

  .path {
    color: ${colors.primary};
  }

  &:hover {
    .path {
      color: ${colors.primaryDark};
    }
  }
`;

export const Plus = styled(PlusSVG)`
  width: 2.4rem;
  height: 2.4rem;
  transition: all 0.3s;

  .path {
    color: ${colors.primary};
  }

  &:hover {
    .path {
      color: ${colors.primaryDark};
    }
  }
`;
