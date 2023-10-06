import styled from "styled-components";

export const UserProfileContainer = styled.div`
  padding-top: 8rem;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 28rem;
  min-height: calc(100vh - 24rem);

  @media (max-width: 1000px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;
