import styled from "styled-components";

import { ReactComponent as GlassSVG } from "../../../assets/glass.svg";

export const SearchInputContainer = styled.div`
  position: relative;
`;

export const Glass = styled(GlassSVG)`
  position: absolute;
  top: 30%;
  left: 3.5%;
  width: 2rem;
  height: 2rem;
`;

export const Input = styled.input`
  width: 52rem;
  padding: 1.4rem 5rem;
  font-size: 1.6rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #faf2e5;
  border-radius: 999px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.32);
  transition: all 0.3s;
  border: 1px solid #ccc;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.32rem rgba(250, 242, 229, 0.5);
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 8%;
  right: 0.8%;
`;
