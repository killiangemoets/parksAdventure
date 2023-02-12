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

const TourGallery = () => {
  return (
    <TourGalleryContainer>
      <TourGalleryGrid>
        <TourMainImage>
          <img src={pic1} alt="Tour 1" />
        </TourMainImage>
        <TourSecondImage>
          <img src={pic2} alt="Tour 4" />
        </TourSecondImage>
        <TourThirdImage>
          <img src={pic3} alt="Tour 2" />
        </TourThirdImage>
        <TourFourthImage>
          <img src={pic4} alt="Tour 3" />
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
