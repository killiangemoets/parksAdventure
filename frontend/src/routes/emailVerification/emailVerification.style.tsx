import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../colors";

export const EmailVerificationContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rem 2rem 0 2rem;
`;

export const EmailVerificationWrapper = styled.div`
  position: relative;
  padding: 5.2rem 6.8rem;
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4.2rem;
  align-items: center;
  justify-content: center;
  margin: 6.4rem 0;

  h1 {
    text-align: center;
  }
`;

export const EmailVerificationLogo = styled.div`
  position: absolute;
  top: -4rem;
  img {
    height: 8rem;
  }
`;

export const EmailVerificationParagraph = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.2px;

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const EmailVerificationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const EmailVerificationErrorMessage = styled.p`
  text-align: center;
  height: 2rem;
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;

export const EmailVerificationLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${colors.primaryDark};
  }
`;
