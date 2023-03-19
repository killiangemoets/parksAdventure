import Button from "../UIComponents/button/button.component";
import Title from "../UIComponents/title/title.component";
import {
  EmailVerificationContainer,
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
} from "../../routes/emailVerification/emailVerification.style";
import roundLogo from "./../../assets/logo_hike_round.png";
import { NotFoundWrapper } from "./notFound.style";
import { useNavigate } from "react-router-dom";
import { FC, ReactNode } from "react";

type NoFoundProps = {
  title?: string | ReactNode;
  message?: string | ReactNode;
};

const NotFound: FC<NoFoundProps> = ({ title, message }) => {
  const navigate = useNavigate();
  return (
    <EmailVerificationContainer>
      <NotFoundWrapper>
        <EmailVerificationLogo>
          <img src={roundLogo} alt="hiking tour logo" />
        </EmailVerificationLogo>
        <Title>{title || "Page not found"}</Title>
        <EmailVerificationParagraph>
          {message || (
            <>
              It seems that you have lost your way. <br />
              This can happen to all hikers!
            </>
          )}
        </EmailVerificationParagraph>
        <Button
          onClick={() => {
            return navigate("/");
          }}
        >
          Back to Home
        </Button>
        <EmailVerificationParagraph>
          Need help?{" "}
          <EmailVerificationLink to={"/contact"}>
            Contact Us
          </EmailVerificationLink>
        </EmailVerificationParagraph>
      </NotFoundWrapper>
    </EmailVerificationContainer>
  );
};

export default NotFound;
