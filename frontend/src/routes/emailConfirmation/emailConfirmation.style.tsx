import styled from "styled-components";
import { EmailVerificationWrapper } from "../emailVerification/emailVerification.style";
import { ReactComponent as CheckSVG } from "./../../assets/check-circle.svg";

export const EmailConfirmationBody = styled.div``;

export const EmailConfirmationWrapper = styled(EmailVerificationWrapper)`
  gap: 12rem;
`;

export const EmailConfirmationCheckIcon = styled(CheckSVG)`
  width: 8rem;
  height: 8rem;

  .path {
    stroke: #cc704b;
  }
`;
