import styled from "styled-components";
import {
  CheckBoxAll,
  CheckboxGroupElement,
} from "../checkBoxes/checkBoxes.style";

export const DropdownCheckBoxesContainer = styled.div`
  position: absolute;
  top: 112%;
  width: 100%;
  background-color: #fdfaf5;
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 2em 3.6rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    align-self: flex-end;
  }

  & ${CheckboxGroupElement} {
    grid-template-columns: auto;
    width: 100%;
    gap: 1.8rem;

    label {
      font-size: 1.6rem;
    }
  }

  & ${CheckBoxAll} {
    width: 100%;
    font-size: 1.6rem;
  }
`;
