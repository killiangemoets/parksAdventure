import styled, { css } from "styled-components";

export const AllToursContainer = styled.div`
  padding-top: 8rem;
  position: relative;
`;

export const AllToursResults = styled.div`
  position: relative;
  padding-top: 3.2rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  margin-bottom: 6.4rem;
`;

type AllToursResultsLeftProps = {
  mapOpen: boolean;
};

export const AllToursResultsLeft = styled.div<AllToursResultsLeftProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 8rem);
  /* margin-left: -8rem; */
  transition: all 0.6s;

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      margin-left: -40%;
    `}
`;

export const AllToursResultsCards = styled.div`
  /* display: flex; */
  /* min-height: calc(100vh - 8rem); */
`;

export const NoResultsMessage = styled.p`
  align-self: center;
  font-weight: 600;
  margin-right: 2.25rem;
  font-size: 2rem;
  letter-spacing: 1px;
`;
