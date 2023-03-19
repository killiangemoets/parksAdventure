import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/authentication-requests";
import { PasswordsData } from "../../types/user";
import CheckBoxes from "../UIComponents/checkBoxes/checkBoxes.component";
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
  LogoutCheckBox,
  Messages,
  SuccessMessage,
} from "./authentication.style";

type ResetPasswordRouteParams = {
  token: string;
};

const ResetPasswordForm = () => {
  const { token } = useParams<
    keyof ResetPasswordRouteParams
  >() as ResetPasswordRouteParams;
  const navigate = useNavigate();
  const [passwordsData, setPasswordsData] = useState<PasswordsData>({
    password: "",
    passwordConfirm: "",
    logout: true,
  });
  const { password, passwordConfirm, logout } = passwordsData;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setErrorMessage("Passwords are not the same");
    }
    setLoading(true);
    setErrorMessage("");
    const response = await resetPassword(
      token,
      password,
      passwordConfirm,
      !logout
    );
    setLoading(false);
    if (response.status === "success") {
      setSuccess(true);
      setSuccessMessage("Your password has been successfully updated!");
      setTimeout(function () {
        setSuccess(false);
        return navigate("/login");
      }, 3000);
    } else {
      if (response.message.includes("Token is invalid or has expired"))
        setErrorMessage("This url is invalid or has expired");
      else setErrorMessage("Something went wrong. Please try again!");
    }
  };

  const handleChange = (name: string, value: string | boolean) => {
    const newPasswords = { ...passwordsData, [name]: value };
    setPasswordsData(newPasswords);
  };

  return (
    <AuthenticationContainer>
      <AuthenticationCard>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Reset password</Title>
        <AuthenticationForm onSubmit={handleSubmit}>
          <TextInput
            label="Password"
            placeholder="••••••••"
            required
            minLength={8}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            value={password}
            name="password"
            type="password"
          />
          <TextInput
            label="Confirm password"
            placeholder="••••••••"
            required
            minLength={8}
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
          <LogoutCheckBox>
            <CheckBoxes
              options={[
                {
                  value: "Log out of all devices",
                  id: "logout",
                },
              ]}
              selection={
                logout
                  ? [
                      {
                        value: "Log out of all devices",
                        id: "logout",
                      },
                    ]
                  : []
              }
              handler={() => {
                handleChange("logout", !logout);
              }}
            />
          </LogoutCheckBox>

          <FormButton loading={loading} success={success}>
            Reset password
          </FormButton>
        </AuthenticationForm>
        <Messages>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SuccessMessage>{successMessage}</SuccessMessage>
        </Messages>{" "}
      </AuthenticationCard>
    </AuthenticationContainer>
  );
};

export default ResetPasswordForm;
