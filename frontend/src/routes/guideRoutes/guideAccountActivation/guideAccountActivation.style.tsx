import styled from "styled-components";
import colors from "../../../colors";
import { FormButtonContainer } from "../../../components/UIComponents/formButton/formButton.style";

export const GuideAccountActivationContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rem 2rem 0 2rem;
`;

export const GuideAccountActivationWrapper = styled.div`
  position: relative;
  padding: 5.2rem 6.8rem;
  background-color: ${colors.backgroundLight};
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  align-items: center;
  justify-content: center;
`;

export const GuideAccountActivationBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  & ${FormButtonContainer} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const GuideAccountActivationBodyTitleContainer = styled.div``;
