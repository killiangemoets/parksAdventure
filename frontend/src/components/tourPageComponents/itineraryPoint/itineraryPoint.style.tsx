import styled from "styled-components";
import colors from "../../../colors";

export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PointName = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.4px;
  color: ${colors.primary};
`;

export const StartPointName = styled(PointName)`
  color: ${colors.secondary};
`;
