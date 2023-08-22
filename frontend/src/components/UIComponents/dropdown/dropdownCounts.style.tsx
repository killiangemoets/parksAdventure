import styled from "styled-components";

import { ReactComponent as MinusSVG } from "../../../assets/icons/minus.svg";
import { ReactComponent as PlusSVG } from "../../../assets/icons/plus.svg";
import colors from "../../../colors";

export const DropdownCountsContainer = styled.ul`
  position: absolute;
  top: 108%;
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  z-index: 4;

  padding: 2rem 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  li:not(:last-child) {
    border-bottom: 1px solid ${colors.grey};
  }
`;

export const CountInputElement = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const CountInputInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

export const CountInputTitle = styled.h6`
  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 1px;
  width: 10rem;
`;

export const CountInputSubTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;
`;

export const CountInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  button {
    width: 2.4rem;
  }
`;

export const CountValue = styled.input`
  width: 4rem;
  padding: 0.8rem;
  font-size: 1.4rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: ${colors.white};
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
