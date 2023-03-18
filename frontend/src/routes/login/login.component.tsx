import LoginForm from "../../components/authenticationComponents/loginForm.component";
import { LoginContainer, LoginWrapper } from "./login.style";

export const Login = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
