import styled from "styled-components";
import { QuickFactName } from "../../../tourPageComponents/quickFact/quickFact.style";
import { QuickFactInputContainer } from "../quickFactInput/quickFactInput.style";

export const AddTourPracticalInfosContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 450px) {
    padding: 6.4rem 3.2rem;
  }
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

  @media (max-width: 650px) {
    width: 100%;
    & ${QuickFactName} {
      width: 14rem;
    }
  }

  @media (max-width: 500px) {
    & ${QuickFactName} {
      width: 100%;
    }

    & ${QuickFactInputContainer} {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.8rem;
    }
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

  @media (max-width: 500px) {
    margin-left: 0;
  }
`;
