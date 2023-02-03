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
  height: 58.2rem;
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

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  cursor: pointer;
`;

export const ReviewTitle = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const ReviewDescription = styled.p`
  width: 60%;
  min-width: 38rem;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  font-weight: 500;
  text-align: center;
  padding: 1rem 0 1.8rem 0;
  color: #666;
`;

export const ReviewUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const UserName = styled.h5`
  min-width: 38rem;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  word-spacing: 1px;
  text-align: center;
`;

export const ReviewsCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

export const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 10rem;
  background-color: #aaa;
  cursor: pointer;
`;

export const CurrentDot = styled(Dot)`
  background-color: #cc704b;
`;
