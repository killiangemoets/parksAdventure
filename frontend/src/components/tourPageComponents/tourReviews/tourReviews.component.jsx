import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import Review from "../review/review.component";
import { ReviewsWrapper, TourReviewsContainer } from "./tourReviews.style";

const TourReviews = () => {
  return (
    <TourReviewsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>Customer Reviews</Title>
      <ReviewsWrapper>
        <Review />
        <Review />
        <Review />
        <Review />
      </ReviewsWrapper>
    </TourReviewsContainer>
  );
};

export default TourReviews;
