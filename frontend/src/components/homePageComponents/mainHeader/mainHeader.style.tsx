import styled from "styled-components";

import mainLogo from "../../../assets/logo_hike_long_white.png";

export const MainHeaderContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 8rem);
  background: no-repeat left center;

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
  /* align-items: center; */
  justify-content: center;
  gap: 2rem;
`;

export const MainHeaderLogoContainer = styled.div`
  height: 10rem;
  width: 30rem;
  /* height: calc(100vh - 8rem); */
  background: url(${mainLogo});
  /* left center fixed; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export const MainHeaderText = styled.h3`
  color: #fff;
  font-size: 4rem;
  letter-spacing: 4.8px;
  font-weight: 500;
  text-transform: uppercase;

  @keyframes my-animation {
    0% {
      background: red;
    }
    50% {
      background: blue;
    }
    100% {
      background: green;
    }
  }
`;
