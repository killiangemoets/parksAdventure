import LoginForm from "../../components/authenticationComponents/loginForm.component";
import useCheckLogin from "../../hooks/checkLogin";
import { LoginContainer, LoginWrapper } from "./login.style";

export const Login = () => {
  // const showLoginForm = useCheckLogin();

  return (
    <LoginContainer>
      <LoginWrapper>{true && <LoginForm />}</LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
