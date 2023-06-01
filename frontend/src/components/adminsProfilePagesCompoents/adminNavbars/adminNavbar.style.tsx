import styled from "styled-components";
import { CheckboxGroupElement } from "../../UIComponents/checkBoxes/checkBoxes.style";

export const AdminNavbarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
  border-bottom: 1px solid #cc704b;
  background-color: #fdfaf5;
  padding: 0 6.4rem;

  ${CheckboxGroupElement} {
    label {
      font-size: 1.6rem !important;
      letter-spacing: 0.2px !important;
    }
  }
`;

export const AdminNavbarCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const AdminNavbarRightContainer = styled.div`
  position: absolute;
  right: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const AdminNavbarLeftContainer = styled.div`
  position: absolute;
  left: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FixAdminTourNavbar = styled.div`
  padding-top: 8rem;
  position: fixed;
  left: 0%;
  width: 100vw;
  z-index: 9;
`;

export const DeleteQuestion = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.2px;

  span {
    font-weight: 700;
    text-transform: uppercase;
  }
`;

export const ErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  height: 1.8rem;
  color: #ff0033;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
`;

export const UserName = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;
export const UserEmail = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #aaa;
`;

export const ModalSuccessContainer = styled.div`
  min-width: 48rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6.4rem;
`;
export const ModalSuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3.2rem;
`;

export const ModalSuccessMessageMainElement = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.2px;

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const ModalSuccessMessageElement = styled.p`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 2.6rem;

  span {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
