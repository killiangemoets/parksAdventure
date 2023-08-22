import styled from "styled-components";
import { SliderInputContainer } from "../../UIComponents/sliderInput/sliderInput.style";
import {
  CheckBoxesContainer,
  CheckboxGroupElement,
} from "../../UIComponents/checkBoxes/checkBoxes.style";
import { SliderStepsContainer } from "../../UIComponents/sliderSteps/sliderSteps.style";
import colors from "../../../colors";

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const FilterElement = styled.div`
  display: flex;
  gap: 2rem;
`;
export const FilterTitle = styled.h2`
  margin-top: 1.1rem;
  width: 12rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: ${colors.secondary};
  text-transform: uppercase;

  @media (max-width: 560px) {
    margin-top: 0;
    padding-top: 1.2rem;
    font-size: 1.4rem;
    letter-spacing: 0.2px;
    width: 8.4rem;
  }
`;
export const Filter = styled.div`
  min-width: 30rem;
  @media (max-width: 480px) {
    min-width: 0;
    width: 100%;
    & ${SliderInputContainer}, & ${SliderStepsContainer} {
      width: 100%;
    }
  }
`;

export const FilterCheckBoxes = styled(Filter)`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    font-weight: 400;
    color: ${colors.darkGrey};
    letter-spacing: 0.6px;
    font-size: 1.4rem;
  }

  & ${CheckboxGroupElement} {
    gap: 0.8rem;
  }

  & ${CheckBoxesContainer} {
    gap: 0.8rem;

    label {
      font-weight: 400;
      color: ${colors.darkGrey};
      letter-spacing: 0.6px;
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    & ${CheckboxGroupElement} {
      grid-template-columns: auto auto;
    }

    & ${CheckBoxesContainer} {
      grid-template-columns: auto auto;
    }
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    button {
      padding: 1.2rem 2rem;

      font-size: 1.4rem;
      letter-spacing: 1px;
    }
  }
`;
