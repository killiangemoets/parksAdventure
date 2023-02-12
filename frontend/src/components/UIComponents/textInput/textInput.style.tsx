import styled from "styled-components";
import { Input } from "../searchInput/searchInput.styled";

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-left: 0.2rem;
`;

export const TextInputEl = styled(Input)`
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
    border-bottom: 3px solid #55c57a;
  }

  &:focus:invalid {
    border-bottom: 3px solid #f43535;
  }
`;
