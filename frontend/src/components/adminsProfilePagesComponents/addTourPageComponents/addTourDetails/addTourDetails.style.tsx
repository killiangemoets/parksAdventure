import styled from "styled-components";
import { TourGuidesSectionContainer } from "../../../tourPageComponents/tourGuidesSection/tourGuidesSection.style";
import {
  DropdownContainer,
  Option,
} from "../../../UIComponents/dropdown/dropdownInput.style";
import { ReactComponent as CloseSVG } from "../../../../assets/x-solid.svg";

export const TourGuidesSelectSectionContainer = styled(
  TourGuidesSectionContainer
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;

  button {
    width: 90%;
  }

  & ${DropdownContainer} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 90%;
    width: auto;
  }

  & ${Option} {
    height: 4.8rem;
  }
`;
export const TourGuideSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;

  button {
    width: auto;
  }
`;

export const CloseIcon = styled(CloseSVG)`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  .path {
    fill: #bbb;
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: #cc704b;
    }
  }
`;

type SummaryInputProps = {
  error?: boolean;
};

export const SummaryInput = styled.textarea<SummaryInputProps>`
  resize: none;
  width: 100%;
  height: 100%;
  padding: 1rem 1.8rem;

  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 2.2rem;
  text-align: justify;

  font-family: inherit;
  color: inherit;

  border: 1px solid #cc704b;
  background-color: #fbf5ea;
  border-radius: 4px;
  box-shadow: none;
  transition: all 0.3s;

  &::placeholder {
    color: #aaa;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ error }) =>
    error && {
      border: "2px solid #ff0033",
    }}
`;

export const ErrorMessage = styled.p`
  height: 2rem;
  color: #ff0033;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;
