import styled from "styled-components";
import { SectionTitle } from "../../UIComponents/title/title.style";

export const TourItineraryContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TourItineraryWrapper = styled.div`
  max-width: 100rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6.4rem;

  & ${SectionTitle} {
    margin-left: -3.2rem;
  }
`;

export const TourItineraryContent = styled.div`
  margin-left: 3.2rem;
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  /* gap: 12rem; */
`;

export const ItineraryLeftContainer = styled.div``;

export const ItineraryRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const ItineraryMapContainer = styled.div`
  width: 64rem;
  height: 48rem;
`;

export const ItineraryCaptionContainer = styled.div`
  display: flex;
  /* margin-left: 0.4rem; */
  gap: 3.2rem;
  margin-top: -4rem;
  background-color: #fdfaf5;
  padding: 2rem 0.4rem;
`;

export const StopDescription = styled.div`
  padding: 1rem 1.2rem;
`;
