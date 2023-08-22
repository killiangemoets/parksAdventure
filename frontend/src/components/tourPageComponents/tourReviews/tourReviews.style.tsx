import styled from "styled-components";
import { ReactComponent as InfoSVG } from "../../../assets/icons/information-circle.svg";
import colors from "../../../colors";

export const TourReviewsContainer = styled.div`
  width: 100%;
  background-color: ${colors.backgroundMediumDark};
  padding: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.8rem;

  h2 {
    position: relative;
  }

  @media (max-width: 480px) {
    padding: 6.4rem 4rem;
  }
`;

export const Info = styled(InfoSVG)`
  position: absolute;
  top: -0.4rem;
  right: -2.4rem;
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  transition: all 0.3s;
  .path {
    stroke: ${colors.primary};
  }

  &:hover {
    .path {
      stroke: ${colors.primaryDark};
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

export const ReviewsModalText = styled.div`
  font-size: 1.4rem;
  line-height: 2.2rem;
  text-align: justify;
  letter-spacing: 1px;
  max-width: 46rem;
`;

export const NoReviewsMessage = styled.p`
  align-self: center;
  font-weight: 400;
  margin-right: 2.25rem;
  font-size: 1.4rem;
  letter-spacing: 1.2px;
`;
