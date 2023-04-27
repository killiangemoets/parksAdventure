import { ChangeEvent, FormEvent, useState } from "react";
import { forgotPassword } from "../../api/authentication-requests";
import FormButton from "../UIComponents/formButton/formButton.component";
import TextInput from "../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../UIComponents/title/title.component";
import {
  AuthenticationCard,
  AuthenticationContainer,
  AuthenticationForm,
  ErrorMessage,
  ForgotPasswordButtonContainer,
  Messages,
  SuccessMessage,
} from "./authentication.style";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const response = await forgotPassword(email);
    console.log(response);
    setLoading(false);

    if (response.status === "success") {
      setSuccess(true);
      setSuccessMessage(
        "If an account exists with this email address, we sent you an email with the instructions to reset your password."
      );
      setTimeout(function () {
        setSuccess(false);
      }, 2000);
    } else {
      if (
        response.message.includes("There is no user with this email address.")
      ) {
        // setErrorMessage(response.message);
        setSuccess(true);
        setSuccessMessage(
          "If an account exists with this email address, we sent you an email with the instructions to reset your password."
        );
        setTimeout(function () {
          setSuccess(false);
        }, 2000);
      } else setErrorMessage("Something went wrong. Please try again!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Forgot Password</Title>
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
          <ForgotPasswordButtonContainer>
            <FormButton loading={loading} success={success}>
              Get new password
            </FormButton>
          </ForgotPasswordButtonContainer>
        </AuthenticationForm>
        <Messages>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SuccessMessage>{successMessage}</SuccessMessage>
        </Messages>
      </AuthenticationCard>
    </AuthenticationContainer>
  );
};

export default ForgotPasswordForm;
