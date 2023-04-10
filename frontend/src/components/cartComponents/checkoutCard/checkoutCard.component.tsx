import { FC } from "react";
import Button from "../../UIComponents/button/button.component";
import {
  CheckoutCardBody,
  CheckoutCardContainer,
  CheckoutCardInfo,
  CheckoutCardText,
  CheckoutCardTitle,
  CheckoutCardTotal,
} from "./checkoutCard.style";

type CheckoutCardProps = {
  numberOfItems: number;
  totalPrice: number;
};

const CheckoutCard: FC<CheckoutCardProps> = ({ numberOfItems, totalPrice }) => {
  return (
    <CheckoutCardContainer>
      <CheckoutCardBody>
        <CheckoutCardTitle>
          Total (
          {numberOfItems > 1
            ? `${numberOfItems} items`
            : `${numberOfItems} item`}
          ):
        </CheckoutCardTitle>
        <CheckoutCardInfo>
          <CheckoutCardTotal>${totalPrice}</CheckoutCardTotal>
          <CheckoutCardText>All taxes and fees included</CheckoutCardText>
        </CheckoutCardInfo>
      </CheckoutCardBody>
      <Button>Checkout</Button>
    </CheckoutCardContainer>
  );
};

export default CheckoutCard;
