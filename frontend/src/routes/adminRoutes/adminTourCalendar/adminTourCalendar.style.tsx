import styled from "styled-components";

export const AdminTourCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 18rem 3.2rem 6.4rem 3.2rem;
  min-height: calc(100vh - 8rem);

  h2 {
    text-align: center;
  }
`;

export const AdminTourCalendarSpinner = styled.div`
  position: absolute;
  top: calc(50% - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminTourCalendarTitle = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    padding: 3.2rem 3.2rem 4.8rem 3.2rem;
  }
`;

export const AdminBookingsCalendarContainer = styled.div`
  width: 100%;
  max-width: 110rem;
`;

export const ErrorMessage = styled.p`
  padding-top: 16rem;
  text-align: center;
  height: 2.6rem;
  padding-left: 0.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
