import styled from "styled-components";

export const AddTourCalendarContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 6.4rem 3.2rem;
  }
`;

export const AddTourCalendarWrapper = styled.div`
  width: 100%;
  max-width: 110rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.4rem;
`;

export const AddTourCalendarTitle = styled.div`
  width: 100%;
`;

export const AddTourCalendarContent = styled.div`
  width: 90%;

  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
