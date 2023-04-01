import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import {
  HeartIcon,
  TourFourthImage,
  TourGalleryButtons,
  TourGalleryContainer,
  TourGalleryGrid,
  TourMainImage,
  TourSecondImage,
  TourThirdImage,
} from "./tourGallery.style";

import pic1 from "../../../assets/canadianRockies.jpg";
import pic2 from "../../../assets/reviews-section-bg.webp";
import pic3 from "../../../assets/family.jpg";
import pic4 from "../../../assets/main-header-bg.jpg";
import PicturesCarousel from "../../UIComponents/picturesCarousel/picturesCarousel.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";

const TourGallery = () => {
  const [picturesCarouselOpen, setPicturesCarouselOpen] =
    useState<boolean>(false);
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    let newCarouselImages = [];
    if (tour?.imageCover) newCarouselImages.push(tour.imageCover);
    if (tour?.images) newCarouselImages.push(...tour.images);
    setCarouselImages(newCarouselImages);
  }, [tour]);

  const handleOpenCarousel = (state: boolean): void => {
    document.body.style.overflowY = state ? "hidden" : "scroll";
    setPicturesCarouselOpen(state);
  };

  return (
    <>
      {!isLoading && (
        <>
          <TourGalleryContainer>
            <TourGalleryGrid>
              <TourMainImage>
                {tour?.imageCover && (
                  <img src={tour?.imageCover} alt="Tour 1" />
                )}
              </TourMainImage>
              <TourSecondImage>
                {tour?.images && tour?.images[0] && (
                  <img src={tour.images[0]} alt="Tour 2" />
                )}
              </TourSecondImage>
              <TourThirdImage>
                {tour?.images && tour?.images[1] && (
                  <img src={tour.images[1]} alt="Tour 3" />
                )}
              </TourThirdImage>
              <TourFourthImage>
                {tour?.images && tour?.images[2] && (
                  <img src={tour.images[2]} alt="Tour 4" />
                )}
              </TourFourthImage>
              <TourGalleryButtons>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.gallery}
                  onClick={() => handleOpenCarousel(true)}
                >
                  View all {carouselImages.length} images
                </Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.gallery}>
                  Add to wishlist <HeartIcon />
                </Button>
              </TourGalleryButtons>
            </TourGalleryGrid>
          </TourGalleryContainer>
          {picturesCarouselOpen && (
            <PicturesCarousel
              handleOpen={handleOpenCarousel}
              images={carouselImages}
            />
          )}
        </>
      )}
    </>
  );
};

export default TourGallery;
