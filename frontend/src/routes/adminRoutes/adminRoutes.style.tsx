import styled from "styled-components";
import colors from "../../colors";

export const AdminSectionContainer = styled.div`
  min-height: calc(100vh - 16rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
  width: 100%;
`;

export const AdminFixHeader = styled.div`
  width: 100%;
`;

export const AdminContent = styled.div`
  padding: 0 3.2rem;
  max-width: 90rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
`;

export const AdminMediumContent = styled(AdminContent)`
  max-width: 120rem;
`;

export const AdminLargeContent = styled(AdminContent)`
  max-width: 140rem;

  @media (max-width: 700px) {
    padding: 0 2rem;
  }
  @media (max-width: 450px) {
    padding: 0 1rem;
  }
`;

export const AdminContentSpinner = styled.div`
  margin-top: 8rem;
`;

export const AdminContentErrorMessage = styled.div`
  margin-top: 8rem;
  text-align: center;
  height: 2rem;
  color: ${colors.darkGrey};
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

  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    width: fit-content;
  }
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
  color: ${colors.mediumDrakGrey};

  @media (max-width: 700px) {
    font-size: 1.8rem;
    letter-spacing: 0.8px;
  }
`;

export const AdminStatValue = styled.h3`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 4rem;
  letter-spacing: 1px;
  color: ${colors.primary};

  @media (max-width: 500px) {
    font-size: 3.2rem;
    letter-spacing: 0.8px;
  }
`;
