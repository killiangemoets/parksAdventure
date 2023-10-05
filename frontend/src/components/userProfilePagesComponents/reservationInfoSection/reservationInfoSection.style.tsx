import styled from "styled-components";
import colors from "../../../colors";

export const ReservationInfoSectionContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    padding: 6.4rem 4.8rem;
  }
`;
export const ReservationInfoSectionWrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  display: flex;
  justify-content: space-between;
  gap: 3.2rem;

  @media (max-width: 1250px) {
    flex-direction: column;
  }

  @media (max-width: 805px) {
    gap: 4.8rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;

  h2 {
    margin-bottom: 1.2rem;
  }

  @media (max-width: 805px) {
    gap: 3.2rem;
    h2 {
      margin-bottom: 0;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  gap: 1.8rem;

  @media (max-width: 805px) {
    flex-direction: column;
    gap: 1.2rem;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  gap: 1.8rem;
`;

export const InfoTitle = styled.h4`
  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 1px;
  width: 16rem;
  white-space: nowrap;
`;

export const ReservationInfoTitle = styled(InfoTitle)`
  width: 20rem;
`;

export const InfoBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoContent = styled.p`
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;

  span {
    font-weight: 700;
  }
`;

export const InfoLink = styled.a`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: ${colors.darkGrey};
  transition: all 0.3s;
  border-bottom: solid 1px ${colors.darkGrey};
  width: fit-content;

  &:hover {
    color: ${colors.primary};
    border-bottom: solid 1px ${colors.primary};
  }
`;
