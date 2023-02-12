import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper";
import {
  HeaderCarouselSwiper,
  HeaderCarouselSwiperSlide,
} from "./mainCarousel.style";
import { FC } from "react";

export type HeaderCarouselProps = {
  elements: React.ReactNode[];
};

const HeaderCarousel: FC<HeaderCarouselProps> = ({ elements }) => {
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
