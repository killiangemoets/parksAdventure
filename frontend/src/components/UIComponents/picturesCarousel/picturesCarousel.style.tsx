import styled from "styled-components";
import { ReactComponent as CloseSVG } from "../../../assets/x-solid.svg";

export const PicturesCarouselOverlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(187, 187, 187, 0.8);
  z-index: 999 !important;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PicturesCarouselContainer = styled.div`
  width: 56vw;
  height: calc((56vw / 3) * 2);
  transform: scale(1);

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;

    .swiper-button-next,
    .swiper-button-prev {
      position: fixed;
      top: 40%;
      color: #fdfaf5;

      transition: all 0.3s;

      &:hover {
        color: #b86544;
      }
    }

    .swiper-button-prev {
      transform: translateX(-220%);
    }
    .swiper-button-next {
      transform: translateX(220%);
    }
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .mySwiper2 {
    height: 80%;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
  }

  .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    padding-bottom: 0;
  }

  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.72;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 4%;
  right: 3%;
`;

export const ClosePicturesCarouselIcon = styled(CloseSVG)`
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  .path {
    fill: #fdfaf5;

    transition: all 0.3s;
  }

  &:hover {
    .path {
      fill: #b86544;
    }
  }
`;
