import styled from "styled-components";
import { PriceModalButtons } from "../../adminsProfilePagesCompoents/addTourPageComponents/addTourCalendar/pricesCalendarInput.style";

export const ReviewContainer = styled.div`
  width: 100%;
  padding: 3.2rem 0;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ReviewInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0 !important;
  }
`;

export const ReviewDate = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #aaa;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReviewText = styled.p`
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-align: justify;
  letter-spacing: 1px;
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

  span {
    font-weight: 600;
    text-transform: uppercase;
  }
`;
