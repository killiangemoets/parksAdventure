import styled from "styled-components";

export const SignupContainer = styled.div`
  padding-top: 8rem;
  min-height: calc(100vh - 8rem);
`;

export const SignupWrapper = styled.div`
  padding: 6.4rem;
  display: flex;
  justify-content: center;

  width: 100%;

  @media (max-width: 482px) {
    padding: 6.4rem 3.2rem;
  }
`;
