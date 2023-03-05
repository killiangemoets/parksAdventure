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
  fix: boolean;
  reduceHeight: boolean;
  mapOpen: boolean;
};

export const ToursMapContainer = styled.div<ToursMapContainerProps>`
  position: absolute;
  /* top: 0; */
  /* bottom: 0%; */
  right: 0%;
  /* transform: translateX(0%); */
  /* width: 40%; */
  width: 40%;
  transition: transform 0.6s;

  height: calc(100vh - 8rem);
  z-index: 2;

  ${({ fix }) => fix && fixedStyle}
  ${({ reduceHeight }) => reduceHeight && reduceHeigthStyle}

  ${({ mapOpen }) =>
    !mapOpen &&
    css`
      transform: translateX(90%);
    `}
`;

export const ToursMapWrapper = styled.div`
  position: relative;
  height: 100%;
  /* padding-bottom: 3rem; */
`;

export const HideMapNote = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 30rem;
  background-color: #fdfaf5;
  height: 2.8rem;
  z-index: 999;
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
