import styled from "styled-components";
import { DatePicker } from "antd";

export const DatePickerElement = styled(DatePicker)`
  width: 26rem;
  height: 5.2rem;
  padding: 0 3.2rem;
  background-color: #faf2e5;
  border-radius: 999px;
  border: 1px solid #aaa;
  /* border: none; */
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
`;
