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

  @media (max-width: 620px) {
    position: relative;
    border-radius: 0px;
    width: 100%;
    background-color: #506044;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.8rem;
    padding-bottom: 1rem;
  }
`;
export const ProfileDropdownElement = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 2rem 3.2rem;
  &:hover {
    color: #cc704b;
  }

  @media (max-width: 620px) {
    padding: 0;
  }
`;

export const ProfileDropdownText = styled.p`
  padding: 0 1.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  transition: all 0.3s;

  @media (max-width: 620px) {
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 1.2px;
    color: #fbf3e5;
    text-transform: uppercase;
    &:hover {
      color: #cc704b;
    }
  }
`;

export const ProfileDropdownLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #aaa;

  @media (max-width: 620px) {
    display: none;
  }
`;
