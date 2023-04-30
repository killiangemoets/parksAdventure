import styled, { css } from "styled-components";

export const OrderSummaryContainer = styled.div`
  /* padding: 2rem 2.4rem; */
  border: 3px solid #cc704b;
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 3.2rem; */

  button{
    height: 5rem !important;
  }
`;

export const OrderSummaryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const OrderSummaryItemTitle = styled.h4`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.6rem;
  letter-spacing: 1px;
  padding: 2rem 2.4rem 0 2.4rem;
`;

export const OrderSummaryItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 2.4rem;
`;

export const OrderSummaryItemDetail = styled.div`
  display: flex;
  gap: 1.8rem;
`;

export const OrderSummaryItemContent = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;
`;

type OrderSummaryItemTotalProps = {
  showTotalPrice: boolean;
}
export const OrderSummaryItemTotal = styled.div<OrderSummaryItemTotalProps>`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 2px #cc704b;
  border-top: solid 2px #cc704b;
  padding: 1rem 2.4rem;

  ${({ showTotalPrice }) => !showTotalPrice && css`
    padding: 0;
    height: 0px;
    border-top: none;
  `}


`;

export const OrderSummaryItemTotalText = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.8rem;
  letter-spacing: 1px;
`;

export const OrderSummaryItemTotalValue = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.8rem;
  letter-spacing: 1px;
`;

export const OrderSummaryItemPriceText = styled.div`
  width: 8.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const OrderSummaryItemPriceName = styled(OrderSummaryItemContent)``;
export const OrderSummaryItemPriceAge = styled(OrderSummaryItemContent)``;

export const OrderSummaryItemPriceContent = styled(OrderSummaryItemContent)`
  width: 12rem;
  text-align: right;
`;
export const OrderSummaryItemPrice = styled(OrderSummaryItemContent)`
  width: 8rem;
  text-align: right;
`;

export const OrderSummaryFooter = styled.div`
  background-color: #f6e5df;
  width: 100%;
  padding: 2.4rem 2.4rem;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    font-size: 2rem;
  }
`;

export const OrderSummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OrderSummaryFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const OrderSummaryTotalText = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2.4rem;
  letter-spacing: 1px;
`;
export const OrderSummaryTotalValue = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2.4rem;
  letter-spacing: 1px;
`;

export const OrderSummaryPriceNote = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #555;
  text-align: right;
`;


export const ValidatePaymentError = styled.p`
  text-align: center;
  height: 2rem;
  color: #ff0033;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;