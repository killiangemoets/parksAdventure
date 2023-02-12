import styled from "styled-components";
import {
  NumRatings,
  RatingData,
  RatingValue,
} from "../../components/UIComponents/starsRating/starsRating.style";

export const UserBookingDetailsContainer = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  gap: 6.4rem;
  width: 100%;
  /* max-width: 130rem; */

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

export const TitleContainer = styled.div`
  padding: 6.4rem 6.4rem 0rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
  gap: 1.8rem;
  width: 100%;
  max-width: 130rem;
`;

export const StarsRatingContainer = styled.div`
  /* padding: 0 6.4rem; */
  /* margin-bottom: -4rem; */
  padding: 3.2rem 6.4rem 2rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StarsRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 130rem;
`;
