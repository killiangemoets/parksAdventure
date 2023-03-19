import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/authentication-requests";
import { AppDispatch } from "../../store/store";
import { setEmail } from "../../store/user/user.action";
import { SignUpData } from "../../types/user";
import FormButton from "../UIComponents/formButton/formButton.component";
import TextInput from "../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../UIComponents/title/title.component";
import {
  AuthenticationCard,
  AuthenticationContainer,
  AuthenticationForm,
  AuthenticationLink,
  ErrorMessage,
} from "./authentication.style";

export const SignupForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { firstname, lastname, email, password, passwordConfirm } = signUpData;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newSignUpData = { ...signUpData, [name]: value };
    setSignUpData(newSignUpData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setErrorMessage("Passwords are not the same");
    }
    setLoading(true);
    setErrorMessage("");
    const response = await signUp(signUpData);
    setLoading(false);
    console.log(response);
    if (response.status === "success") {
      setSuccess(true);
      dispatch(setEmail(email));
      setTimeout(function () {
        setSuccess(false);
        return navigate("/signup/email-verification");
      }, 2000);
    } else {
      if (response.message.includes("Duplicate field value"))
        setErrorMessage("This email address is already used");
      else setErrorMessage("Something went wrong. Please try again!");
    }
  };

  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          Create a new account
        </Title>
        <AuthenticationForm onSubmit={handleSubmit}>
          <TextInput
            label="Firstname"
            placeholder="your firstname"
            type="name"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Lastname"
            placeholder="your lastname"
            type="name"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            required
          />
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
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <TextInput
            label="Confirm password"
            placeholder="••••••••"
            required
            minLength={8}
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
          <FormButton loading={loading} success={success}>
            SIGN UP
          </FormButton>
        </AuthenticationForm>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </AuthenticationCard>
      <AuthenticationLink to="/login">
        Already have an account?
      </AuthenticationLink>
    </AuthenticationContainer>
  );
};

export default SignupForm;
