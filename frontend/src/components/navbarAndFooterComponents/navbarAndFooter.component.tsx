import {
  Copyright,
  DropdownIcon,
  FooterContainer,
  FooterLink,
  FooterLogo,
  FooterNavigation,
  LinksContainer,
  NavBarButton,
  NavBarContainer,
  NavBarLink,
  NavBarLogoContainer,
  SignUpButton,
} from "./navbarAndFooter.style";
import { Outlet, useNavigate } from "react-router-dom";
import roundLogo from "../../assets/logo_hike_round.png";
import longLogo from "../../assets/logoHikeLong.png";
import { useSelector } from "react-redux";
import { selectUserReducer } from "../../store/user/user.selector";
import { useState } from "react";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../UIComponents/profilePicture/profilePicture.component";
import ProfileDropdown from "./profileDropdown.component";

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUserReducer);

  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  // useEffect(() => {
  //   console.log({ user });
  // }, [user]);

  const handleClickOnLogin = () => {
    const uri = window.location.href
      .split(`${process.env.REACT_APP_DOMAIN_URL}`)
      .slice(-1)[0]
      .split("uri=")
      .slice(-1)[0]
      .replaceAll("&", "%26");
    if (uri.includes("signup") || uri.includes("login")) {
      return navigate(`/login`);
    }
    navigate(`/login?uri=${uri}`);
  };
  const handleClickOnSignUp = () => {
    const uri = window.location.href
      .split(`${process.env.REACT_APP_DOMAIN_URL}`)
      .slice(-1)[0]
      .split("uri=")
      .slice(-1)[0]
      .replaceAll("&", "%26");
    if (uri.includes("signup") || uri.includes("login")) {
      return navigate(`/signup`);
    }
    navigate(`/signup?uri=${uri}`);
  };

  return (
    <NavBarContainer
      onMouseLeave={() => {
        setShowProfileDropdown(false);
      }}
    >
      <NavBarLogoContainer to="/">
        <img src={roundLogo} alt="hiking tour logo" />
      </NavBarLogoContainer>
      <LinksContainer>
        <NavBarLink to="/">Home</NavBarLink>
        <NavBarLink to="/alltours">All tours</NavBarLink>
        {user.id ? (
          <>
            <NavBarLink to="/messages">Messages</NavBarLink>
            <NavBarLink to="/profile/wishlist">Wishlist</NavBarLink>
            <NavBarLink to="/cart">Cart</NavBarLink>

            <NavBarLink
              to="/profile"
              onMouseOver={() => {
                setShowProfileDropdown(true);
              }}
            >
              <ProfilePicture
                pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
                pictureUrl={user.photo}
              />
              {user.firstname}
              <DropdownIcon />
            </NavBarLink>
          </>
        ) : (
          <>
            {" "}
            <NavBarLink to="/contact">Contact</NavBarLink>
            <NavBarLink to="/cart">Cart</NavBarLink>
            {/* <NavBarLink to={`/login?uri=${window.location.href}`}>
              Login
            </NavBarLink> */}
            <NavBarButton onClick={() => handleClickOnLogin()}>
              Login
            </NavBarButton>
            {/* <SignUpLink to="/signup">Sign up</SignUpLink> */}
            <SignUpButton onClick={() => handleClickOnSignUp()}>
              Sign up
            </SignUpButton>
          </>
        )}
        {showProfileDropdown && (
          <ProfileDropdown
            onLogout={() => {
              setShowProfileDropdown(false);
            }}
          />
        )}
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
