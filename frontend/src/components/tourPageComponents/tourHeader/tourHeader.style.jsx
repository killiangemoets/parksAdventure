import styled from "styled-components";
import { FirstSecTitle } from "../../homePageComponents/firstSection/firstSection.style";
import {
  NumRatings,
  RatingData,
  RatingValue,
  StarIcon,
} from "../../UIComponents/starsRating/starsRating.style";

export const TourHeaderContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 24rem;
    padding: 1.4rem 3.2rem;
    font-size: 2rem;
  }

  & ${StarIcon} {
    width: 2rem;
    height: 2rem;
  }

  & ${RatingData} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 0px;
  }

  & ${RatingValue} {
    margin-top: 0px;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 700;
  }

  & ${NumRatings} {
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 400;
  }
`;

export const TourHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 130rem;
`;

export const TourHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TourTitle = styled(FirstSecTitle)`
  text-transform: uppercase;
  font-size: 3.6rem;
  line-height: 3.6rem;
`;

export const TourHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.2px;

  span {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
