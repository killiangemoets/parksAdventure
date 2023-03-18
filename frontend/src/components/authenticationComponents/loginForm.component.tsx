import { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../../api/authentication-requests";
import { useNavigate } from "react-router-dom";
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
  ErrorMessage,
} from "./authentication.style";
import { LoginData } from "../../types/user";
import Spinner from "../UIComponents/spinner/spinner.component";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user.action";

export const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newLoginData = { ...loginData, [name]: value };
    setLoginData(newLoginData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const response = await login(loginData);
    setLoading(false);
    if (response.status === "success") {
      const {
        email,
        firstname,
        lastname,
        photo,
        phoneNumber,
        birthDate,
        role,
        _id: id,
      } = response.data.user;
      dispatch(
        setUser({
          email,
          firstname,
          lastname,
          photo,
          phoneNumber,
          birthDate,
          role,
          id,
        })
      );
      return navigate("/");
    } else setErrorMessage(response.message);
  };

  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          Log into your account
        </Title>
        <AuthenticationForm onSubmit={handleSubmit}>
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Password"
            placeholder="••••••••"
            required
            minLength={8}
            onChange={handleChange}
            value={password}
            name="password"
            type="password"
          />
          <Button>{loading ? <Spinner /> : "LOGIN"}</Button>
        </AuthenticationForm>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </AuthenticationCard>
      <AuthenticationLinkSmall to="/">Forgot password?</AuthenticationLinkSmall>
      <AuthenticationLink to="/signup">
        Need to create an account?
      </AuthenticationLink>
    </AuthenticationContainer>
  );
};

export default LoginForm;
