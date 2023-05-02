import styled from "styled-components";
import { Link } from "react-router-dom";

export const TourBookingDetailsContainer = styled.div`
  width: 100%;
  border: 2px solid #506044;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const TourBookingTitle = styled.h4`
  padding: 3.2rem 4.2rem 0 3.2rem;

  font-weight: 700;
  margin-right: 2.25rem;
  text-transform: capitalize;
  font-size: 2.4rem;
  letter-spacing: 1.2px;
`;

export const TourBookingInfo = styled.div`
  padding: 0 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const Info = styled.div`
  display: flex;
  gap: 1.8rem;
`;

export const InfoPrices = styled.div`
  display: flex;
  flex-direction: column;
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

export const InfoContent = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;

  span {
    font-weight: 700;
  }
`;

export const InfoPriceContent = styled(InfoContent)`
  width: 12rem;
`;
export const InfoPrice = styled(InfoContent)`
  width: 8rem;
`;
export const InfoPriceName = styled(InfoContent)`
  width: 4rem;
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

export const TourBookingFooter = styled.div`
  background-color: #dcdfda;
  /* background-color: #eeefec; */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 3.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TourBookingTotal = styled.div``;

export const TotalPriceTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

export const TotalPrice = styled.p`
  font-size: 2.8rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.4px;
`;

export const TourBookingButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;