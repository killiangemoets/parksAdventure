import styled from "styled-components";

import {
  NumRatings,
  RatingData,
  RatingValue,
  StarsRatingContainer,
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

  @media (max-width: 620px) {
    padding: 6.4rem 3.2rem;
    button {
      padding: 1.4rem 3.2rem;
      width: 20rem;
      font-size: 1.6rem;
    }
  }

  @media (max-width: 450px) {
    button {
      padding: 1.4rem 3.2rem;
      width: 16rem;
      font-size: 1.6rem;
    }
  }
`;

export const TourHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 130rem;
  min-height: 9rem;
`;

export const TourHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    line-height: 3.6rem;
    min-height: 3.6rem;
  }

  .ant-rate {
    gap: 0.6rem;
  }

  .ant-rate .ant-rate-star-first .anticon,
  .ant-rate .ant-rate-star-second .anticon {
    font-size: 2rem;
  }

  @media (max-width: 620px) {
    h1 {
      font-size: 3.2rem;
      letter-spacing: 1px;
    }
    .ant-rate {
      gap: 0.4rem;
    }

    .ant-rate .ant-rate-star-first .anticon,
    .ant-rate .ant-rate-star-second .anticon {
      font-size: 2rem;
    }

    & ${RatingValue} {
      font-size: 1.6rem;
      line-height: 1.6rem;
    }

    & ${NumRatings} {
      font-size: 1.4rem;
      line-height: 1.6rem;
    }
  }

  @media (max-width: 450px) {
    h1 {
      font-size: 2.6rem;
      letter-spacing: 0.2px;
    }

    & ${StarsRatingContainer} {
      flex-direction: column;
      align-items: flex-start;
    }
  }
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
  text-align: center;

  span {
    font-size: 1.8rem;
    font-weight: 600;
  }

  @media (max-width: 620px) {
    font-size: 1.4rem;

    span {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 450px) {
    font-size: 1.2rem;

    span {
      font-size: 1.4rem;
    }
  }
`;
