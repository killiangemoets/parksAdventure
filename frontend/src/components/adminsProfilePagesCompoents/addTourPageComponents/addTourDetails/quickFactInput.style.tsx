import styled from "styled-components";
import { Option } from "../../../UIComponents/dropdownInput/dropdown.style";

export const QuickFactInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;

  & ${Option} {
    padding: 0 1.6rem;
    height: 4.4rem;
    font-size: 1.4rem;
    font-weight: 400;
  }

  button {
    min-width: 20rem;
    width: 22rem;
    height: 4rem;
    padding: 0.4rem 1.8rem;

    font-size: 1.4rem;
    font-weight: 400;
    text-transform: capitalize;
    letter-spacing: 1px;

    font-family: inherit;
    color: inherit;
    border: none;
    background-color: #f9eedb;
    border-radius: 4px;

    border: 1px solid #cc704b;

    &:hover {
      border: 1px solid #cc704b;
      background-color: #f9eedb;
    }
  }

  .ant-input-number-group-wrapper,
  .ant-input {
    min-width: 20rem;
    width: 22rem;
  }

  .ant-input-number-group-addon {
    border: none;
    background-color: #f9eedb;
    border-radius: 4px;
    box-shadow: none;
    transition: all 0.3s;
    border: 1px solid #cc704b;
  }

  .ant-input-number,
  .ant-input {
    padding: 0.4rem 1.8rem;
    height: 4rem;

    background-color: #f9eedb;
    border: 1px solid #cc704b;
    border-radius: 4px;
    box-shadow: none;
    transition: all 0.3s;
  }

  .ant-input,
  .ant-input-number input {
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: inherit;
    color: inherit;

    &::placeholder {
      color: #aaa;
      font-size: 1.4rem;
      font-weight: 400;
    }

    &:focus {
      outline: none;
    }
  }

  .ant-input-number .ant-input-number-input {
    padding: 0;
  }

  .ant-input-number-handler-wrap {
    padding: 0;
    background-color: #fdfaf5;
  }
`;
