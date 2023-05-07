import styled from "styled-components";

export const UserBookingsContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 6.4rem;
  width: 100%;
  min-height: calc(100vh - 16rem);
`;

export const Reservations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 80rem;
`;

export const BookingCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const UserBookingsSpinner = styled.div`
  margin-top: 12rem;
`;

export const UserBookingsErrorMessage = styled.div`
  margin-top: 12rem;
  text-align: center;
  height: 2rem;
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`