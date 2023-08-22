import styled from "styled-components";
import { Checkbox } from "antd";
import colors from "../../../colors";

const CheckboxGroup = Checkbox.Group;

export const CheckBoxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  label span {
    margin: 0 !important;
    font-weight: 400;
    color: ${colors.darkGrey};
    letter-spacing: 0.6px;
  }
`;

export const CheckboxGroupElement = styled(CheckboxGroup)`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1.2rem;
  align-items: flex-start;
  justify-content: flex-start;

  label {
    margin: 0 !important;
    font-weight: 400;
    color: ${colors.darkGrey};
    letter-spacing: 0.6px;
  }
`;

export const CheckBoxAll = styled(Checkbox)`
  margin-top: -0.4rem;
`;
