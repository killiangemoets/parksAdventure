import styled from "styled-components";
import { PriceModalButtons } from "../../adminsProfilePagesComponents/addTourPageComponents/addTourCalendar/pricesCalendarInput.style";
import { ReviewProfileName } from "../reviewProfile/reviewProfile.style";
import { NumRatings, RatingValue } from "../starsRating/starsRating.style";

export const ReviewContainer = styled.div`
  width: 100%;
  padding: 3.2rem 0;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 480px) {
    & ${ReviewProfileName} {
      font-size: 1.4rem;
      letter-spacing: 0.6px;
    }
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
`;

export const ReviewInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0 !important;
  }

  @media (max-width: 440px) {
    p {
      width: min-content;
    }
  }

  @media (max-width: 500px) {
    & ${ReviewProfileName} {
      font-size: 1.4rem;
      letter-spacing: 0.6px;
    }
  }
`;

export const ReviewDate = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #aaa;
  justify-self: flex-end;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    letter-spacing: 0.6px;
  }
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewText = styled.p`
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    line-height: 2rem;
    letter-spacing: 0.6px;
  }
`;

export const EditButtons = styled.div`
  display: flex;
  gap: 1.8rem;
  justify-content: flex-end;
  margin-top: -1rem;

  button {
    min-width: 2rem;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 500px) {
    button {
      font-size: 1.6rem;
    }
  }
`;

type ReviewInputProps = {
  error?: boolean;
};

export const ReviewInput = styled.textarea<ReviewInputProps>`
  resize: none;
  width: 100%;
  height: 100%;
  height: 14rem;
  padding: 1rem 1.8rem;
  min-width: 30rem;

  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 2.2rem;

  font-family: inherit;
  color: inherit;

  border: 1px solid #cc704b;
  border-radius: 4px;
  box-shadow: none;
  transition: all 0.3s;

  &::placeholder {
    color: #aaa;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ error }) =>
    error && {
      border: "2px solid #ff0033",
    }}
`;

export const ReviewModalButtons = styled(PriceModalButtons)`
  button {
    min-width: auto;
    width: 12.4rem;
  }
`;

export const DeleteReviewMessage = styled.div`
  font-size: 1.8rem;
  line-height: 2.8rem;
  min-width: 30vw;
  font-weight: 400;
  letter-spacing: 1px;
  color: #333;
  text-align: center;

  span {
    font-weight: 700;
  }
`;

export const ReviewModalWrapper = styled.div`
  width: 70vw;
  height: 48rem;
  max-width: 68rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  img {
    max-height: 68vh;
    max-width: 80vh;
  }
`;

export const ReviewTourName = styled.p`
  color: #333;
  letter-spacing: 1px;
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 600;
    text-transform: uppercase;
  }

  @media (max-width: 500px) {
    font-size: 1.4rem;
    letter-spacing: 0.6px;
  }
`;
