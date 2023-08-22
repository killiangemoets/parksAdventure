import styled from "styled-components";
import { TourGuidesSectionContainer } from "../../../tourPageComponents/tourGuidesSection/tourGuidesSection.style";
import {
  DropdownContainer,
  Option,
} from "../../../UIComponents/dropdown/dropdownInput.style";
import { ReactComponent as CloseSVG } from "../../../../assets/icons/x-solid.svg";
import colors from "../../../../colors";

export const AddTourDetailsContainer = styled.div`
  background-color: ${colors.backgroundVeryDark};

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;

  & > * {
    padding: 6.4rem 16rem 6.4rem 16rem;
    width: 100%;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
  }

  @media (max-width: 1300px) {
    & > * {
      padding: 6.4rem 9rem 6.4rem 6.4rem;
    }
  }
  @media (max-width: 860px) {
    & > * {
      padding: 6.4rem;
    }
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 450px) {
    & > * {
      padding: 6.4rem 3.2rem;
    }
    flex-direction: column;
    padding: 0;
  }
`;

export const AddTourDetailsLeft = styled.div`
  justify-content: flex-end;
  background-color: ${colors.backgroundMediumDark};

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;

  @media (max-width: 860px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

export const AddTourDetailsRight = styled.div`
  width: 100%;
  max-width: 70rem;
`;

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
    fill: ${colors.smallLightGrey};
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: ${colors.primary};
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

  border: 1px solid ${colors.primary};
  background-color: ${colors.backgroundVeryDark};
  border-radius: 4px;
  box-shadow: none;
  transition: all 0.3s;

  &::placeholder {
    color: ${colors.grey};
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ error }) =>
    error && {
      border: "2px solid",
      borderColor: colors.error,
    }}

  @media (max-width: 860px) {
    height: 32rem;
  }
`;

export const ErrorMessage = styled.p`
  height: 2rem;
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;
