import styled from "styled-components";

export const AdminSectionContainer = styled.div`
  min-height: calc(100vh - 16rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
  width: 100%;
`;

export const AdminFixHeader = styled.div`
  /* position: fixed; */
  /* right: 0%; */
  /* width: calc(100vw - 28rem); */
  width: 100%;
`;

export const AdminContent = styled.div`
  max-width: 90rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
`;

export const LargeAdminContent = styled(AdminContent)`
  max-width: 120rem;
`;

export const AdminLargeContent = styled(AdminContent)`
  max-width: 140rem;
`;

export const AdminContentSpinner = styled.div`
  margin-top: 8rem;
`;

export const AdminContentErrorMessage = styled.div`
  margin-top: 8rem;
  text-align: center;
  height: 2rem;
  color: #333;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
`;

export const AdminStatsSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6.4rem;
`;

export const AdminStatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

export const AdminStatTitle = styled.p`
  font-size: 2rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #999;
`;

export const AdminStatValue = styled.h3`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 4rem;
  letter-spacing: 1px;
  color: #cc704b;
`;
