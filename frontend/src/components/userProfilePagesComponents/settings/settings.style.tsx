import styled from "styled-components";
import { ModalContainer } from "../../UIComponents/modal/modal.style";
import colors from "../../../colors";

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & ${ModalContainer} {
    input {
      min-width: 0;
    }
  }
`;
export const SettingsWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
`;

export const SettingsWrapper1 = styled(SettingsWrapper2)`
  border-bottom: solid 1px ${colors.veryLightGrey};
  padding: 0 3.2rem;
  padding-bottom: 6.4rem;
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
`;

export const SettingsInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const UpdateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;
export const SettingsText = styled.p`
  max-width: 48rem;
  font-size: 1.6rem;
  letter-spacing: 0.2px;
  word-spacing: 1px;
  font-weight: 500;
  text-align: justify;

  span {
    font-weight: 600;
  }
`;

export const ErrorMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ErrorMessage = styled.p`
  width: 100%;
  text-align: center;
  min-height: 1.8rem;
  max-width: 40rem;
  color: ${colors.error};
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-align: center;
`;
