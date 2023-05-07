import { useEffect } from "react";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { ValidationStepContainer } from "./validationStep.style";
import { useNavigate, useParams } from "react-router-dom";
import { validateOrder } from "../../../api/booking-requests";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../store/cart/cart.action";

type ValidationStepRouteParams = {
  token: string;
};

const ValidationStep = () => {
  const { token } = useParams<
    keyof ValidationStepRouteParams
  >() as ValidationStepRouteParams;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handlePaymentValidation = async (token: string) => {
      const response = await validateOrder(token);
      if (response.status === "success") {
        dispatch(clearCart());
        navigate("/checkout/step4");
      } else navigate("/checkout/step3");
    };
    handlePaymentValidation(token);
  }, []);

  return (
    <ValidationStepContainer>
      <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
    </ValidationStepContainer>
  );
};

export default ValidationStep;
