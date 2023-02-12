import styled from "styled-components";

import { ReactComponent as DropdownSVG } from "../../../assets/chevron-down.svg";

export const DropdownInputContainer = styled.div`
  position: relative;

  button {
    min-width: 22.6rem;
    justify-content: space-between;
    gap: 0rem;
  }
`;

export const DropdownButtonLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export const DropdownIcon = styled(DropdownSVG)`
  width: 2rem;
  height: 2rem;
`;
