import styled from "styled-components";
import { Link } from "react-router-dom";

// import RoundIcon from "../../assets/logo_hike_round.png";

export const NavBarContainer = styled.div`
  width: 100vw;
  height: 8rem;
  background-color: #506044;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  position: fixed;
  z-index: 1;
`;

export const NavBarLogoContainer = styled(Link)`
  img {
    height: 6.2rem;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const NavBarLink = styled(Link)`
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #fbf3e5;
  transition: all 0.3s;

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

export const FooterContainer = styled.div`
  width: 100vw;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
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
