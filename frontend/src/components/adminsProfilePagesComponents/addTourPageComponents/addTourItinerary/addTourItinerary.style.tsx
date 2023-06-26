import styled from "styled-components";
import {
  TourItineraryContent,
  TourItineraryWrapper,
} from "../../../tourPageComponents/tourItinerary/tourItinerary.style";
import { SectionTitle } from "../../../UIComponents/title/title.style";

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
  color: #ff0033;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;
