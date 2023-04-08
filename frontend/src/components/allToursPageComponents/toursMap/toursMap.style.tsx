import styled, { css } from "styled-components";
import { ReactComponent as LeftArrowSVG } from "../../../assets/left-arrow.svg";
import { ReactComponent as RightArrowSVG } from "../../../assets/right-arrow.svg";

const fixedStyle = css`
  position: fixed;
  top: 8rem;
`;

const reduceHeigthStyle = css`
  position: absolute !important;
  bottom: 0% !important;
`;

type ToursMapContainerProps = {
  mapOpen: boolean;
};

export const ToursMapContainer = styled.div<ToursMapContainerProps>`
  position: absolute;

  right: 0%;

  width: 40%;
  transition: transform 0.6s;

  height: calc(100vh - 8rem);
  z-index: 2;

  ${({ mapOpen }) =>
    !mapOpen &&
    css`
      transform: translateX(90%);
    `}
`;

export const ToursMapWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const ToursMapButtonWrapper = styled.div`
  position: absolute;
  top: 3.2rem;
  left: 1rem;
  z-index: 2;
  button {
    min-width: 0rem;
    padding: 0.6rem 1rem;
  }
`;

export const LeftArrowIcon = styled(LeftArrowSVG)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const RightArrowIcon = styled(RightArrowSVG)`
  width: 2.4rem;
  height: 2.4rem;
`;
