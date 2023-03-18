import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  align-items: center;
  justify-content: center;
`;

export const AuthenticationLink = styled(Link)`
  cursor: pointer;
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #cc704b;
  border-bottom: solid 1px #cc704b;
  transition: all 0.3s;

  &:hover {
    color: #b86544;
    border-bottom: solid 1px #b86544;
  }
`;

export const AuthenticationLinkSmall = styled(AuthenticationLink)`
  font-weight: 500;
  font-size: 1.4rem;
  letter-spacing: 1px;
  border-bottom: none;
  border-bottom: solid 1px rgba(204, 112, 75, 0);

  &:hover {
    color: #cc704b;
    border-bottom: solid 1px #cc704b;
  }
`;

export const AuthenticationCard = styled.div`
  padding: 5.2rem 6.8rem;
  background-color: #fefdfa;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
  gap: 4.2rem;
`;

export const AuthenticationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  button {
    margin-top: 1rem;
    /* padding: 1.4rem; */
    width: 40%;
    align-self: flex-end;
  }
`;

export const ErrorMessage = styled.p`
  text-align: center;
  height: 2rem;
  color: #ff0033;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;
