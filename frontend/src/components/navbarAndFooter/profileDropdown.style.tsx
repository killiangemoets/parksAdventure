import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileDropdownContainer = styled.div`
  position: absolute;
  top: 120%;
  right: 0%;
  background-color: #fdfaf5;
  border-radius: 8px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  z-index: 3;
  display: flex;
  flex-direction: column;
`;
export const ProfileDropdownElement = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem 3.2rem;
  &:hover {
    color: #cc704b;
  }
`;

export const ProfileDropdownDivElement = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem 3.2rem;
  cursor: pointer;
  &:hover {
    color: #cc704b;
  }
`;
export const ProfileDropdownText = styled.p`
  padding: 0 1.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  transition: all 0.3s;
`;

export const ProfileDropdownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #aaa;
`;
