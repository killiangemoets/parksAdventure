import styled, { css } from "styled-components";

export const ToursCardsContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
`;

type ToursCardWrapperProps = {
  mapOpen: boolean;
};

export const ToursCardsWrapper = styled.div<ToursCardWrapperProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: space-between;
  row-gap: 4.8rem;
  transition: all 0.6s;

  width: 100%;
  max-width: 144rem;

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      grid-template-columns: repeat(3, 1fr);
      max-width: 104rem;
    `}
`;
