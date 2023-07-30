import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

export const CarouselSwiper = styled(Swiper)`
  width: 100%;
  max-width: 80rem;
  padding: 3.2rem 0 4.8rem 0;

  --swiper-navigation-size: 3.2rem;
  --swiper-navigation-top-offset: 50%;
  --swiper-navigation-sides-offset: 6.4rem;

  .swiper-button-prev,
  .swiper-button-next {
    color: #aaa;
    transition: all 0.3s;

    &:hover {
      color: #cc704b;
    }
  }

  .swiper-pagination-bullet {
    background-color: #aaa;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: #cc704b;
  }
`;

export const CarouselSwiperSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
