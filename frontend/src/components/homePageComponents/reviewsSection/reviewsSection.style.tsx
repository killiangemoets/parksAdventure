import styled from "styled-components";

import reviewsSectionBackground from "../../../assets/images/reviews-section-bg.webp";

export const ReviewsSecContainer = styled.div`
  padding: 0rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;
  background-color: rgba(159, 192, 136, 0.3);
`;
export const ReviewsSecWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;

  h2 {
    font-size: 3.2rem;
  }

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ReviewsSecPicture = styled.div`
  width: 50%;
  background: url(${reviewsSectionBackground}) no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;

  @media (max-width: 580px) {
    width: 100%;
    height: 30rem;
  }
`;

export const ReviewsSecContent = styled.div`
  width: 50%;
  padding: 6.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 40rem;

  @media (max-width: 580px) {
    width: 100%;
  }
`;

export const ErrorMessage = styled.p`
  max-width: 38rem;
  text-align: center;
  height: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  margin-bottom: 12rem;
`;
