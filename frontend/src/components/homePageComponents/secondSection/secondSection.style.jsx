import { Link } from "react-router-dom";
import styled from "styled-components";
import { GreenOpacity } from "../../../routes/home/home.style";

import secondSectionBackground from "../../../assets/second-section-bg.jpg";

export const SecondSecContainer = styled.div`
  width: 100vw;
  background: url(${secondSectionBackground}) no-repeat left center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
`;

export const SecondSecContainerInside = styled(GreenOpacity)`
  padding: 7.2rem 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7.2rem;
`;

export const SecondSecTitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

export const SecondSecSecondTitle = styled.h3`
  color: #fff;
  font-size: 2.2rem;
  letter-spacing: 1px;
`;

export const SecondSecElementLink = styled(Link)`
  text-decoration: none;
`;

export const SecondSectionContentWrapper = styled.div`
  max-width: 130rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SecondSecElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  &:hover {
    h4 {
      color: #cc704b !important;
    }
  }
`;

// const overElementTitleStyles = css`
//   top: -14px;
//   font-size: 12px;
//   color: ${mainColor};
// `;

export const ElementTitle = styled.h4`
  font-size: 2em;
  letter-spacing: 1px;
  font-weight: 700;
  /* letter-spacing: 2px; */
  text-align: center;
  color: #fff;
  transition: all 0.3s;

  /* &:hover {
    color: #cc704b; // to update later bc need to be when over the whole element, same for picture
  } */
`;

export const ElementIconContainer = styled.div`
  img {
    width: 12rem;
  }
`;
