import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// import required modules
import { Autoplay, EffectFade } from "swiper";
import {
  HeaderCarouselSwiper,
  HeaderCarouselSwiperSlide,
} from "./mainCarousel.style";

const HeaderCarousel = ({ elements, handleTransition }) => {
  return (
    <>
      <HeaderCarouselSwiper
        modules={[EffectFade, Autoplay]}
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        onTransitionStart={handleTransition}
        className="mySwiper"
      >
        {elements.map((el, i) => (
          <HeaderCarouselSwiperSlide key={i}>{el}</HeaderCarouselSwiperSlide>
        ))}
      </HeaderCarouselSwiper>
    </>
  );
};

export default HeaderCarousel;
