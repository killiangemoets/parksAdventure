import styled, { css } from "styled-components";

export const ToursCardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
  width: 100%;
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

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    gap: 3.2rem;
  }
  @media (max-width: 910px) {
    grid-template-columns: repeat(2, auto);
    justify-content: center;
    gap: 3.2rem;
  }
  @media (max-width: 560px) {
    gap: 1.6rem;
  }

  ${({ mapOpen }) =>
    mapOpen &&
    css`
      grid-template-columns: repeat(3, auto);
      max-width: 104rem;
    `}

  @media (max-width: 1450px) {
    ${({ mapOpen }) =>
      mapOpen &&
      css`
        justify-content: center;
        gap: 3.2rem;
      `}
  }
  @media (max-width: 1400px) {
    ${({ mapOpen }) =>
      mapOpen &&
      css`
        grid-template-columns: repeat(2, auto);
      `}
  }
`;
