import styled from "styled-components";
import { ReactComponent as CloseSVG } from "../../../assets/x-solid.svg";

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
  color: #cc704b;
`;

export const StartPointName = styled(PointName)`
  color: #506044;
`;

export const CloseIcon = styled(CloseSVG)`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  .path {
    fill: #bbb;
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: #333;
      fill: #cc704b;
    }
  }
`;
