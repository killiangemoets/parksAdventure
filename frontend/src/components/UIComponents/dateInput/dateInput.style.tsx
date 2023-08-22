import styled, { css } from "styled-components";
import { DatePicker } from "antd";
import colors from "../../../colors";

type DatePickerElementProps = {
  rectangular: boolean;
};

const rectangularStyle = css`
  width: 100%;
  height: 5.2rem;
  padding: 0 3.2rem;
  background-color: ${colors.backgroundDark};
  border-radius: 4px;
  border: none;
  font-size: 1.6rem;
  transition: all 0.3s;
  &:focus {
    border: 1px solid ${colors.grey};
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
  background-color: ${colors.backgroundDark};
  border-radius: 999px;
  border: 1px solid ${colors.grey};
  font-size: 1.6rem;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${colors.grey};
  }

  .ant-picker-input > input {
    font-size: 1.6rem;
    font-family: inherit;
    color: ${colors.darkGrey};

    &::placeholder {
      color: ${colors.grey};
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
    color: ${colors.primary} !important;
    transition: all 0.3s !important;
    opacity: 1 !important;
    transform: translateX(1.2rem) translateY(-0.82rem);

    &:hover {
      color: ${colors.primaryDark} !important;
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
  background: ${colors.green};
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
  background: ${colors.red};
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
