import styled from "styled-components";
import { QuickFactName } from "../../../tourPageComponents/quickFact/quickFact.style";
import { ListIcon } from "../../../UIComponents/infoIcon/infoIcon.style";

export const AddTourPracticalInfosContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AddTourPracticalInfosWrapper = styled.div`
  width: 100%;
  max-width: 100rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6.4rem;
`;

export const AddTourPracticalInfosTitle = styled.div`
  width: 100%;
`;

export const AddTourPracticalInfosContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  .ant-input {
    background-color: #fdfaf5 !important;
    width: 100%;
  }

  & ${QuickFactName} {
    width: 22rem;
    margin: 0;
  }
`;

export const AdditionalInfoInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const AdditionalInfoExtraInputs = styled.div`
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
