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
  margin-left: -8rem;
  transition: all 0.6s;

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      margin-left: -40%;
    `}
`;
