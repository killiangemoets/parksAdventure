import styled from "styled-components";
import {
  TourItineraryContent,
  TourItineraryWrapper,
} from "../../../tourPageComponents/tourItinerary/tourItinerary.style";
import { SectionTitle } from "../../../UIComponents/title/title.style";
import colors from "../../../../colors";

export const AddTourItineraryContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 6.4rem 3.2rem;
  }
`;

export const AddTourItineraryWrapper = styled(TourItineraryWrapper)`
  width: 100%;

  & ${SectionTitle} {
    margin-left: 0;
  }
`;

export const AddTourItineraryContent = styled(TourItineraryContent)`
  margin-left: 0;
`;

export const ErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  height: 2rem;
  color: ${colors.error};
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;
