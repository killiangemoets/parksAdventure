import styled from "styled-components";
import {
  NumRatings,
  RatingValue,
} from "../../UIComponents/starsRating/starsRating.style";
import { DropdownContainer } from "../../UIComponents/dropdown/dropdown.style";
import { TextInputContainer } from "../../UIComponents/textInput/textInput.style";

export const CartItemContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 3.2rem 0;
  border-bottom: 1px solid #aaa;
  width: 100%;

  @media (max-width: 540px) {
    .ant-rate {
      gap: 0.4rem;
    }

    .ant-rate .ant-rate-star-first .anticon,
    .ant-rate .ant-rate-star-second .anticon {
      font-size: 1.6rem;
    }

    & ${RatingValue} {
      font-size: 1.2rem;
      line-height: 1.2rem;
    }

    & ${NumRatings} {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }
`;

export const CartItemPicture = styled.div`
  height: 10rem;
  width: 10rem;
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
`;

export const CartItemContent = styled.div`
  width: calc(100% - 10rem);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;
`;

export const CartItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartItemBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CartItemTitle = styled.h4`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.8rem;
  letter-spacing: 0.6px;
  color: #404d36;
`;

export const CartItemInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  button {
    margin-top: 1rem;
    font-size: 1.4rem;
    width: fit-content;
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const CartItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CartItemInfoText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 0.6px;
`;

export const CartItemPrice = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.6px;
`;

export const Rebook = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
`;

export const CartItemInputs = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;

  button {
    margin: 0;
    height: 5.2rem;
    width: 26rem;
    font-size: 1.6rem;
    letter-spacing: 0px;
  }

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    button {
      width: 100%;
    }

    & ${DropdownContainer} {
      width: 100% !important;
    }

    ul {
      min-width: 100%;
    }

    & ${TextInputContainer} {
      width: 100%;
    }

    .ant-picker {
      width: 100%;
    }
  }
`;

export const CartItemEditButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.2rem;
`;
