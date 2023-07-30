import styled from "styled-components";

import mainLogo from "../../../assets/logo_hike_long_white.png";

export const MainHeaderContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8rem);
  background: no-repeat center;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const MainHeaderContentContainer = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 920px) {
    bottom: 6rem;
    left: 8rem;
    gap: 1.6rem;
  }
  @media (max-width: 690px) {
    left: 4.2rem;
    gap: 1rem;
  }
`;

export const MainHeaderLogoContainer = styled.div`
  height: 10rem;
  width: 30rem;
  background: url(${mainLogo});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media (max-width: 920px) {
    height: 8rem;
    width: 24rem;
  }

  @media (max-width: 690px) {
    height: 6rem;
    width: 18rem;
  }
`;

export const MainHeaderText = styled.h3`
  color: #fff;
  font-size: 4rem;
  letter-spacing: 4.8px;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: 920px) {
    font-size: 3.2rem;
    letter-spacing: 4px;
  }
  @media (max-width: 690px) {
    font-size: 2.4rem;
    letter-spacing: 2.8px;
  }
`;
