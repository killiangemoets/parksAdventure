import styled from "styled-components";

export const UserReviewsContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
  width: 100%;
  min-height: calc(100vh - 16rem);

  @media (max-width: 480px) {
    padding: 6.4rem 4rem;
  }
`;

export const Reviews = styled.div`
  width: 100%;
  max-width: 100rem;
`;

export const UserReviewsSpinner = styled.div`
  padding-top: 12rem;
`;
