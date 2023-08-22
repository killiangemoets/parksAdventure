import { useDispatch, useSelector } from "react-redux";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DateInput, {
  DATE_INPUT_TYPES,
} from "../../UIComponents/dateInput/dateInput.component";

import TextInput from "../../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  SettingsContainer,
  SettingsInputs,
  SaveButtonContainer,
  SettingsWrapper1,
  SettingsForm,
} from "./settings.style";
import { selectUserReducer } from "../../../store/user/user.selector";
import { ChangeEvent, FormEvent, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { UpdateUserInputData } from "../../../types/user";
import { ErrorMessage } from "../../authenticationComponents/authentication.style";
import { updateMe } from "../../../api/user-requests";
import { updateUser } from "../../../store/user/user.action";
import FormButton from "../../UIComponents/formButton/formButton.component";
import ProfilePictureInput from "../../UIComponents/profilePictureInput/profilePictureInput.component";

const AccountSettings = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUserReducer);
  const { firstname, lastname, email, phoneNumber, birthDate, photo } = user;
  const [userInputsData, setUserInputsData] = useState<UpdateUserInputData>({
    firstname,
    lastname,
    phoneNumber,
    photo,
    birthDate,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (name: string, value: string | Date | null) => {
    setErrorMessage("");
    const newUserData = { ...userInputsData, [name]: value };
    setUserInputsData(newUserData);
  };

  const handleReset = () => {
    setUserInputsData({
      firstname,
      lastname,
      phoneNumber,
      photo,
      birthDate,
    });
  };

  const handleDeleteImage = () => {
    const newUserData = { ...userInputsData, photo: "" };
    setUserInputsData(newUserData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateMe(userInputsData);
    setLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      dispatch(updateUser(userInputsData));
      setTimeout(function () {
        setSuccess(false);
      }, 1000);
    } else {
      if (response && response.message.includes("phoneNumber"))
        setErrorMessage("Please provide a valid phone number");
      if (response && response.message.includes("File size too large"))
        setErrorMessage(
          "The image size is too large. The maximum size is 10 MB."
        );
      else setErrorMessage("An error occured. Please try again!");
    }
  };

  return (
    <SettingsContainer>
      <SettingsWrapper1>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Account Settings</Title>
        <SettingsForm onSubmit={handleSubmit}>
          <SettingsInputs>
            <TextInput
              label="Firstname"
              placeholder="your firstname"
              type="name"
              name="firstname"
              value={userInputsData.firstname || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e.target.name, e.target.value);
              }}
              required
            />
            <TextInput
              label="Lastname"
              placeholder="your lastname"
              type="name"
              name="lastname"
              value={userInputsData.lastname || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e.target.name, e.target.value);
              }}
              required
            />
            <TextInput
              editable={false}
              label="Email address"
              placeholder="you@example.com"
              type="email"
              name="email"
              value={email || ""}
              required
            />
            <TextInput
              label="Phone number*"
              placeholder="000/00.00.00"
              type="tel"
              name="phoneNumber"
              value={userInputsData.phoneNumber || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e.target.name, e.target.value);
              }}
            />
            <DateInput
              currentValue={userInputsData.birthDate || null}
              handleChange={(value) => {
                handleChange("birthDate", value);
              }}
              type={DATE_INPUT_TYPES.RECTANGULAR_INPUT}
              label={"Birth date (jj/mm/yyyy)*"}
            />
          </SettingsInputs>
          <ProfilePictureInput
            image={userInputsData.photo}
            handleDeleteImage={handleDeleteImage}
            handleUpdateImage={(image) => {
              handleChange("photo", image);
            }}
          />

          <ErrorMessage>{errorMessage}</ErrorMessage>
          <SaveButtonContainer>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASSES.cancel}
              onClick={handleReset}>
              Reset
            </Button>
            <FormButton loading={loading} success={success}>
              Save
            </FormButton>
          </SaveButtonContainer>
        </SettingsForm>
      </SettingsWrapper1>
    </SettingsContainer>
  );
};

export default AccountSettings;
