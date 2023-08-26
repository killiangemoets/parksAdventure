import styled from "styled-components";

import { Link } from "react-router-dom";
import colors from "../../../colors";

export const ContactConfirmationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.4rem;

  button {
    font-size: 2rem;
    padding: 1.6rem 4.8rem;
  }
`;

export const ContactConfirmationTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
export const ContactConfirmationTextElement = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.2px;

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const ContactConfirmationContactLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${colors.primaryDark};
  }
`;
