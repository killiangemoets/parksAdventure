import styled from "styled-components";
import { RectangularButton } from "../../../UIComponents/button/button.style";
import { Option } from "../../../UIComponents/dropdown/dropdownInput.style";

type QuickInputContainerProps = {
  error?: boolean;
};

export const QuickFactInputContainer = styled.div<QuickInputContainerProps>`
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

  .ant-input-number-group-wrapper,
  .ant-input,
  .ant-picker {
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

    ${({ error }) =>
      error && {
        border: "2px solid #ff0033",
      }}
  }

  .ant-input-number,
  .ant-input,
  .ant-picker {
    padding: 0.4rem 1.8rem;
    height: 4rem;

    background-color: #f9eedb;
    border: 1px solid #cc704b;
    border-radius: 4px;
    box-shadow: none;
    transition: all 0.3s;

    ${({ error }) =>
      error && {
        border: "2px solid #ff0033",
      }}
  }

  .ant-input,
  .ant-input-number input,
  .ant-picker .ant-picker-input input {
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

  & ${RectangularButton} {
    ${({ error }) =>
      error && {
        border: "2px solid #ff0033",
      }}
  }
`;

export const QuickFactDescription = styled.p`
  width: 100%;
  color: #aaa;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1px;
`;

export const QuickFactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
  justify-content: center;
`;
