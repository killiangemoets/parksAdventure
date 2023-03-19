import ResetPasswordForm from "../../components/authenticationComponents/resetPasswordForm.component";
import {
  ResetPasswordContainer,
  ResetPasswordWrapper,
} from "./resetPassword.style";

export const ResetPassword = () => {
  return (
    <ResetPasswordContainer>
      <ResetPasswordWrapper>
        <ResetPasswordForm />
      </ResetPasswordWrapper>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
