import styled from "styled-components";

import { ReactComponent as DropdownSVG } from "../../../assets/chevron-down.svg";

export const DropdownCountsInputContainer = styled.div`
  position: relative;

  button {
    justify-content: space-between;
    /* font-size: 1.6rem; */
    font-size: 1.6rem;
    letter-spacing: 0px;
    height: 5.2rem;
  }
`;

export const DropdownCountsButtonLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const DropdownCountsIcon = styled(DropdownSVG)`
  width: 2rem;
  height: 2rem;
  color: #aaa;
`;
