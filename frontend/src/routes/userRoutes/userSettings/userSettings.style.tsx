import styled from "styled-components";

export const UserSettingsContainer = styled.div`
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  overflow: hidden;

  @media (max-width: 450px) {
    input {
      min-width: 40rem;
    }
  }
`;
