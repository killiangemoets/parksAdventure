import styled, { css } from "styled-components";
import { ReactComponent as HeartSVG } from "../../../assets/heart.svg";

export const TourGalleryContainer = styled.div`
  padding: 0 6.4rem 6.4rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 805px) {
    padding: 0 3.2rem 6.4rem 3.2rem;
  }
`;

export const TourGalleryGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 0.4rem;
  height: 80vh;
  max-width: 130rem;

  @media (max-width: 900px) {
    height: 65vh;
  }
  @media (max-width: 805px) {
    height: 50vh;
  }
`;

export const TourMainImage = styled.div`
  height: 80vh;
  grid-column: 1/5;
  grid-row: 1/3;
  background-color: #aaa;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  img {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    height: 65vh;
  }
  @media (max-width: 805px) {
    height: 50vh;
  }
  @media (max-width: 805px) {
    grid-row: 1/2;
    height: calc(30vh - 0.2rem);
  }
`;
export const TourSecondImage = styled.div`
  grid-column: 5/7;
  background-color: #aaa;
  border-top-right-radius: 8px;
  height: calc(50vh - 0.2rem);

  img {
    border-top-right-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    height: calc(37vh - 0.2rem);
  }
  @media (max-width: 805px) {
    height: calc(30vh - 0.2rem);
  }
  @media (max-width: 805px) {
    grid-row: 1/2;
  }
`;
export const TourThirdImage = styled.div`
  background-color: #aaa;
  height: calc(30vh - 0.2rem);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    height: calc(28vh - 0.2rem);
  }
  @media (max-width: 805px) {
    height: calc(20vh - 0.2rem);
  }
  @media (max-width: 805px) {
    grid-column: 1/4;
    grid-row: 2/3;
  }
`;
export const TourFourthImage = styled.div`
  background-color: #aaa;
  height: calc(30vh - 0.2rem);

  border-bottom-right-radius: 8px;
  img {
    border-bottom-right-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    height: calc(28vh - 0.2rem);
  }
  @media (max-width: 805px) {
    height: calc(20vh - 0.2rem);
  }
  @media (max-width: 805px) {
    grid-column: 4/7;
    grid-row: 2/3;
  }
`;

export const TourGalleryButtons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1.6rem;

  @media (max-width: 620px) {
    button {
      padding: 0rem 0.8rem;
      height: 4rem !important;
      font-size: 1.4rem;
      border: solid 1.5px #cc704b;
      letter-spacing: 0.2px;
      gap: 0.4rem;
      &:hover {
        border: solid 1.5px #cc704b;
      }

      svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
`;

type HeartIconProps = {
  inwishlist: boolean;
};

export const HeartIcon = styled(HeartSVG)<HeartIconProps>`
  width: 2.4rem;
  height: 2.4rem;

  ${({ inwishlist }) =>
    inwishlist &&
    css`
      .fill {
        fill: #cc704b;
      }
    `}
`;
