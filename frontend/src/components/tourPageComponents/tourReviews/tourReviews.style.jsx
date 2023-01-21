import styled from "styled-components";
import { ReactComponent as InfoSVG } from "../../../assets/information-circle.svg";

export const TourReviewsContainer = styled.div`
  /* margin-top: 6.4rem; */
  width: 100%;
  background-color: #f9eedb;
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;

  h2 {
    position: relative;
  }
`;

export const Info = styled(InfoSVG)`
  position: absolute;
  top: -0.4rem;
  right: -2.4rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  .path {
    stroke: #cc704b;
  }

  &:hover {
    .path {
      stroke: #b86544;
    }
  }
`;

export const ReviewsWrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
