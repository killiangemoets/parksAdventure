import ForgotPasswordForm from "../../components/authenticationComponents/forgotPasswordForm.component";
import {
  ForgotPasswordContainer,
  ForgotPasswordWrapper,
} from "./forgotPassword.style";

export const ForgotPassword = () => {
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordWrapper>
        <ForgotPasswordForm />
      </ForgotPasswordWrapper>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
