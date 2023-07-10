import styled from "styled-components";
import { ReactComponent as GroupSVG } from "../../../assets/users-solid.svg";
import { DatePickerElement } from "../../UIComponents/dateInput/dateInput.style";
import { BaseButton } from "../../UIComponents/button/button.style";

export const TourBookingInputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  button {
    height: 5.2rem;
    width: 26rem;
    font-size: 1.6rem;
    letter-spacing: 0px;
  }

  @media (max-width: 805px) {
    gap: 1.4rem;

    & ${DatePickerElement} {
      width: 18.8rem;
    }
  }

  @media (max-width: 690px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 2rem;

    & ${DatePickerElement} {
      width: 100%;
    }

    & ${BaseButton} {
      grid-column: span 2;
      width: 100% !important;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;

    & ${BaseButton} {
      grid-column: span 1;
    }
  }
`;

export const GroupIcon = styled(GroupSVG)`
  width: 2rem;
  height: 2rem;
  .path {
    fill: #aaa;
  }
`;

export const SelectDateFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SelectDateFooterText = styled.p`
  position: relative;
  text-align: center;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 500;
  &::before {
    position: absolute;
    top: 46%;
    left: -10%;
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #20640c;
    display: inline-block;
  }
`;

export const SelectDateFooterText2 = styled.p`
  position: relative;
  text-align: center;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 500;
  &::before {
    position: absolute;
    top: 46%;
    left: -10%;
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #b83b3b;
    display: inline-block;
  }
`;
