import { useEffect, useState } from "react";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { ValidationStepContainer } from "./validationStep.style";
import { useNavigate, useParams } from "react-router-dom";
import { validateOrder } from "../../../api/booking-requests";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../store/cart/cart.action";
import { CartMessage } from "../../cart/cart.style";

type ValidationStepRouteParams = {
  token: string;
};

const ValidationStep = () => {
  const { token } = useParams<
    keyof ValidationStepRouteParams
  >() as ValidationStepRouteParams;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const handlePaymentValidation = async (token: string) => {
      setErrorMessage(undefined);
      const response = await validateOrder(token);
      if (response && response.status === "success") {
        dispatch(clearCart());
        navigate("/checkout/step4");
      } else
        setErrorMessage(
          "An error occured. Please refresh the page or go back to the cart."
        );
    };
    handlePaymentValidation(token);
  }, [dispatch, navigate, token]);

  return (
    <ValidationStepContainer>
      {errorMessage ? (
        <CartMessage>{errorMessage}</CartMessage>
      ) : (
        <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
      )}
    </ValidationStepContainer>
  );
};

export default ValidationStep;
