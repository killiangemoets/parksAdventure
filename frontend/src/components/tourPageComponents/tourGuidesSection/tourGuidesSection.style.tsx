import styled from "styled-components";

export const TourGuidesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 3.2rem;
  min-height: 9rem;
`;

export const TourGuides = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export const Tour = styled(TourGuidesSectionContainer)`
  width: 100%;
`;
