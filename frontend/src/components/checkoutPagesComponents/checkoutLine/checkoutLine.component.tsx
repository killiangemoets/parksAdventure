import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CHECKOUT_STATES, TCheckoutState } from "../../../types/booking";
import {
  CheckoutContent,
  CheckoutLineBetweenSteps,
  CheckoutLineContainer,
  CheckoutLineElement,
  CheckoutStepCircle,
  CheckoutStepContainer,
  CheckoutStepNumber,
  CheckoutStepTitle,
} from "./checkoutLine.style";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../store/user/user.selector";

type CheckoutStepProps = {
  number: number;
  title: string;
  state?: TCheckoutState;
};

export const CheckoutStep: FC<CheckoutStepProps> = ({
  number,
  title,
  state = CHECKOUT_STATES.to_do,
}) => {
  return (
    <CheckoutStepContainer>
      <CheckoutStepCircle state={state}>
        <CheckoutStepNumber state={state}>{number}</CheckoutStepNumber>
      </CheckoutStepCircle>
      <CheckoutStepTitle state={state}>{title}</CheckoutStepTitle>
    </CheckoutStepContainer>
  );
};

type CheckoutLineProps = {
  step?: 1 | 2 | 3 | 4;
};

const CheckoutLine: FC<CheckoutLineProps> = ({ step = 1 }) => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (!userId) navigate("/login?uri=/checkout/step2");
  }, [navigate, userId]);

  return (
    <CheckoutLineContainer>
      <CheckoutLineElement>
        <CheckoutStep
          number={1}
          title={"Login"}
          state={
            step > 1
              ? CHECKOUT_STATES.done
              : step < 1
              ? CHECKOUT_STATES.to_do
              : CHECKOUT_STATES.in_progress
          }
        />
        <CheckoutLineBetweenSteps passed={step >= 2 ? true : false} />
        <CheckoutStep
          number={2}
          title={"Overview"}
          state={
            step > 2
              ? CHECKOUT_STATES.done
              : step < 2
              ? CHECKOUT_STATES.to_do
              : CHECKOUT_STATES.in_progress
          }
        />
        <CheckoutLineBetweenSteps passed={step >= 3 ? true : false} />
        <CheckoutStep
          number={3}
          title={"Payment"}
          state={
            step > 3
              ? CHECKOUT_STATES.done
              : step < 3
              ? CHECKOUT_STATES.to_do
              : CHECKOUT_STATES.in_progress
          }
        />
        <CheckoutLineBetweenSteps passed={step >= 4 ? true : false} />
        <CheckoutStep
          number={4}
          title={"Confirmation"}
          state={
            step > 4
              ? CHECKOUT_STATES.done
              : step < 4
              ? CHECKOUT_STATES.to_do
              : CHECKOUT_STATES.in_progress
          }
        />
      </CheckoutLineElement>
      <CheckoutContent>
        <Outlet />
      </CheckoutContent>
    </CheckoutLineContainer>
  );
};

export default CheckoutLine;
