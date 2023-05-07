import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../api/authentication-requests";
import NotFound from "../../components/notFoundComponent/notFound.component";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../components/UIComponents/spinner/spinner.component";
import Title from "../../components/UIComponents/title/title.component";
import { AppDispatch } from "../../store/store";
import { removeUser, setUser } from "../../store/user/user.action";
import {
  EmailVerificationContainer,
  EmailVerificationLink,
  EmailVerificationLogo,
  EmailVerificationParagraph,
} from "../emailVerification/emailVerification.style";

import roundLogo from "./../../assets/logo_hike_round.png";
import {
  EmailConfirmationBody,
  EmailConfirmationCheckIcon,
  EmailConfirmationWrapper,
} from "./emailConfirmation.style";

type EmailConfirmationRouteParams = {
  token: string;
};

const EmailConfirmation = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useParams<
    keyof EmailConfirmationRouteParams
  >() as EmailConfirmationRouteParams;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const handleVerifyEmail = async (token: string) => {
      console.log({ token });
      const response = await verifyEmail(token);
      if (response.status === "success") {
        if (response.data.user) {
          const {
            email,
            firstname,
            lastname,
            photo,
            phoneNumber,
            birthDate,
            wishlist,
            role,
            _id: id,
          } = response.data.user;
          dispatch(
            setUser({
              email,
              firstname,
              lastname,
              photo,
              phoneNumber,
              birthDate,
              wishlist,
              role,
              id,
            })
          );
          setTimeout(function () {
            const uri = window.location.href.split("uri=").slice(-1)[0];
            console.log({ uri });
            return navigate(uri || "/");
          }, 2000);
        } else {
          setTimeout(function () {
            return navigate("/login");
          }, 2000);
        }
      } else {
        setError(true);
        dispatch(removeUser());
      }
      setLoading(false);
    };
    handleVerifyEmail(token);
  }, [token]);

  if (!error)
    return (
      <EmailVerificationContainer>
        <EmailConfirmationWrapper>
          <EmailVerificationLogo>
            <img src={roundLogo} alt="hiking tour logo" />
          </EmailVerificationLogo>
          <Title>Your account is being verified</Title>
          <EmailConfirmationBody>
            {loading ? (
              <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
            ) : (
              <EmailConfirmationCheckIcon />
            )}
          </EmailConfirmationBody>
          <EmailVerificationParagraph>
            Need help?{" "}
            <EmailVerificationLink to={"/contact"}>
              Contact Us
            </EmailVerificationLink>
          </EmailVerificationParagraph>
        </EmailConfirmationWrapper>
      </EmailVerificationContainer>
    );
  else
    return (
      <NotFound
        message={
          <>
            This url is invalid or your email has already been verified.
            <br />
          </>
        }
      />
    );
};

export default EmailConfirmation;
