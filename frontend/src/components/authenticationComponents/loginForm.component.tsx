import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { login } from "../../api/authentication-requests";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/user/user.action";
import { selectEmail } from "../../store/user/user.selector";
import FormButton from "../UIComponents/formButton/formButton.component";

export const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const savedEmail = useSelector(selectEmail);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    email: savedEmail || "",
    password: "",
  });
  const { email, password } = loginData;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    const newUri = searchParams.get("uri");
    setUri(newUri ? newUri.replaceAll("%26", "&") : null);
  }, [searchParams]);

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
      setSuccess(true);
      const {
        email,
        firstname,
        lastname,
        photo,
        phoneNumber,
        birthDate,
        wishlist,
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
          wishlist,
          role,
          id,
        })
      );
      setTimeout(function () {
        setSuccess(false);
        return navigate(uri || "/");
      }, 2000);
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
          <FormButton loading={loading} success={success}>
            LOGIN
          </FormButton>
        </AuthenticationForm>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </AuthenticationCard>
      <AuthenticationLinkSmall to="/login/forgot-password">
        Forgot password?
      </AuthenticationLinkSmall>
      <AuthenticationLink to={uri ? `/signup?uri=${uri}` : "/signup"}>
        Don't have an account yet?
      </AuthenticationLink>
    </AuthenticationContainer>
  );
};

export default LoginForm;
