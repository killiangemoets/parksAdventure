import { Link } from "react-router-dom";
import styled from "styled-components";
import { GreenOpacity } from "../../../routes/home/home.style";

import secondSectionBackground from "../../../assets/images/second-section-bg.webp";
import colors from "../../../colors";

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
  color: ${colors.white};
  font-size: 2.2rem;
  letter-spacing: 1px;
  text-align: center;
`;

export const SecondSecElementLink = styled(Link)`
  text-decoration: none;
  @media (max-width: 580px) {
    &:nth-child(3) {
      grid-column: span 2;
    }
  }
`;

export const SecondSectionContentWrapper = styled.div`
  max-width: 130rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 580px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const SecondSecElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  &:hover {
    h4 {
      color: ${colors.primary} !important;
    }
  }
`;

export const ElementTitle = styled.h4`
  font-size: 2em;
  letter-spacing: 1px;
  font-weight: 700;
  text-align: center;
  color: ${colors.white};
  transition: all 0.3s;
`;

export const ElementIconContainer = styled.div`
  img {
    width: 12rem;
  }
`;
