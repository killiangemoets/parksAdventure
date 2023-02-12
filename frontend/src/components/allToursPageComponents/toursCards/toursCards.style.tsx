import styled, { css } from "styled-components";

export const ToursCardsContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ToursCardWrapperProps = {
  mapOpen: boolean;
};
export const ToursCardsWrapper = styled.div<ToursCardWrapperProps>`
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: center;
  justify-content: space-between;
  /* justify-content: center; */
  /* column-gap: 4.8rem; */
  row-gap: 4.8rem;
  transition: all 0.6s;

  width: 100%;
  max-width: 144rem;

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      grid-template-columns: auto auto auto;
      justify-content: center;
      column-gap: 2.8rem;
    `}
`;
