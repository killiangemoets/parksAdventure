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

const TourGallery = () => {
  return (
    <TourGalleryContainer>
      <TourGalleryGrid>
        <TourMainImage>
          <img src="images/canadianRockies.jpg" alt="Tour 1" />
        </TourMainImage>
        <TourSecondImage>
          <img src="images/reviews-section-bg.webp" alt="Tour 4" />
        </TourSecondImage>
        <TourThirdImage>
          <img src="images/family.jpg" alt="Tour 2" />
        </TourThirdImage>
        <TourFourthImage>
          <img src="images/main-header-bg.jpg" alt="Tour 3" />
        </TourFourthImage>
        <TourGalleryButtons>
          <Button buttonType={BUTTON_TYPE_CLASSES.gallery}>
            View all 12 images
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.gallery}>
            Add to wishlist <HeartIcon />
          </Button>
        </TourGalleryButtons>
      </TourGalleryGrid>
    </TourGalleryContainer>
  );
};

export default TourGallery;
