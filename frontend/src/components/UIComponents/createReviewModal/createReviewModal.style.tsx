import styled, { css } from "styled-components";
import colors from "../../../colors";

type StarsRatingContainerProps = {
  error: boolean;
};

export const StarsRatingContainer = styled.div<StarsRatingContainerProps>`
  width: fit-content;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: 2px solid ${colors.white};
  ${({ error }) =>
    error &&
    css`
      border: 2px solid ${colors.error};
    `}
`;
