import styled, { css } from "styled-components";
import { DatePicker } from "antd";

type DatePickerElementProps = {
  rectangular: boolean;
};

const rectangularStyle = css`
  width: 100%;
  height: 5.2rem;
  padding: 0 3.2rem;
  background-color: #faf2e5;
  border-radius: 4px;
  border: none;
  font-size: 1.6rem;
  transition: all 0.3s;
  &:focus {
    border: 1px solid #aaa;
  }

  .ant-picker-input > input {
    &:focus {
      box-shadow: none;
    }
  }
`;

export const DatePickerElement = styled(DatePicker)<DatePickerElementProps>`
  width: 26rem;
  height: 5.2rem;
  padding: 0 3.2rem;
  background-color: #faf2e5;
  border-radius: 999px;
  border: 1px solid #aaa;
  font-size: 1.6rem;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #aaa;
  }

  .ant-picker-input > input {
    font-size: 1.6rem;
    font-family: inherit;
    color: #333;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.32rem rgba(250, 242, 229, 0.5);
    }
  }

  .anticon svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  .ant-picker-clear {
    background: none !important;
    color: #cc704b !important;
    transition: all 0.3s !important;
    opacity: 1 !important;
    transform: translateX(1.2rem) translateY(-0.82rem);

    &:hover {
      color: #b86544 !important;
    }
  }

  .ant-picker-suffix {
    margin-right: 1rem !important;
  }

  .ant-picker-dropdown .ant-picker-today-btn {
    display: none !important;
  }

  ${({ rectangular }) => rectangular && rectangularStyle}
`;

const highlightStyle = css`
  position: absolute;
  bottom: 16%;
  right: 0%;
  content: "";
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #20640c;
  display: inline-block;
`;

const highlightStyle2 = css`
  position: absolute;
  top: 16%;
  right: 0%;
  content: "";
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #b83b3b;
  display: inline-block;
`;

type DateInputValueProps = {
  highlight?: boolean;
  highlight2?: boolean;
};
export const DateInputValue = styled.div<DateInputValueProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    ${({ highlight }) => highlight && highlightStyle}
  }

  &::before {
    ${({ highlight2 }) => highlight2 && highlightStyle2}
  }
`;
