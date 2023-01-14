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

const Navigation = () => {
  return (
    <NavBarContainer>
      <NavBarLogoContainer to="/">
        <img src="images/logo_hike_round.png" alt="hiking tour logo" />
      </NavBarLogoContainer>
      <LinksContainer>
        <NavBarLink to="/">Home</NavBarLink>
        <NavBarLink to="/about-us">About us</NavBarLink>
        <NavBarLink to="/alltours">All tours</NavBarLink>
        <NavBarLink to="/contact">Contact</NavBarLink>
        <NavBarLink to="login">Login</NavBarLink>
        <SignUpLink to="signup">Sign up</SignUpLink>
      </LinksContainer>
    </NavBarContainer>
  );
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <img
          src="images/logoHikeLong.png"
          alt="Logo National Parks Hiking Tours"
        />
      </FooterLogo>
      <Copyright>&copy; Made by Killian Gemoets</Copyright>
      <FooterNavigation>
        <FooterLink>About Us</FooterLink>
        <FooterLink>Become a Tour Guide</FooterLink>
        <FooterLink>Contact</FooterLink>
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
