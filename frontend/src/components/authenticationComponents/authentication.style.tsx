import { Link } from "react-router-dom";
import styled from "styled-components";
import { CheckBoxesContainer } from "../UIComponents/checkBoxes/checkBoxes.style";
import { FormButtonContainer } from "../UIComponents/formButton/formButton.style";
import {
  TextInputContainer,
  TextInputEl,
} from "../UIComponents/textInput/textInput.style";
import { SectionTitle } from "../UIComponents/title/title.style";
import colors from "../../colors";

export const AuthenticationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const AuthenticationLink = styled(Link)`
  cursor: pointer;
  font-weight: 600;
  font-size: 2.4rem;
  letter-spacing: 1px;
  color: ${colors.primary};
  border-bottom: solid 1px ${colors.primary};
  transition: all 0.3s;

  &:hover {
    color: ${colors.primaryDark};
    border-bottom: solid 1px ${colors.primaryDark};
  }

  @media (max-width: 482px) {
    font-size: 1.8rem;
  }
`;

export const AuthenticationLinkSmall = styled(AuthenticationLink)`
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 1px;
  border-bottom: none;
  border-bottom: solid 1px rgba(204, 112, 75, 0);

  &:hover {
    color: ${colors.primary};
    border-bottom: solid 1px ${colors.primary};
  }
`;

export const AuthenticationLinksWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AuthenticationCard = styled.div`
  padding: 5.2rem 6.8rem;
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
  gap: 4.2rem;
  width: 100%;
  max-width: 60rem;

  @media (max-width: 482px) {
    padding: 5.2rem 4.8rem;
    & ${SectionTitle} {
      font-size: 2rem;
    }
  }
`;

export const AuthenticationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  & ${FormButtonContainer} {
    align-self: flex-end;
  }

  & ${TextInputContainer} {
    width: 100%;
  }

  & ${TextInputEl} {
    min-width: 0;
  }

  @media (max-width: 482px) {
    gap: 2rem;
  }
`;

export const Messages = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  min-height: 2rem;
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;

export const SuccessMessage = styled.p`
  max-width: 40rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.4px;
`;

export const ForgotPasswordButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    min-width: 23.4rem;
  }
`;

export const LogoutCheckBox = styled.div`
  & ${CheckBoxesContainer} {
    label span {
      font-size: 1.6rem;
      padding-right: 0;
      margin: 0 !important;
      font-weight: 500;
      color: ${colors.darkGrey};
      letter-spacing: 0.6px;
    }

    .ant-checkbox-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-checkbox .ant-checkbox-inner {
      width: 2.4rem;
      height: 2.4rem;
      margin-bottom: 2rem;
    }

    .ant-checkbox .ant-checkbox-inner:after {
      width: 0.8rem;
      height: 1.4rem;
    }

    .ant-checkbox-group {
      height: 2.6rem;
    }
  }
`;
