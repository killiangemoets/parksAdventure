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

  @media (max-width: 660px) {
    gap: 4.8rem;
    & ${SectionTitle} {
      margin-left: 6.4rem;
    }
  }
  @media (max-width: 470px) {
    gap: 3.2rem;
    & ${SectionTitle} {
      margin-left: 0rem;
    }
  }
`;

export const TourItineraryContent = styled.div`
  margin-left: 3.2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 1rem;

  @media (max-width: 920px) {
    margin-left: 0rem;
  }
  @media (max-width: 660px) {
    margin-left: 0;
    display: grid;
    grid-template-columns: repeat(1, auto);
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
  }
`;

export const ItineraryLeftContainer = styled.div`
  @media (max-width: 660px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const ItineraryRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  grid-row: 1;
`;

export const ItineraryMapContainer = styled.div`
  width: 64rem;
  height: 48rem;

  @media (max-width: 770px) {
    width: 50rem;
    height: 37.5rem;
  }
  @media (max-width: 420px) {
    width: 45rem;
    height: 33.75rem;
  }
  @media (max-width: 374px) {
    width: 40rem;
    height: 30rem;
  }
`;

export const ItineraryCaptionContainer = styled.div`
  display: flex;
  gap: 3.2rem;
  margin-top: -4rem;
  background-color: #fdfaf5;
  padding: 2rem 0.4rem;
`;

export const StopDescription = styled.div`
  padding: 1rem 1.2rem;
`;
