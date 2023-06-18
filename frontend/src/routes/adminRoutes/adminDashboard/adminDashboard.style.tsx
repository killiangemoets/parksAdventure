import styled from "styled-components";

export const AdminDashboardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3.2rem;
  padding-bottom: 6.4rem;
`;

export const LoadingDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;
`;

export const AdminDashboardSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMessage = styled.p`
  padding-top: 16rem;
  text-align: center;
  height: 2.6rem;
  padding-left: 0.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
