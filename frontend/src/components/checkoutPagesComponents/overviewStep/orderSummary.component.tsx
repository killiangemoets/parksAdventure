import Button from "../../UIComponents/button/button.component";
import {
  OrderSummaryItemPrice,
  OrderSummaryItemPriceContent,
  OrderSummaryItemPriceName,
  OrderSummaryContainer,
  OrderSummaryFooter,
  OrderSummaryItemContainer,
  OrderSummaryItemDetails,
  OrderSummaryItemTitle,
  OrderSummaryTotal,
  OrderSummaryTotalText,
  OrderSummaryTotalValue,
  OrderSummaryItemDetail,
  OrderSummaryItemTotalText,
  OrderSummaryItemTotalValue,
  OrderSummaryItemTotal,
  OrderSummaryItemPriceText,
  OrderSummaryItemPriceAge,
  OrderSummaryFooterWrapper,
  OrderSummaryPriceNote,
} from "./orderSummary.style";

const OrderSummaryItem = () => {
  return (
    <OrderSummaryItemContainer>
      <OrderSummaryItemTitle>The Forest Hiker</OrderSummaryItemTitle>
      <OrderSummaryItemDetails>
        <OrderSummaryItemDetail>
          <OrderSummaryItemPriceText>
            <OrderSummaryItemPriceName>Adult</OrderSummaryItemPriceName>
            <OrderSummaryItemPriceAge> (16+ years)</OrderSummaryItemPriceAge>
          </OrderSummaryItemPriceText>
          <OrderSummaryItemPriceContent>2 x $180</OrderSummaryItemPriceContent>
          <OrderSummaryItemPrice>$320</OrderSummaryItemPrice>
        </OrderSummaryItemDetail>
        <OrderSummaryItemDetail>
          <OrderSummaryItemPriceText>
            <OrderSummaryItemPriceName>Kid</OrderSummaryItemPriceName>
            <OrderSummaryItemPriceAge>(4-15 years)</OrderSummaryItemPriceAge>
          </OrderSummaryItemPriceText>
          <OrderSummaryItemPriceContent>2 x $120</OrderSummaryItemPriceContent>
          <OrderSummaryItemPrice>$240</OrderSummaryItemPrice>
        </OrderSummaryItemDetail>
      </OrderSummaryItemDetails>
      <OrderSummaryItemTotal>
        <OrderSummaryItemTotalText>Price</OrderSummaryItemTotalText>
        <OrderSummaryItemTotalValue>$440</OrderSummaryItemTotalValue>
      </OrderSummaryItemTotal>
    </OrderSummaryItemContainer>
  );
};

const OrderSummary = () => {
  return (
    <OrderSummaryContainer>
      <OrderSummaryItem />
      <OrderSummaryItem />
      <OrderSummaryItem />
      <OrderSummaryFooter>
        <OrderSummaryFooterWrapper>
          <OrderSummaryTotal>
            <OrderSummaryTotalText>Total</OrderSummaryTotalText>
            <OrderSummaryTotalValue>$470.34</OrderSummaryTotalValue>
          </OrderSummaryTotal>
          <OrderSummaryPriceNote>
            All Taxes and fees included
          </OrderSummaryPriceNote>
        </OrderSummaryFooterWrapper>

        <Button>Validate Payment</Button>
      </OrderSummaryFooter>
    </OrderSummaryContainer>
  );
};

export default OrderSummary;
