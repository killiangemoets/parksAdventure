import styled from "styled-components";
import colors from "../../../colors";

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  border-radius: 12px;
  padding: 2.4rem;
  width: 100%;
  height: 100%;
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
`;

export const SmallChartContainer = styled(ChartContainer)`
  grid-row: span 2;
  grid-column: span 2;

  @media (max-width: 770px) {
    grid-row: span 1;
    grid-column: span 3;
  }

  @media (max-width: 540px) {
    grid-row: span 1;
    grid-column: span 6;
  }
`;

export const MediumSmallChartContainer = styled(ChartContainer)`
  grid-row: span 2;
  grid-column: span 3;

  @media (max-width: 770px) {
    grid-row: span 1;
    grid-column: span 6;
  }
`;

export const MediumChartContainer = styled(ChartContainer)`
  grid-row: span 2;
  grid-column: span 4;

  @media (max-width: 770px) {
    grid-row: span 1;
    grid-column: span 6;
  }
`;

export const LargeChartContainer = styled(ChartContainer)`
  grid-row: span 1;
  grid-column: span 6;
  position: relative;

  @media (max-width: 770px) {
    grid-row: span 1;
    grid-column: span 6;
  }
`;

export const ChartTitle = styled.h4`
  width: fit-content;
  color: ${colors.primary};
  letter-spacing: 0.1rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 1.6rem;
  }
`;

export const Popup = styled.div`
  position: absolute;
  bottom: 14.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  border-radius: 12px;
  padding: 2rem 3.2rem;
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
`;
export const PopupTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: ${colors.grey};
`;
export const PopupContent = styled.p`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 2.8rem;
  letter-spacing: 1px;
`;
