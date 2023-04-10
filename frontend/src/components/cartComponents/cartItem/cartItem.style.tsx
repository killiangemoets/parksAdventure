import styled from "styled-components";

export const CartItemContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 3.2rem 0;
  border-bottom: 1px solid #aaa;
  max-width: calc(100% - 44rem);
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
