import styled from "styled-components";
import {
  TourItineraryContent,
  TourItineraryWrapper,
} from "../../../tourPageComponents/tourItinerary/tourItinerary.style";
import { SectionTitle } from "../../../UIComponents/title/title.style";

export const AddTourItineraryWrapper = styled(TourItineraryWrapper)`
  width: 100%;
  max-width: 110rem;

  & ${SectionTitle} {
    margin-left: 0;
  }
`;

export const AddTourItineraryContent = styled(TourItineraryContent)`
  margin-left: 0;
`;
