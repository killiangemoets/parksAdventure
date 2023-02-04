import styled from "styled-components";

import { ReactComponent as RightArrowSVG } from "../../../assets/chevron-right-solid.svg";
import { ReactComponent as LeftArrowSVG } from "../../../assets/chevron-left-solid.svg";

export const RightPageIcon = styled(RightArrowSVG)`
  width: 2.2rem;
  height: 2.2rem;
  transition: all 0.3s;

  .path {
    fill: #cc704b;
    transition: all 0.3s;
  }
  &:hover {
    width: 2.4rem;
    height: 2.4rem;
    .path {
      fill: #b86544;
    }
  }
`;

export const LeftPageIcon = styled(LeftArrowSVG)`
  width: 2.2rem;
  height: 2.2rem;
  transition: all 0.3s;

  .path {
    fill: #cc704b;
    transition: all 0.3s;
  }
  &:hover {
    width: 2.4rem;
    height: 2.4rem;
    .path {
      fill: #b86544;
    }
  }
`;

export const PaginationContainer = styled.div`
  /* padding: 6.4rem; */
  padding-top: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;

  button {
    min-width: 0px;
    height: 4.8rem;
    width: 4.8rem;
    padding: 0;
    text-align: center;
  }
`;

export const ThreeDots = styled.p`
  font-size: 24px;
  color: #cc704b;
`;

export const CurrentPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.8rem;
  letter-spacing: 1px;
  background-color: #cc704b;
  color: #faf2e5;
  border-radius: 999px;
  border: none;
  gap: 1rem;
  height: 4.8rem;
  width: 4.8rem;
  padding: 0;
  text-align: center;
`;
