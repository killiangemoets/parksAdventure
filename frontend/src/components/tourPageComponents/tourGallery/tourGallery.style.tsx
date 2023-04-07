import styled from "styled-components";
import { ReactComponent as HeartSVG } from "../../../assets/heart.svg";

export const TourGalleryContainer = styled.div`
  padding: 0 6.4rem 6.4rem 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TourGalleryGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 0.4rem;
  height: 80vh;
  max-width: 130rem;
`;

export const TourMainImage = styled.div`
  height: 80vh;
  grid-column: 1/5;
  grid-row: 1/3;
  background-color: #aaa;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  /* height: 42rem; */

  img {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;
export const TourThirdImage = styled.div`
  background-color: #aaa;
  height: calc(30vh - 0.2rem);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;

export const TourGalleryButtons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1.6rem;
`;

export const HeartIcon = styled(HeartSVG)`
  width: 2.4rem;
  height: 2.4rem;
`;
