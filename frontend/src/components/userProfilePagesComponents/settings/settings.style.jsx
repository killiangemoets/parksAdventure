import styled from "styled-components";

export const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SettingsWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
`;

export const SettingsWrapper1 = styled(SettingsWrapper2)`
  border-bottom: solid 1px #ddd;
  padding: 0 3.2rem;
  padding-bottom: 6.4rem;
`;

export const SettingsInputs = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 3.2rem;
`;

export const CurrentPicture = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 3.2rem;

  button {
    &:hover {
      text-decoration: underline;
    }
  }
`;
export const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
