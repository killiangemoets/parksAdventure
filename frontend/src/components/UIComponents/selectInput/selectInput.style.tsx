import styled from "styled-components";

export const SelectContainer = styled.select`
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
    /* box-shadow: 0 0 0 0.32rem rgba(250, 242, 229, 0.5); */
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
    border-bottom: 3px solid #55c57a;
  }

  &:focus:invalid {
    border-bottom: 3px solid #f43535;
  }
`;

export const Option = styled.option`
  background-color: #faf2e5 !important;
`;
