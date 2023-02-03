import LoginCard from "../../components/authenticationComponents/loginCard.component";
import { LoginCOntainer, LoginWrapper } from "./login.style";

export const Login = () => {
  return (
    <LoginCOntainer>
      <LoginWrapper>
        <LoginCard />
      </LoginWrapper>
    </LoginCOntainer>
  );
};

export default Login;
