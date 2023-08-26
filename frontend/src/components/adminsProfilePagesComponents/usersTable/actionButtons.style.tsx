import styled from "styled-components";
import { ReactComponent as WarningSVG } from "../../../assets/icons/warning.svg";
import { ModalContainer } from "../../UIComponents/modal/modal.style";
import colors from "../../../colors";

export const ActionButtonsContainer = styled.div`
  & ${ModalContainer} {
    input {
      min-width: 0;
    }
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.4px;
  }
`;

export const DeleteMessages = styled.p`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DeleteMessage = styled.p`
  display: flex;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  max-width: 80rem;
`;

export const WarningIcon = styled(WarningSVG)`
  width: 2.2rem;
  height: 2.2rem;

  .path {
    stroke: ${colors.darkGrey};
  }
`;
