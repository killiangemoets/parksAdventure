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
  const [searchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { token } = useParams<
    keyof EmailConfirmationRouteParams
  >() as EmailConfirmationRouteParams;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleVerifyEmail = async (token: string) => {
      setErrorMessage("");
      const response = await verifyEmail(token);
      if (response && response.status === "success") {
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
            let uri = searchParams.get("uri");
            uri = uri ? uri.replaceAll("%26", "&") : null;
            return navigate(uri || "/");
          }, 2000);
        } else {
          setTimeout(function () {
            return navigate("/login-new-user");
          }, 2000);
        }
      } else if (
        response &&
        response.message.includes("Token is invalid or has already been use")
      ) {
        dispatch(removeUser());
        setErrorMessage(
          "This url is invalid or your email has already been verified."
        );
      } else
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
      setLoading(false);
    };
    handleVerifyEmail(token);
  }, [dispatch, navigate, searchParams, token]);

  if (errorMessage && errorMessage.length > 0)
    return (
      <NotFound
        message={
          <>
            {errorMessage}
            <br />
          </>
        }
      />
    );
  else
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
};

export default EmailConfirmation;
