import styled from "styled-components";
import { ReactComponent as WarningSVG } from "../../../assets/icons/warning.svg";
import colors from "../../../colors";

export const WarningMessageContainer = styled.div`
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 3px solid ${colors.error};
  border-left: 10px solid ${colors.error};
  border-radius: 4px;
`;

export const WarningMessageText = styled.h2`
  text-align: center;
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.6px;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 4rem;
  height: 4rem;

  .path {
    stroke: ${colors.error};
  }
`;
