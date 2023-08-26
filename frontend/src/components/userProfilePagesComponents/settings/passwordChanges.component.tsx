import { FormEvent, useState } from "react";
import { UpdateUserPasswordData } from "../../../types/user";
import CheckBoxes from "../../UIComponents/checkBoxes/checkBoxes.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ErrorMessage,
  LogoutCheckBox,
} from "../../authenticationComponents/authentication.style";
import {
  SettingsContainer,
  SettingsForm,
  SettingsInputs,
  SettingsWrapper1,
  UpdateButtonContainer,
} from "./settings.style";
import FormButton from "../../UIComponents/formButton/formButton.component";
import { updateMyPassword } from "../../../api/authentication-requests";

const PasswordChange = () => {
  const [passwordsData, setPasswordsData] = useState<UpdateUserPasswordData>({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
    stayConnected: false,
  });
  const { passwordCurrent, password, passwordConfirm, stayConnected } =
    passwordsData;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (name: string, value: string | boolean) => {
    const newPasswords = { ...passwordsData, [name]: value };
    setPasswordsData(newPasswords);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setErrorMessage("Passwords are not the same");
    }
    setLoading(true);
    setErrorMessage("");
    const response = await updateMyPassword(passwordsData);

    setLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      setPasswordsData({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
        stayConnected,
      });
      setTimeout(function () {
        setSuccess(false);
      }, 2000);
    } else {
      if (response && response.message.includes("current password is wrong"))
        setErrorMessage("Your current password is wrong");
      else
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
    }
  };

  return (
    <SettingsContainer>
      <SettingsWrapper1>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Password Change</Title>
        <SettingsForm onSubmit={handleSubmit}>
          <SettingsInputs>
            <TextInput
              label="Current Password"
              placeholder="••••••••"
              required
              minLength={8}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              value={passwordCurrent}
              name="passwordCurrent"
              type="password"
            />
            <TextInput
              label="New Password"
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
                  !stayConnected
                    ? [
                        {
                          value: "Log out of all devices",
                          id: "logout",
                        },
                      ]
                    : []
                }
                handler={() => {
                  handleChange("stayConnected", !stayConnected);
                }}
              />
            </LogoutCheckBox>
          </SettingsInputs>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <UpdateButtonContainer>
            <FormButton loading={loading} success={success}>
              Update Password
            </FormButton>
          </UpdateButtonContainer>
        </SettingsForm>
      </SettingsWrapper1>
    </SettingsContainer>
  );
};
export default PasswordChange;
