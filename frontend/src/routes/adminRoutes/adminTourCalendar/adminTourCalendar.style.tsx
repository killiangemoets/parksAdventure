import styled from "styled-components";

export const AdminTourCalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 18rem;
  padding-bottom: 6.4rem;
  min-height: calc(100vh - 8rem);
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
