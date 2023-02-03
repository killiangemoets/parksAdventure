import SignupCard from "../../components/authenticationComponents/signupCard.component";
import { SignupContainer, SignupWrapper } from "./signup.style";

export const Signup = () => {
  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupCard />
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
