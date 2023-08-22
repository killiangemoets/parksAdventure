import styled, { css } from "styled-components";
import { DatePicker } from "antd";
import colors from "../../../colors";
const { RangePicker } = DatePicker;

type RangeDatePickerElementProps = {
  adminStyle?: boolean;
};

export const RangeDatePickerElement = styled(
  RangePicker
)<RangeDatePickerElementProps>`
  width: 30.8rem;
  padding: 1.4rem 3.2rem;
  height: 5.2rem;
  background-color: ${colors.backgroundDark};
  border-radius: 999px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.32);
  border: 1px solid ${colors.grey};
  font-size: 1.6rem;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${colors.grey};
  }

  input {
    font-size: 1.6rem !important;
    font-family: inherit !important;
    color: ${colors.darkGrey} !important;

    &::placeholder {
      color: ${colors.grey} !important;
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

    &:hover {
      color: ${colors.primaryDark} !important;
    }
  }

  .ant-picker-suffix {
    margin-right: 0.2rem !important;
  }

  ${({ adminStyle }) =>
    adminStyle &&
    css`
      padding: 1.4rem 1.8rem;
      width: 26.8rem;
      font-size: 1rem;
      box-shadow: none;
      border: 1px solid ${colors.primary};

      &:focus {
        border: 1px solid ${colors.primary};
      }
    `}
`;
