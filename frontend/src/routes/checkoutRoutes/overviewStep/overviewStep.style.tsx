import styled from "styled-components";

export const OverviewStepContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 6.4rem;
  }
`;

export const OverviewStepLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
`;

export const OverviewStepRight = styled.div``;

export const OverviewStepSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const CartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
