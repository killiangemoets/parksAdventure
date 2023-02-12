import { Link } from "react-router-dom";
import styled from "styled-components";

export const ReservationInfoSectionContainer = styled.div`
  padding: 9.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ReservationInfoSectionWrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  /* justify-content: center; */
  /* flex-direction: column; */
  /* gap: 9.6rem; */
  gap: 3.2rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* margin-left: 4.8rem; */

  h2 {
    margin-bottom: 1.2rem;
    /* margin-left: -4.8rem; */
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

export const InfoTitle = styled.h4`
  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 1px;
  /* width: 16.2rem; */
  width: 12rem;
`;

export const ReservationInfoTitle = styled(InfoTitle)`
  width: 20rem;
`;

export const InfoContent = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;

  span {
    font-weight: 700;
  }
`;

export const InfoLink = styled(Link)`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: #333;
  transition: all 0.3s;
  border-bottom: solid 1px #333;

  &:hover {
    color: #cc704b;
    border-bottom: solid 1px #cc704b;
  }
`;
