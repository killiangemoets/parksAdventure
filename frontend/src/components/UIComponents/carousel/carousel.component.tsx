import { FC } from "react";
import { Navigation, Pagination, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CarouselSwiper, CarouselSwiperSlide } from "./carousel.style";

type CarouselProps = {
  elements: React.ReactNode[];
  spaceBetween?: number;
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean;
  loop?: boolean;
};

const Carousel: FC<CarouselProps> = ({
  elements,
  spaceBetween = 100,
  slidesPerView = 1,
  navigation = true,
  pagination = true,
  loop = true,
}) => {
  return (
    <>
      <CarouselSwiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        keyboard={{
          enabled: true,
        }}
        loop={loop}
        pagination={pagination && { clickable: true }}>
        {elements.map((el, i) => (
          <CarouselSwiperSlide key={i}>{el}</CarouselSwiperSlide>
        ))}
      </CarouselSwiper>
    </>
  );
};

export default Carousel;
