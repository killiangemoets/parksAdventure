import {
  Copyright,
  FooterContainer,
  FooterLink,
  FooterLogo,
  FooterNavigation,
  LinksContainer,
  NavBarContainer,
  NavBarLink,
  NavBarLogoContainer,
  SignUpLink,
} from "./navbarAndFooter.style";
import { Outlet } from "react-router-dom";
import roundLogo from "../../assets/logo_hike_round.png";
import longLogo from "../../assets/logoHikeLong.png";

export const Navigation = () => {
  return (
    <NavBarContainer>
      <NavBarLogoContainer to="/">
        <img src={roundLogo} alt="hiking tour logo" />
      </NavBarLogoContainer>
      <LinksContainer>
        <NavBarLink to="/">Home</NavBarLink>
        <NavBarLink to="/alltours">All tours</NavBarLink>
        <NavBarLink to="/contact">Contact</NavBarLink>
        <NavBarLink to="/login">Login</NavBarLink>
        <SignUpLink to="/signup">Sign up</SignUpLink>
      </LinksContainer>
    </NavBarContainer>
  );
};

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <img src={longLogo} alt="Logo National Parks Hiking Tours" />
      </FooterLogo>
      <Copyright>&copy; Made by Killian Gemoets</Copyright>
      <FooterNavigation>
        <FooterLink to="/about">About Us</FooterLink>
        <FooterLink to="/career">Become a Tour Guide</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
      </FooterNavigation>
    </FooterContainer>
  );
};

const NavbarAndFooter = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavbarAndFooter;
