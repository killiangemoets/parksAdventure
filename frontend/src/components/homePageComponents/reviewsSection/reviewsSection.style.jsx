import styled from "styled-components";

import reviewsSectionBackground from "../../../assets/reviews-section-bg.webp";

import { ReactComponent as StarSVG } from "../../../assets/star-solid.svg";

export const ReviewsSecContainer = styled.div`
  /* margin: 7.2rem 0; */
  padding: 0rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;
  background-color: rgba(159, 192, 136, 0.3);
`;
export const ReviewsSecWrapper = styled.div`
  /* max-width: 130rem; */
  width: 100vw;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* gap: 7.2rem; */
  /* background-color: rgba(159, 192, 136, 0.3); */
  /* background-color: #c5d9b8; */
  /* background-color: #e2ecdb; */
  /* background-color: #ecf2e7; */
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

export const ReviewsSecTitle = styled.h2`
  font-size: 3.2rem;
  letter-spacing: 2px;
  font-weight: 700;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#d17e5d),
    to(#a35a3c)
  );
  background-image: linear-gradient(to right, #d17e5d, #a35a3c);
  -webkit-background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  color: transparent;
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

export const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export const Star = styled(StarSVG)`
  width: 2rem;
  height: 2rem;
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

export const UserPicture = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 100rem;
  background-color: #aaa;
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
`;

export const CurrentDot = styled(Dot)`
  background-color: #cc704b;
`;
