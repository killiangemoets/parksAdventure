import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../colors";

export const ProfileColumnContainer = styled.div`
  background-image: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(${colors.secondaryVariantLight}),
    to(${colors.secondary})
  );
  background-image: linear-gradient(
    to right bottom,
    ${colors.secondaryVariantLight},
    ${colors.secondary}
  );
  padding: 6.4rem 7.2rem 6.4rem 4.8rem;
  width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  position: fixed;
  height: 100vh;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const ProfileSectionContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &:hover {
    -webkit-transform: translateX(0.6rem);
    transform: translateX(0.6rem);
  }
`;

export const ProfileSectionLabel = styled.p`
  font-size: 1.6rem;
  text-transform: uppercase;
  color: ${colors.white};
  color: ${colors.iconsLight};
  letter-spacing: 1px;
`;
