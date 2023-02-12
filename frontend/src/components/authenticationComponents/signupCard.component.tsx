import Button from "../UIComponents/button/button.component";
import TextInput from "../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../UIComponents/title/title.component";
import {
  AuthenticationCard,
  AuthenticationContainer,
  AuthenticationForm,
  AuthenticationLink,
} from "./authentication.style";

export const SignupCard = () => {
  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          Create a new account
        </Title>
        <AuthenticationForm>
          <TextInput
            label="Full name"
            placeholder="your name"
            type="name"
            required
          />
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            type="email"
            required
          />
          <TextInput
            label="Password"
            placeholder="••••••••"
            required
            minLength={8}
            type="password"
          />
          <TextInput
            label="Confirm password"
            placeholder="••••••••"
            required
            minLength={8}
            type="password"
          />
          <Button>SIGN UP</Button>
        </AuthenticationForm>
      </AuthenticationCard>
      <AuthenticationLink to="/login">
        Already have an account?
      </AuthenticationLink>
    </AuthenticationContainer>
  );
};

export default SignupCard;
