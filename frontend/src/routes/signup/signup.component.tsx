import SignupForm from "../../components/authenticationComponents/signupForm.component";
import useCheckLogin from "../../hooks/checkLogin";
import { SignupContainer, SignupWrapper } from "./signup.style";

export const Signup = () => {
  // const showSignUpForm = useCheckLogin();

  return (
    <SignupContainer>
      <SignupWrapper>{true && <SignupForm />}</SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
