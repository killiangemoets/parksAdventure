import styled from "styled-components";
import { CheckboxGroupElement } from "../../UIComponents/checkBoxes/checkBoxes.style";
import { DropdownContainer } from "../../UIComponents/dropdown/dropdown.style";
import { TextInputContainer } from "../../UIComponents/textInput/textInput.style";
import { AuthenticationForm } from "../../authenticationComponents/authentication.style";
import colors from "../../../colors";

export const AdminNavbarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.primary};
  background-color: ${colors.background};
  padding: 0 2rem;

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

  @media (max-width: 1500px) {
    right: 3.2rem;
  }
`;
export const AdminNavbarLeftContainer = styled.div`
  position: absolute;
  left: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 1500px) {
    left: 3.2rem;
  }
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
  color: ${colors.error};
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
  color: ${colors.grey};
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

export const AddTourGuideForm = styled(AuthenticationForm)`
  @media (max-width: 480px) {
    button {
      padding: 0rem 2rem;
      height: 5rem;

      font-size: 1.4rem;
      letter-spacing: 1px;
    }
  }
`;

// ALL BOOKINGS
export const AdminAllBookingsNavbarContainer = styled(AdminNavbarContainer)`
  @media (max-width: 1340px) {
    height: auto;
    padding: 1.6rem 0;

    button {
      font-size: 1.6rem;
    }
  }
`;
export const AdminAllBookingsNavbarCenterContainer = styled(
  AdminNavbarCenterContainer
)`
  @media (max-width: 1340px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    button {
      width: 100%;
    }

    & ${DropdownContainer} {
      width: 100% !important;
    }

    ul {
      width: 100%;
    }

    & ${TextInputContainer} {
      width: 100%;
    }

    .ant-picker {
      width: 100%;
    }
  }
  @media (max-width: 575px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }
`;
export const AdminAllBookingsNavbarElement1 = styled.div`
  @media (max-width: 1340px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 1/2;
  }
  @media (max-width: 575px) {
    justify-content: end;
  }
`;
export const AdminAllBookingsNavbarElement2 = styled.div`
  @media (max-width: 1340px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 2/3;
  }
  @media (max-width: 575px) {
    justify-content: start;
  }
`;
export const AdminAllBookingsNavbarElement3 = styled.div`
  @media (max-width: 1340px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
    grid-column: 1/3;
  }
`;
export const AdminAllBookingsNavbarElement4 = styled.div`
  @media (max-width: 1340px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
    grid-column: 3/4;
  }
  @media (max-width: 575px) {
    grid-row: 3/4;
    grid-column: 1/2;
  }
  @media (max-width: 430px) {
    grid-row: 3/4;
    grid-column: 1/3;
  }
`;
export const AdminAllBookingsNavbarElement5 = styled.div`
  @media (max-width: 1340px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 3/4;
  }
  @media (max-width: 575px) {
    grid-row: 3/4;
    grid-column: 2/3;
  }
  @media (max-width: 430px) {
    grid-row: 4/5;
    grid-column: 1/3;
  }
`;

// ALL REVIEWS
export const AdminAllReviewsNavbarContainer = styled(AdminNavbarContainer)`
  @media (max-width: 1400px) {
    height: auto;
    padding: 1.6rem 2rem;

    button {
      font-size: 1.6rem;
    }
  }
`;
export const AdminAllReviewsNavbarCenterContainer = styled(
  AdminNavbarCenterContainer
)`
  @media (max-width: 1400px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    button {
      width: 100%;
    }

    & ${DropdownContainer} {
      width: 100% !important;
    }

    ul {
      width: 100%;
    }

    & ${TextInputContainer} {
      width: 100%;
    }

    .ant-picker {
      width: 100%;
    }
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }

  @media (max-width: 500px) {
    button {
      padding: 1.2rem 2rem;
      gap: 0.4rem;
      font-size: 1.5rem;
    }
  }
`;

export const AdminAllReviewsNavbarElement1 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
    grid-column: 1/2;
  }
  @media (max-width: 700px) {
    grid-row: 3/4;
    grid-column: 1/2;
  }

  @media (max-width: 500px) {
    grid-row: 4/5;
    grid-column: 1/3;
  }
`;
export const AdminAllReviewsNavbarElement2 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 1/2;
  }
`;
export const AdminAllReviewsNavbarElement3 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 2/3;
  }
`;
export const AdminAllReviewsNavbarElement4 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 3/4;
  }
  @media (max-width: 700px) {
    grid-row: 2/3;
    grid-column: 1/2;
  }
`;
export const AdminAllReviewsNavbarElement5 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
    grid-column: 2/3;
  }
  @media (max-width: 700px) {
    grid-row: 2/3;
    grid-column: 2/3;
  }
  @media (max-width: 500px) {
    grid-row: 3/4;
    grid-column: 1/3;
  }
`;
export const AdminAllReviewsNavbarElement6 = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 2/3;
    grid-column: 3/4;
  }
  @media (max-width: 700px) {
    grid-row: 3/4;
    grid-column: 2/3;
  }
  @media (max-width: 500px) {
    grid-row: 2/3;
  }
`;

// GUIDES
export const AdminGuidesNavbarContainer = styled(AdminNavbarContainer)`
  @media (max-width: 640px) {
    height: auto;
    padding: 1.6rem 2rem;
  }
`;
export const AdminGuidesNavbarCenterContainer = styled(
  AdminNavbarCenterContainer
)`
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

// TOUR
export const AdminTourNavbarContainer = styled(AdminNavbarContainer)`
  @media (max-width: 580px) {
    gap: 2rem;
    height: 8rem;
    gap: 1rem;

    button {
      font-size: 1.4rem;
      white-space: nowrap;
      padding: 1rem 1.6rem;
      min-width: 8rem;
    }
  }
`;

export const AdminTourNavbarLeftContainer = styled(AdminNavbarLeftContainer)`
  @media (max-width: 580px) {
    left: 2rem;
    gap: 1rem;
  }
`;
export const AdminTourNavbarRightContainer = styled(AdminNavbarRightContainer)`
  @media (max-width: 580px) {
    right: 2rem;
    gap: 1rem;
  }
`;
