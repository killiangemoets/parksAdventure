import { useSelector } from "react-redux";
import { selectOrder } from "../../../store/cart/cart.selector";
import CartItem from "../../cartComponents/cartItem/cartItem.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import OrderSummary from "./orderSummary.component";
import {
  CartContainer,
  OverviewStepContainer,
  OverviewStepLeft,
  OverviewStepRight,
  OverviewStepSection,
} from "./overviewStep.style";
import PersonalDetails from "./personalDetails.component";

const OverviewStep = () => {
  const orderItems = useSelector(selectOrder);

  return (
    <OverviewStepContainer>
      <OverviewStepLeft>
        <OverviewStepSection>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            Check your personal details
          </Title>
          <PersonalDetails />
        </OverviewStepSection>
        <OverviewStepSection>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Check your cart</Title>
          <CartContainer>
            {orderItems.map((item, i) => (
              <CartItem
                key={i}
                startingDate={item.startingDate}
                kidPrice={item.kidPrice}
                price={item.price}
                adults={item.adults}
                children={item.children}
                tour={item.tour}
              />
            ))}
          </CartContainer>
        </OverviewStepSection>
      </OverviewStepLeft>
      <OverviewStepRight>
        <OverviewStepSection>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Order summary</Title>
          <OrderSummary />
        </OverviewStepSection>
      </OverviewStepRight>
    </OverviewStepContainer>
  );
};

export default OverviewStep;
