import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import Review from "../review/review.component";
import {
  Info,
  ReviewsWrapper,
  TourReviewsContainer,
} from "./tourReviews.style";

const TourReviews = ({ forwardRef }) => {
  return (
    <TourReviewsContainer ref={forwardRef}>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        Customer Reviews <Info />
      </Title>
      <ReviewsWrapper>
        <Review />
        <Review />
        <Review />
      </ReviewsWrapper>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
        See more reviews
      </Button>
    </TourReviewsContainer>
  );
};

export default TourReviews;
