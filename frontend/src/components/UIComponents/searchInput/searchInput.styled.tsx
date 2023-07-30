import styled, { css } from "styled-components";

import { ReactComponent as GlassSVG } from "../../../assets/glass.svg";
import { ReactComponent as DeleteSVG } from "../../../assets/x-solid.svg";

export const SearchInputContainer = styled.div`
  position: relative;
`;

export const SearchInputDeleteButton = styled.div`
  position: absolute;
  top: 30%;
  left: 3.5%;
`;

export const SearchInputForm = styled.form`
  width: 100%;
`;

export const Glass = styled(GlassSVG)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  .path {
    fill: #aaa;
  }
`;

export const Delete = styled(DeleteSVG)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  .path {
    fill: #cc704b;
  }
`;

type InputProps = {
  adminStyle?: boolean;
};
export const Input = styled.input<InputProps>`
  width: 52rem;
  padding: 0 5rem;
  height: 5.2rem;
  font-size: 1.6rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #faf2e5;
  border-radius: 999px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.32);
  transition: all 0.3s;
  border: 1px solid #aaa;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #aaa;
  }

  ${({ adminStyle }) =>
    adminStyle &&
    css`
      width: 40rem;
      box-shadow: none;
      border: 1px solid #cc704b;

      &:focus {
        border: 1px solid #cc704b;
      }
    `}
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 8%;
  right: 0.8%;
`;
