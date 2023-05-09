import styled, { css } from "styled-components";

export const TourContainer = styled.div`
  padding-top: 8rem;
`;

type TourWrapperProps = {
  paddingTop?: boolean;
};

export const TourWrapper = styled.div<TourWrapperProps>`
  ${({ paddingTop }) =>
    paddingTop &&
    css`
      padding-top: 10rem;
    `}
`;
