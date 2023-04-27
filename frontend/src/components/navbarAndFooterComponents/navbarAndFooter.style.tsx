import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as DropdownSVG } from "./../../assets/chevron-down.svg";

export const NavBarContainer = styled.div`
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

export const NavBarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #fbf3e5;
  transition: all 0.3s;
  font-weight: 400;
  letter-spacing: 0.2px;

  &:hover {
    color: #cc704b;
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
  z-index: 999;
  background-color: #fdfaf5;
`;

export const FooterLogo = styled.div`
  img {
    height: 5rem;
  }
`;

export const Copyright = styled.p`
  font-size: 1.2rem;
  color: #999;
`;

export const FooterNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FooterLink = styled(Link)`
  font-size: 1.4rem;
  /* text-transform: uppercase; */
  color: #999;
  transition: all 0.3s;

  &:hover {
    color: #666;
  }
`;

export const DropdownIcon = styled(DropdownSVG)`
  margin-left: -0.4rem;
  width: 2rem;
  height: 2rem;
`;
