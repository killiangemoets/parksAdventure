import styled from "styled-components";

import { ReactComponent as CloseSVG } from "../../../assets/x-solid.svg";

export const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(187, 187, 187, 0.4);
  z-index: 999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FiltersPopupContainer = styled.div`
  /* padding: 0rem 6.4rem 3.2rem 6.4rem; */
  background-color: #fffefc;
  border-radius: 24px;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;
export const FiltersPopupTitleSection = styled.div`
  padding: 2rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #aaa;

  button {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;
export const FiltersPopupTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.6px;
`;
export const CloseIcon = styled(CloseSVG)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  .path {
    fill: #aaa;
    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: #333;
    }
  }
`;

export const Filters = styled.div`
  padding: 0rem 6.4rem 0rem 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
export const FilterElement = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 2.8rem;
`;
export const FilterTitle = styled.h2`
  width: 16rem;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: #506044;
  text-transform: uppercase;
`;
export const Filter = styled.div`
  /* height: 2rem; */
  min-width: 30rem;

  /* background-color: #506044; */
`;

export const FilterCheckBoxes = styled(Filter)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonSection = styled.div`
  padding: 1rem 6.4rem 4.8rem 6.4rem;
  display: flex;
  justify-content: flex-end;
`;
