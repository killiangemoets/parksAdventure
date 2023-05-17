import styled, { css } from "styled-components";

export const AllToursContainer = styled.div`
  padding-top: 8rem;
  position: relative;
`;

export const AllTourFixElements = styled.div`
  width: 100%;
  z-index: 3;
`;

export const AllToursResults = styled.div`
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  margin-bottom: 6.4rem;
  min-height: calc(100vh - 8rem - 14.6rem);
`;

type AllToursResultsLeftProps = {
  mapOpen: boolean;
};

export const AllToursResultsLeft = styled.div<AllToursResultsLeftProps>`
  padding-top: 6.4rem;
  width: calc(100vw - 8rem);
  transition: all 0.6s;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  min-height: calc(100vh - 8rem - 14.6rem);

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      margin-left: -40%;
    `};
`;

export const AllToursResultsCards = styled.div``;

export const NoResultsMessage = styled.p`
  width: 100%;
  padding-top: 6.4rem;
  text-align: center;
  align-self: center;
  font-weight: 600;
  margin-right: 2.25rem;
  font-size: 2rem;
  letter-spacing: 1px;
`;
