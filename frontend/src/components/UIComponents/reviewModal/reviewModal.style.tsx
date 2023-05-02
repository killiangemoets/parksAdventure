import styled, { css } from "styled-components";

type StarsRatingContainerProps = {
  error: boolean;
};

export const StarsRatingContainer = styled.div<StarsRatingContainerProps>`
  width: fit-content;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: 2px solid #fff;
  ${({ error }) =>
    error &&
    css`
      border: 2px solid #ff0033;
    `}
`;
