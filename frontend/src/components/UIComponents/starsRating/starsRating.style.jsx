import styled from "styled-components";

import { ReactComponent as StarSVG } from "../../../assets/star-solid.svg";

export const StarsRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

export const StarIcon = styled(StarSVG)`
  width: 2rem;
  height: 2rem;
`;

export const RatingData = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.4rem;
`;

export const RatingValue = styled.p`
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: 700;
`;
export const NumRatings = styled.p`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
`;

export const LinkNumRatings = styled(NumRatings)`
  color: #cc704b;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
