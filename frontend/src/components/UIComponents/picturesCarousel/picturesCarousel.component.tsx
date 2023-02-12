import React, { FC, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import pic1 from "../../../assets/canadianRockies.jpg";
import pic2 from "../../../assets/reviews-section-bg.webp";
import pic3 from "../../../assets/family.jpg";
import pic4 from "../../../assets/main-header-bg.jpg";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import {
  CloseButton,
  ClosePicturesCarouselIcon,
  PicturesCarouselContainer,
  PicturesCarouselOverlay,
} from "./picturesCarousel.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

export type PicturesCarouselProps = {
  handleOpen: (state: boolean) => void;
};

const PicturesCarousel: FC<PicturesCarouselProps> = ({ handleOpen }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (carouselRef.current && !carouselRef.current.contains(e.target as Node))
      handleOpen(false);
  };

  return (
    <PicturesCarouselOverlay onClick={handleClickOnOverlay}>
      <PicturesCarouselContainer ref={carouselRef}>
        <Swiper
          style={
            {
              //   "--swiper-navigation-color": "#fff",
              //   "--swiper-pagination-color": "#fff",
            }
          }
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img src={pic1} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic2} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic3} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic4} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic1} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic2} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic3} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic4} alt={"tour view"} />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={pic1} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic2} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic3} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic4} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic1} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic2} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic3} alt={"tour view"} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pic4} alt={"tour view"} />
          </SwiperSlide>
        </Swiper>
      </PicturesCarouselContainer>
      <CloseButton>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onClick={() => handleOpen(false)}
        >
          <ClosePicturesCarouselIcon />
        </Button>
      </CloseButton>
    </PicturesCarouselOverlay>
  );
};

export default PicturesCarousel;
