import styled from "styled-components";
import { EmailVerificationWrapper } from "../emailVerification/emailVerification.style";
import { ReactComponent as CheckSVG } from "./../../assets/icons/check-circle.svg";
import colors from "../../colors";

export const EmailConfirmationBody = styled.div``;

export const EmailConfirmationWrapper = styled(EmailVerificationWrapper)`
  gap: 12rem;
`;

export const EmailConfirmationCheckIcon = styled(CheckSVG)`
  width: 8rem;
  height: 8rem;

  .path {
    stroke: ${colors.primary};
  }
`;
