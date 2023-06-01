import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateTourGuide } from "../../../api/authentication-requests";

import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import {
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
} from "../../emailVerification/emailVerification.style";

import roundLogo from "./../../../assets/logo_hike_round.png";
import {
  GuideAccountActivationBody,
  GuideAccountActivationBodyTitleContainer,
  GuideAccountActivationContainer,
  GuideAccountActivationWrapper,
} from "./guideAccountActivation.style";
import TextInput from "../../../components/UIComponents/textInput/textInput.component";
import {
  AuthenticationForm,
  ErrorMessage,
  Messages,
  SuccessMessage,
} from "../../../components/authenticationComponents/authentication.style";
import FormButton from "../../../components/UIComponents/formButton/formButton.component";
import { GuidePasswordsData } from "../../../types/user";

type GuideAccountActivationRouteParams = {
  token: string;
};

const GuideAccountActivation = () => {
  const { token } = useParams<
    keyof GuideAccountActivationRouteParams
  >() as GuideAccountActivationRouteParams;
  const navigate = useNavigate();

  const [passwordsData, setPasswordsData] = useState<GuidePasswordsData>({
    password: "",
    passwordConfirm: "",
  });
  const { password, passwordConfirm } = passwordsData;
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
    const response = await activateTourGuide(token, password, passwordConfirm);

    console.log("TOUR GUIDE ACTIVATION", response);

    setLoading(false);
    if (response.status === "success") {
      setSuccess(true);
      setSuccessMessage("Your account has been successfully created!");
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

  const handleChange = (name: string, value: string) => {
    const newPasswords = { ...passwordsData, [name]: value };
    setPasswordsData(newPasswords);
  };

  return (
    <GuideAccountActivationContainer>
      <GuideAccountActivationWrapper>
        <EmailVerificationLogo>
          <img src={roundLogo} alt="hiking tour logo" />
        </EmailVerificationLogo>
        <GuideAccountActivationBodyTitleContainer>
          <Title titleType={TITLE_TYPE_CLASSES.soft}>
            Weclome in the National Park <br /> Hiking Tours family!
          </Title>
        </GuideAccountActivationBodyTitleContainer>
        <GuideAccountActivationBody>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Create password</Title>
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
            <FormButton loading={loading} success={success}>
              Activate Account
            </FormButton>
          </AuthenticationForm>
          <Messages>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SuccessMessage>{successMessage}</SuccessMessage>
          </Messages>{" "}
        </GuideAccountActivationBody>
        <EmailVerificationParagraph>
          Need help?{" "}
          <EmailVerificationLink to={"/contact"}>
            Contact Us
          </EmailVerificationLink>
        </EmailVerificationParagraph>
      </GuideAccountActivationWrapper>
    </GuideAccountActivationContainer>
  );
};

export default GuideAccountActivation;
