import styled from "styled-components";

export const ProfilePictureContainer = styled.div`
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
