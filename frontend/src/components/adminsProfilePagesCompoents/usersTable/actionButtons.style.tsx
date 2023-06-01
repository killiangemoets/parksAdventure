import styled from "styled-components";
import { ReactComponent as WarningSVG } from "../../../assets/warning.svg";

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.4px;
  }
`;

export const DeleteMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 2.2rem;
  height: 2.2rem;

  .path {
    stroke: #333;
  }
`;
