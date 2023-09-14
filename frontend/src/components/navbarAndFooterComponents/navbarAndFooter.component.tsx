import {
  Copyright,
  DropdownIcon,
  FooterContainer,
  FooterLink,
  FooterLogo,
  FooterNavigation,
  LinksContainer,
  LinksContainerInColumn,
  MenuIcon,
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
import { useEffect, useState } from "react";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../UIComponents/profilePicture/profilePicture.component";
import ProfileDropdown from "./profileDropdown.component";
import getAuthenticationRedictionUri from "../../utils/formatting/formatAuthenticationUri";
import { selectCartNumberOfItems } from "../../store/cart/cart.selector";
import {
  isUser,
  isUserAdminOrGuide,
} from "../../utils/dataManipulation/IsUserRole";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../UIComponents/button/button.component";

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUserReducer);
  const cartNumberOfItems = useSelector(selectCartNumberOfItems);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showPhoneNavBar, setShowPhoneNavbar] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);

  const handleClickOnLogin = () => {
    const uri = getAuthenticationRedictionUri(window.location.href);
    if (uri.includes("signup") || uri.includes("login")) {
      return navigate(`/login`);
    }
    navigate(`/login?uri=${uri}`);
  };
  const handleClickOnSignUp = () => {
    const uri = getAuthenticationRedictionUri(window.location.href);
    if (uri.includes("signup") || uri.includes("login")) {
      return navigate(`/signup`);
    }
    navigate(`/signup?uri=${uri}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 620 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 620 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  return (
    <NavBarContainer
      onMouseLeave={() => {
        setShowProfileDropdown(false);
        setShowPhoneNavbar(false);
      }}>
      <NavBarLogoContainer to="/">
        <img src={roundLogo} alt="hiking tour logo" />
      </NavBarLogoContainer>
      {isSmallScreen ? (
        <>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => {
              setShowPhoneNavbar(!showPhoneNavBar);
            }}>
            <MenuIcon />
          </Button>

          {showPhoneNavBar && (
            <LinksContainerInColumn>
              <NavBarLink
                to="/"
                onClick={() => {
                  setShowPhoneNavbar(false);
                  setShowProfileDropdown(false);
                }}>
                Home
              </NavBarLink>
              <NavBarLink
                to="/alltours"
                onClick={() => {
                  setShowPhoneNavbar(false);
                  setShowProfileDropdown(false);
                }}>
                All tours
              </NavBarLink>
              {isUser(user.role) && (
                <NavBarLink
                  to="/wishlist"
                  onClick={() => {
                    setShowPhoneNavbar(false);
                    setShowProfileDropdown(false);
                  }}>
                  Wishlist
                </NavBarLink>
              )}
              {!isUserAdminOrGuide(user.role) && (
                <>
                  <NavBarLink
                    to="/cart"
                    addMargin={cartNumberOfItems > 0}
                    onClick={() => {
                      setShowPhoneNavbar(false);
                      setShowProfileDropdown(false);
                    }}>
                    {cartNumberOfItems > 0 && <span>{cartNumberOfItems}</span>}
                    Cart
                  </NavBarLink>
                  <NavBarLink
                    to="/contact"
                    onClick={() => {
                      setShowPhoneNavbar(false);
                      setShowProfileDropdown(false);
                    }}>
                    Contact
                  </NavBarLink>
                </>
              )}
              {user.id ? (
                <>
                  <NavBarButton
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                    }}>
                    <ProfilePicture
                      pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
                      pictureUrl={user.photo}
                    />
                    {user.firstname}
                    <DropdownIcon />
                  </NavBarButton>
                </>
              ) : (
                <>
                  <NavBarButton onClick={() => handleClickOnLogin()}>
                    Login
                  </NavBarButton>
                  <SignUpButton onClick={() => handleClickOnSignUp()}>
                    Sign up
                  </SignUpButton>
                </>
              )}
              {showProfileDropdown && (
                <ProfileDropdown
                  handleClose={() => {
                    setShowPhoneNavbar(false);
                    setShowProfileDropdown(false);
                  }}
                />
              )}
            </LinksContainerInColumn>
          )}
        </>
      ) : (
        <LinksContainer>
          <NavBarLink to="/">Home</NavBarLink>
          <NavBarLink to="/alltours">All tours</NavBarLink>
          {isUser(user.role) && (
            <NavBarLink to="/wishlist">Wishlist</NavBarLink>
          )}
          {!isUserAdminOrGuide(user.role) && (
            <>
              <NavBarLink to="/cart" addMargin={cartNumberOfItems > 0}>
                {cartNumberOfItems > 0 && <span>{cartNumberOfItems}</span>}
                Cart
              </NavBarLink>
              <NavBarLink to="/contact">Contact</NavBarLink>
            </>
          )}
          {user.id ? (
            <>
              <NavBarButton
                onMouseOver={() => {
                  setShowProfileDropdown(true);
                }}>
                <ProfilePicture
                  pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
                  pictureUrl={user.photo}
                />
                {user.firstname}
                <DropdownIcon />
              </NavBarButton>
            </>
          ) : (
            <>
              <NavBarButton onClick={() => handleClickOnLogin()}>
                Login
              </NavBarButton>
              <SignUpButton onClick={() => handleClickOnSignUp()}>
                Sign up
              </SignUpButton>
            </>
          )}
          {showProfileDropdown && <ProfileDropdown />}
        </LinksContainer>
      )}
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
        <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="/general-terms-and-conditions">
          General Terms and Conditions
        </FooterLink>
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

export const FooterLayout = () => {
  return (
    <>
      <NavBarContainer>
        <NavBarLogoContainer to="/">
          <img src={roundLogo} alt="hiking tour logo" />
        </NavBarLogoContainer>
        <LinksContainer>
          <NavBarLink to="/">Home</NavBarLink>
          <NavBarLink to="/alltours">All tours</NavBarLink>
          <NavBarLink to="/contact">Contact</NavBarLink>
        </LinksContainer>
      </NavBarContainer>
      <Outlet />
      <Footer />
    </>
  );
};

export default NavbarAndFooter;
