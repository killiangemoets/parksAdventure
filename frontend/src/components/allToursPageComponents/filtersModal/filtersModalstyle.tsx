import styled from "styled-components";
import { SliderInputContainer } from "../../UIComponents/sliderInput/sliderInput.style";
import {
  CheckBoxesContainer,
  CheckboxGroupElement,
} from "../../UIComponents/checkBoxes/checkBoxes.style";

export const Filters = styled.div`
  /* padding: 0rem 6.4rem 0rem 6.4rem; */
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;
export const FilterElement = styled.div`
  display: flex;
  gap: 2.8rem;

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;
export const FilterTitle = styled.h2`
  width: 16rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: #506044;
  text-transform: uppercase;

  @media (max-width: 560px) {
    padding-top: 1.2rem;
    font-size: 1.4rem;
    letter-spacing: 0.2px;
    width: 8.4rem;
  }
`;
export const Filter = styled.div`
  min-width: 30rem;
  @media (max-width: 480px) {
    min-width: 20rem;
    & ${SliderInputContainer} {
      width: 20rem;
    }
  }
`;

export const FilterCheckBoxes = styled(Filter)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    & ${CheckboxGroupElement} {
      grid-template-columns: auto auto;
      gap: 0.8rem;

      label {
        font-weight: 400;
        color: #333;
        letter-spacing: 0.6px;
        font-size: 1.4rem;
      }
    }

    & ${CheckBoxesContainer} {
      grid-template-columns: auto auto;
      gap: 0.8rem;

      label {
        font-weight: 400;
        color: #333;
        letter-spacing: 0.6px;
        font-size: 1.4rem;
      }
    }
  }
`;

export const ButtonSection = styled.div`
  /* padding: 1rem 6.4rem 4.8rem 6.4rem; */
  /* padding: 1.6rem 0rem 4.8rem 0rem; */

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
