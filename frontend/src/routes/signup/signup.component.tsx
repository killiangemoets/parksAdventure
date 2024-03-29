import SignupForm from "../../components/authenticationComponents/signupForm.component";
import { SignupContainer, SignupWrapper } from "./signup.style";

export const Signup = () => {
  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupForm />
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
