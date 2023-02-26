import styled from "styled-components";
import { ReactComponent as MinusSVG } from "../../../assets/minus.svg";
import { ReactComponent as PlusSVG } from "../../../assets/plus.svg";

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
  background-color: #ffff;
  background-color: #fdfaf5;
  /* background-color: #faf2e5; */

  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid #aaa;
  text-align: center;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #aaa;
    /* box-shadow: 0 0 0 0.32rem rgba(250, 242, 229, 0.5); */
  }
`;

export const Minus = styled(MinusSVG)`
  width: 2.4rem;
  height: 2.4rem;
  transition: all 0.3s;

  .path {
    color: #cc704b;
  }

  &:hover {
    .path {
      color: #b86544;
    }
  }
`;

export const Plus = styled(PlusSVG)`
  width: 2.4rem;
  height: 2.4rem;
  transition: all 0.3s;

  .path {
    color: #cc704b;
  }

  &:hover {
    .path {
      color: #b86544;
    }
  }
`;
