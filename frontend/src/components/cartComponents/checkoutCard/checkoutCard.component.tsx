import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "../../../store/user/user.selector";
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
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  const handleCheckout = () => {
    if (userId) return navigate("/checkout/step2");
    navigate("/login?uri=/checkout/step2");
  };

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
      <Button
        onClick={() => {
          handleCheckout();
        }}
      >
        Checkout
      </Button>
    </CheckoutCardContainer>
  );
};

export default CheckoutCard;
