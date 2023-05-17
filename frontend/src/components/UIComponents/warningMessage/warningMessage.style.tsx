import styled from "styled-components";
import { ReactComponent as WarningSVG } from "../../../assets/warning.svg";

export const WarningMessageContainer = styled.div`
  padding: 1.2rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 3px solid #ff0033;
  border-left: 10px solid #ff0033;
  border-radius: 4px;
`;

export const WarningMessageText = styled.h2`
  text-align: center;
  color: #ff0033;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 4.4rem;
  height: 4.4rem;

  .path {
    stroke: #ff0033;
  }
`;
