import Button from "../../UIComponents/button/button.component";
import { OrderSummaryContainer, OrderSummaryFooter, OrderSummaryFooterWrapper, OrderSummaryItemContainer, OrderSummaryItemDetail, OrderSummaryItemDetails, OrderSummaryItemPrice, OrderSummaryItemPriceAge, OrderSummaryItemPriceContent, OrderSummaryItemPriceName, OrderSummaryItemPriceText, OrderSummaryItemTitle, OrderSummaryItemTotal, OrderSummaryItemTotalText, OrderSummaryItemTotalValue, OrderSummaryPriceNote, OrderSummaryTotal, OrderSummaryTotalText, OrderSummaryTotalValue, ValidatePaymentError } from "./orderSummary.style";
import { TItemWithTourInfo } from "../../../types/booking";
import { FC, useState } from "react";
import calculateTotalPrice, { calculateBasketPrice } from "../../../utils/dataManipulation/calculateTotalPrice";
import { getCheckoutSession } from "../../../api/booking-requests";
import Spinner, { SPINNER_TYPE_CLASSES } from "../../UIComponents/spinner/spinner.component";
import { useNavigate } from "react-router-dom";

type OrderSummaryItemProps = {
  item: TItemWithTourInfo;
  onlyItem?: boolean
}

const OrderSummaryItem: FC<OrderSummaryItemProps> = ({item, onlyItem = false}) => {
  return (
    <OrderSummaryItemContainer>
      <OrderSummaryItemTitle>{item.tour.name}</OrderSummaryItemTitle>
      <OrderSummaryItemDetails>
          {item.adults > 0 && 
            <OrderSummaryItemDetail>
              <OrderSummaryItemPriceText>
                <OrderSummaryItemPriceName>Adult</OrderSummaryItemPriceName>
                <OrderSummaryItemPriceAge> (16+ years)</OrderSummaryItemPriceAge>
              </OrderSummaryItemPriceText>
                  <OrderSummaryItemPriceContent>{`${item.adults} x $${item.price}`}</OrderSummaryItemPriceContent>
                  <OrderSummaryItemPrice>${item.adults*item.price}</OrderSummaryItemPrice>
            </OrderSummaryItemDetail>
          }
          {item.children > 0 && 
        <OrderSummaryItemDetail>
          <OrderSummaryItemPriceText>
            <OrderSummaryItemPriceName>Kid</OrderSummaryItemPriceName>
            <OrderSummaryItemPriceAge>(4-15 years)</OrderSummaryItemPriceAge>
          </OrderSummaryItemPriceText>
              <OrderSummaryItemPriceContent>{`${item.children} x $${item.kidPrice ||  item.price}`}</OrderSummaryItemPriceContent>
              <OrderSummaryItemPrice>${item.children*(item.kidPrice ||  item.price)}</OrderSummaryItemPrice>
        </OrderSummaryItemDetail>
          }
      </OrderSummaryItemDetails>
      <OrderSummaryItemTotal showTotalPrice={!onlyItem}>
      {!onlyItem && <>
        <OrderSummaryItemTotalText>Price</OrderSummaryItemTotalText>
       <OrderSummaryItemTotalValue>${calculateTotalPrice(item.adults, item.children, item.price, item.kidPrice)}</OrderSummaryItemTotalValue>
       </>}
      </OrderSummaryItemTotal>
    </OrderSummaryItemContainer>
  );
};


type OrderSummaryProps = {
  items: TItemWithTourInfo[];
}
const OrderSummary: FC<OrderSummaryProps> = ({items}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleValidatePayment = async () => {
    setLoading(!loading);
    const response = await getCheckoutSession(items);
    console.log(response);
    setLoading(false);
    if (response.status === "success") {
      return window.location.href = response.data.session;
    } else{
      setErrorMessage('An error occured. Please try again or go back to cart!')
      if(response.message.includes("tour is not available anymore"))
        navigate("/cart");
    }
  }
  return (
    <>
    <OrderSummaryContainer>
      {items.map((item, i) => {
        return <OrderSummaryItem key={i} item={item} onlyItem={items.length === 1} />
      })}
      <OrderSummaryFooter>
        <OrderSummaryFooterWrapper>
          <OrderSummaryTotal>
            <OrderSummaryTotalText>Total</OrderSummaryTotalText>
            <OrderSummaryTotalValue>${calculateBasketPrice(items)}</OrderSummaryTotalValue>
          </OrderSummaryTotal>
          <OrderSummaryPriceNote>
            All Taxes and fees included
          </OrderSummaryPriceNote>
        </OrderSummaryFooterWrapper>
        <Button onClick={handleValidatePayment}>{loading ? 
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.small} /> : "Validate Payment"}</Button>
      </OrderSummaryFooter>
    </OrderSummaryContainer>
    <ValidatePaymentError>{errorMessage}</ValidatePaymentError>
    </>
  );
};

export default OrderSummary;
