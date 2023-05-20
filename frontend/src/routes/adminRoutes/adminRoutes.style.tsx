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
