import styled from "styled-components";

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

export const TextAreaEl = styled.textarea`
  resize: none;
  display: block;
  padding: 1.25rem 1.75rem;
  width: 100%;
  height: 24rem;
  font-size: 1.6rem;

  font-family: inherit;
  color: inherit;
  background-color: #faf2e5;

  border: none;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #aaa;
  }

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
