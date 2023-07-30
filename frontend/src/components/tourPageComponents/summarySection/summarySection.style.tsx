import styled from "styled-components";

export const SummarySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;

  h2 {
    position: relative;
  }
`;

export const AboutTour = styled.p`
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: justify;
  letter-spacing: 1px;
`;

export const AdditionalInfoModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
export const AdditionalInfoModalTextElement = styled.div`
  display: flex;
  gap: 2rem;
`;

export const AdditionalInfoModalText = styled.div`
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: justify;
  max-width: 46rem;
`;
