import styled from "styled-components";
import {
  NumRatings,
  RatingData,
  RatingValue,
} from "../../../components/UIComponents/starsRating/starsRating.style";

export const UserBookingDetailsContainer = styled.div`
  gap: 6.4rem;
  width: 100%;
  min-height: 100%;

  & ${RatingData} {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 0rem;
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

export const TitleContainer = styled.div`
  padding: 6.4rem 6.4rem 0rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
  max-width: 130rem;
  min-height: 9rem;
  h1 {
    line-height: 3.6rem;
  }
`;
