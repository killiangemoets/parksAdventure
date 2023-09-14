import { FC } from "react";
import LoginForm from "../../components/authenticationComponents/loginForm.component";
import { LoginContainer, LoginWrapper } from "./login.style";

export const Login: FC<{ showLinks?: boolean }> = ({ showLinks }) => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginForm showLinks={showLinks} />
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
