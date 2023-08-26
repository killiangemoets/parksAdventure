import styled from "styled-components";
import { GreenOpacity } from "../../../routes/home/home.style";
import allToursHeaderBackground from "../../../assets/images/alltours-header-bg.webp";
import { RangeDatePickerElement } from "../../UIComponents/rangeDateInput/rangeDateInput.style";
import {
  Input,
  SearchInputContainer,
} from "../../UIComponents/searchInput/searchInput.styled";
import colors from "../../../colors";

export const AllToursHeaderContainer = styled.div`
  width: 100vw;
  height: 40rem;
  background: url(${allToursHeaderBackground}) no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
`;
export const AllToursHeaderWrapper = styled(GreenOpacity)`
  display: flex;
  justify-content: center;
`;
export const AllToursHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  padding: 0 4rem;

  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: auto;
    align-items: center;
    gap: 0rem;
  }
`;

export const AllToursHeaderInputs = styled.div`
  padding-top: 4.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  @media (max-width: 700px) {
    flex-direction: column;
    padding-top: 0rem;
    padding-bottom: 4.8rem;
    height: fit-content;

    & ${RangeDatePickerElement}, & ${SearchInputContainer}, & ${Input} {
      width: 100%;
    }
  }
`;

export const AllToursTitles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 700px) {
    grid-row: 1;
    height: fit-content;
  }
`;

export const AllToursSecondTitle = styled.h2`
  color: ${colors.backgroundDark};
  font-size: 2.2rem;
  letter-spacing: 1.2px;
  text-shadow: 1px 8px 8px rgba(0, 0, 0, 0.32);
`;

export const AllToursMainTitle = styled.h1`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 3.6rem;
  letter-spacing: 1.2px;
  color: ${colors.backgroundDark};
  text-shadow: 1px 8px 8px rgba(0, 0, 0, 0.32);
`;
