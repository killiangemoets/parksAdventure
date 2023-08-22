import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../colors";

export const ConfirmationStepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;

  button {
    font-size: 2rem;
    padding: 1.6rem 4.8rem;
  }

  h1 {
    text-align: center;
  }
`;

export const ConfirmationStepTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;
export const ConfirmationStepTextElement = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.2px;

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const ConfirmationStepHelpSection = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.2px;
`;

export const ConfirmationStepContactLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${colors.primaryDark};
  }
`;
