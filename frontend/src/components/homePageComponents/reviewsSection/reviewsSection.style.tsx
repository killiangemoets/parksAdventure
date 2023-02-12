import styled from "styled-components";

import reviewsSectionBackground from "../../../assets/reviews-section-bg.webp";

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
`;

export const ReviewsSecPicture = styled.div`
  width: 50%;
  /* height: 58.2rem; */
  background: url(${reviewsSectionBackground}) no-repeat left center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
`;

export const ReviewsSecContent = styled.div`
  width: 50%;
  padding: 6.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* gap: 4.8rem; */
  /* padding-right: 3.2rem; */
`;
