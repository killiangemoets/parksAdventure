import styled from "styled-components";

export const TourRecommendationsContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TourRecommendationsWrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export const RecommendationCards = styled.div`
  width: 100%;
  overflow-x: scroll;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  justify-content: center;
  gap: 3.2rem;

  ::-webkit-scrollbar {
    display: none;
  }

  height: 54rem;
  @media (max-width: 530px) {
    height: 36rem;
  }

  @media (max-width: 930px) {
    align-items: initial;
    justify-content: initial;
  }
`;
