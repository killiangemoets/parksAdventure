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
  AuthenticationLinkSmall,
} from "./authentication.style";

export const LoginCard = () => {
  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          Log into your account
        </Title>
        <AuthenticationForm>
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
            minlength="8"
            type="password"
          />
          <Button>LOGIN</Button>
        </AuthenticationForm>
      </AuthenticationCard>
      <AuthenticationLinkSmall>Forgot password?</AuthenticationLinkSmall>
      <AuthenticationLink>Need to create an account?</AuthenticationLink>
    </AuthenticationContainer>
  );
};

export default LoginCard;
