import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as DropdownSVG } from "./../../assets/icons/chevron-down.svg";
import { ReactComponent as MenuSVG } from "./../../assets/icons/bars-icon.svg";
import colors from "../../colors";

export const NavBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 8rem;
  background-color: ${colors.secondary};
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
  background-color: ${colors.secondary};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
  padding: 2rem;

  @media (max-width: 450px) {
    gap: 2rem;
  }
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
  color: ${colors.iconsLight};
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
    background-color: ${colors.primary};
    color: ${colors.iconsLight};
    border-radius: 999px;
    width: 1.6rem;
    height: 1.6rem;
    font-size: 1rem;
    line-height: 1rem;
  }

  &:hover {
    color: ${colors.primary};
    span {
      color: ${colors.iconsLight};
    }
  }

  ${({ addMargin }) =>
    addMargin &&
    css`
      margin-right: 1.6rem;
    `}

  @media (max-width: 620px) {
    gap: 1.8rem;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 1.2px;
  }
  @media (max-width: 450px) {
    font-size: 1.6rem;
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
  color: ${colors.iconsLight};
  transition: all 0.3s;
  font-weight: 400;
  letter-spacing: 0.2px;

  &:hover {
    color: ${colors.primary};
  }

  @media (max-width: 620px) {
    gap: 1.8rem;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 1.2px;
  }
  @media (max-width: 450px) {
    font-size: 1.6rem;
  }
`;

export const SignUpLink = styled(NavBarLink)`
  padding: 1.2rem 2.8rem;
  border: solid 1px ${colors.backgroundDark};
  border-radius: 10rem;

  &:hover {
    background-color: ${colors.primary};
    border: solid 1px ${colors.primary};
    color: ${colors.iconsLight};

    text-shadow: none;
  }
`;

export const SignUpButton = styled(NavBarButton)`
  padding: 1.4rem 2.8rem;
  border: solid 1px ${colors.backgroundDark};
  border-radius: 10rem;

  &:hover {
    background-color: ${colors.primary};
    border: solid 1px ${colors.primary};
    color: ${colors.iconsLight};

    text-shadow: none;
  }
`;

export const FooterContainer = styled.div`
  position: relative;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  z-index: 3;
  background-color: ${colors.background};

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
  color: ${colors.mediumDrakGrey};
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
  color: ${colors.mediumDrakGrey};
  transition: all 0.3s;

  &:hover {
    color: ${colors.mediumGrey};
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
  color: ${colors.background};
  transition: all 0.3s;

  &:hover {
    color: ${colors.primary};
  }
`;
