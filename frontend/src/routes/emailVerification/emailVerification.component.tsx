import Button from "../../components/UIComponents/button/button.component";
import Title from "../../components/UIComponents/title/title.component";
import {
  EmailVerificationContainer,
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
  EmailVerificationWrapper,
} from "./emailVerification.style";
import roundLogo from "./../../assets/logo_hike_round.png";
import { useSelector } from "react-redux";
import { selectEmail } from "../../store/user/user.selector";

const EmailVerification = () => {
  const email = useSelector(selectEmail);
  if (!email) {
    return <EmailVerificationContainer>ERROR 404</EmailVerificationContainer>;
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
          <Button>Resend Email</Button>
          <EmailVerificationParagraph>
            Need help?{" "}
            <EmailVerificationLink to={"/"}>Contact Us</EmailVerificationLink>
          </EmailVerificationParagraph>
        </EmailVerificationWrapper>
      </EmailVerificationContainer>
    );
  }
};

export default EmailVerification;
