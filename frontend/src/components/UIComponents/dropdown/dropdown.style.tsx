import styled from "styled-components";

import { ReactComponent as DropdownSVG } from "../../../assets/icons/chevron-down.svg";

export const DropdownContainer = styled.div`
  position: relative;

  button {
    justify-content: space-between;
  }
`;

export const DropdownButtonLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const DropdownIcon = styled(DropdownSVG)`
  width: 2rem;
  height: 2rem;
`;
