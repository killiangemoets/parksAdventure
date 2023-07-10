import React, { FC, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

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
  images: string[];
  initialImageIndex?: number;
};

const PicturesCarousel: FC<PicturesCarouselProps> = ({
  handleOpen,
  images,
  initialImageIndex = 0,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  console.log("thumbsSwiper", thumbsSwiper);

  const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (carouselRef.current && !carouselRef.current.contains(e.target as Node))
      handleOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 725 && !isSmallScreen) {
      setIsSmallScreen(true);
    } else if (window.innerWidth > 725 && isSmallScreen) {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  return (
    <PicturesCarouselOverlay onClick={handleClickOnOverlay}>
      <PicturesCarouselContainer ref={carouselRef}>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={isSmallScreen ? false : true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          initialSlide={initialImageIndex}
          className="mySwiper2">
          {images.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <img src={image} alt={"tour view"} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper">
          {images.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <img src={image} alt={"tour view"} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </PicturesCarouselContainer>
      <CloseButton>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.empty}
          onClick={() => handleOpen(false)}>
          <ClosePicturesCarouselIcon />
        </Button>
      </CloseButton>
    </PicturesCarouselOverlay>
  );
};

export default PicturesCarousel;
