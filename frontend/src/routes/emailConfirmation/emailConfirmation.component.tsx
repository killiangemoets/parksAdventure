import Button from "../../components/UIComponents/button/button.component";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../components/UIComponents/spinner/spinner.component";
import Title from "../../components/UIComponents/title/title.component";
import {
  EmailVerificationContainer,
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
} from "../emailVerification/emailVerification.style";

import roundLogo from "./../../assets/logo_hike_round.png";
import {
  EmailConfirmationBody,
  EmailConfirmationWrapper,
} from "./emailConfirmation.style";

const EmailConfirmation = () => {
  return (
    <EmailVerificationContainer>
      <EmailConfirmationWrapper>
        <EmailVerificationLogo>
          <img src={roundLogo} alt="hiking tour logo" />
        </EmailVerificationLogo>
        <Title>Your account is being verified</Title>
        <EmailConfirmationBody>
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        </EmailConfirmationBody>
        <EmailVerificationParagraph>
          Need help?{" "}
          <EmailVerificationLink to={"/"}>Contact Us</EmailVerificationLink>
        </EmailVerificationParagraph>
      </EmailConfirmationWrapper>
    </EmailVerificationContainer>
  );
};

export default EmailConfirmation;
