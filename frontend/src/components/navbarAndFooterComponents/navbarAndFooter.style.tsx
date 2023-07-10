import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as DropdownSVG } from "./../../assets/chevron-down.svg";
import { ReactComponent as MenuSVG } from "./../../assets/bars-icon.svg";

export const NavBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 8rem;
  background-color: #506044;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  position: fixed;
  z-index: 999;
`;

export const NavBarLogoContainer = styled(Link)`
  img {
    height: 6.2rem;
  }
`;

export const LinksContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const LinksContainerInColumn = styled.div`
  left: 0;
  top: 7.9rem;
  width: 100%;
  background-color: #506044;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
  padding: 2rem;
`;

type NavBarLinkProps = {
  addMargin?: boolean;
};

export const NavBarLink = styled(Link)<NavBarLinkProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #fbf3e5;
  transition: all 0.3s;
  font-weight: 400;
  letter-spacing: 0.2px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: -0.2rem;
    right: -2rem;
    background-color: #cc704b;
    color: #fbf3e5;
    border-radius: 999px;
    width: 1.6rem;
    height: 1.6rem;
    font-size: 1rem;
    line-height: 1rem;
  }

  &:hover {
    color: #cc704b;
    span {
      color: #fbf3e5;
    }
  }

  ${({ addMargin }) =>
    addMargin &&
    css`
      margin-right: 1.6rem;
    `}

  @media (max-width: 620px) {
    gap: 1.8rem;
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 1.2px;
  }
`;

export const NavBarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  background: none;
  border: none;
  color: #fbf3e5;
  transition: all 0.3s;
  font-weight: 400;
  letter-spacing: 0.2px;

  &:hover {
    color: #cc704b;
  }

  @media (max-width: 620px) {
    gap: 1.8rem;
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: 1.2px;
  }
`;

export const SignUpLink = styled(NavBarLink)`
  padding: 1.2rem 2.8rem;
  border: solid 1px #faf2e5;
  border-radius: 10rem;

  &:hover {
    background-color: #cc704b;
    border: solid 1px #cc704b;
    color: #fbf3e5;

    text-shadow: none;
  }
`;

export const SignUpButton = styled(NavBarButton)`
  padding: 1.4rem 2.8rem;
  border: solid 1px #faf2e5;
  border-radius: 10rem;

  &:hover {
    background-color: #cc704b;
    border: solid 1px #cc704b;
    color: #fbf3e5;

    text-shadow: none;
  }
`;

export const FooterContainer = styled.div`
  /* width: 100%; */
  position: relative;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  z-index: 3;
  background-color: #fdfaf5;

  @media (max-width: 500px) {
    padding: 0 2rem;
  }
`;

export const FooterLogo = styled.div`
  img {
    height: 5rem;
  }

  @media (max-width: 500px) {
    img {
      height: 4.2rem;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 1.2rem;
  color: #999;
  text-align: center;

  @media (max-width: 500px) {
    max-width: 9rem;
  }
`;

export const FooterNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 600px) {
    gap: 0.6rem;
  }

  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.8rem;
  }
`;

export const FooterLink = styled(Link)`
  font-size: 1.4rem;
  /* text-transform: uppercase; */
  color: #999;
  transition: all 0.3s;

  &:hover {
    color: #666;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    &:nth-child(2) {
      grid-row: 2;
      grid-column: span 2;
    }
  }
`;

export const DropdownIcon = styled(DropdownSVG)`
  margin-left: -0.4rem;
  width: 2rem;
  height: 2rem;
`;
export const MenuIcon = styled(MenuSVG)`
  width: 4rem;
  height: 4rem;
  color: #fdfaf5;
  transition: all 0.3s;

  &:hover {
    color: #cc704b;
  }
`;
