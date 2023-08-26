import {
  EmailVerificationContainer,
  EmailVerificationErrorMessage,
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
  EmailVerificationSection,
  EmailVerificationWrapper,
} from "./emailVerification.style";
import roundLogo from "./../../assets/logo_hike_round.png";
import { useSelector } from "react-redux";
import { selectEmail } from "../../store/user/user.selector";
import NotFound from "../../components/notFoundComponent/notFound.component";
import { resendEmail } from "../../api/authentication-requests";
import { useState } from "react";
import FormButton from "../../components/UIComponents/formButton/formButton.component";
import Title from "../../components/UIComponents/title/title.component";
import { useSearchParams } from "react-router-dom";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const email = useSelector(selectEmail);
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleResendEmail = async (email: string) => {
    setLoading(true);
    setError("");
    const redirectUri = searchParams.get("uri");
    const response = await resendEmail(email, redirectUri);
    setLoading(false);
    if (response && response.status === "success") {
      setSent(true);
      setTimeout(function () {
        setSent(false);
      }, 3000);
    } else {
      if (
        response &&
        response.message ===
          "You have reached the limit of the number of emails you can send"
      )
        setError(response.message);
      else if (
        response &&
        response.message === "The email of this user has already been verified"
      )
        setError(response.message);
      else setError("An error occured. Please refresh the page and try again!");
    }
  };
  if (!email) {
    return <NotFound title="There is no email to verify" />;
  } else {
    return (
      <EmailVerificationContainer>
        <EmailVerificationWrapper>
          <EmailVerificationLogo>
            <img src={roundLogo} alt="hiking tour logo" />
          </EmailVerificationLogo>
          <Title>Please verify your email</Title>
          <EmailVerificationParagraph>
            You're almost there! We sent an email to <br />
            <span>{email}</span>.
          </EmailVerificationParagraph>
          <EmailVerificationParagraph>
            Just click on the link in that email to complete your signup. <br />
            If you don't see it, you may need to <span>
              check your spam
            </span>{" "}
            folder.
          </EmailVerificationParagraph>
          <EmailVerificationParagraph>
            Still can't find the email?
          </EmailVerificationParagraph>
          <EmailVerificationSection>
            <FormButton
              loading={loading}
              success={sent}
              handleClick={() => handleResendEmail(email)}>
              Resend Email
            </FormButton>
            <EmailVerificationErrorMessage>
              {error}
            </EmailVerificationErrorMessage>
          </EmailVerificationSection>

          <EmailVerificationParagraph>
            Need help?{" "}
            <EmailVerificationLink to={"/contact"}>
              Contact Us
            </EmailVerificationLink>
          </EmailVerificationParagraph>
        </EmailVerificationWrapper>
      </EmailVerificationContainer>
    );
  }
};

export default EmailVerification;
