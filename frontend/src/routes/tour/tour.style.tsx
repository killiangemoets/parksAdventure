import styled, { css } from "styled-components";

export const TourContainer = styled.div`
  padding-top: 8rem;
`;

export const FixAdminTourNavbar = styled.div`
  position: fixed;
  left: 0%;
  width: 100vw;
  z-index: 9;
`;

type TourWrapperProps = {
  paddingTop: boolean;
};

export const TourWrapper = styled.div<TourWrapperProps>`
  ${({ paddingTop }) =>
    paddingTop &&
    css`
      padding-top: 8rem;
    `}
`;
