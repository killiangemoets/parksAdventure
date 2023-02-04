// import Swiper core and required modules
import { Navigation, Pagination, Keyboard } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CarouselSwiper, CarouselSwiperSlide } from "./carousel.style";

const Carousel = ({ elements }) => {
  return (
    <>
      <CarouselSwiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        keyboard={{
          enabled: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {elements.map((el, i) => (
          <CarouselSwiperSlide key={i}>{el}</CarouselSwiperSlide>
        ))}
      </CarouselSwiper>
    </>
  );
};

export default Carousel;
