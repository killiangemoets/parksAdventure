import Review from "../../components/tourPageComponents/review/review.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/UIComponents/button/button.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import { Reviews, UserReviewsContainer } from "./userReviews.style";

const UserReviews = () => {
  return (
    <UserReviewsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Reviews</Title>
      <Reviews>
        {/* <Review hideEditButtons={false} /> */}
        {/* <Review hideEditButtons={false} /> */}
        {/* <Review hideEditButtons={false} /> */}
      </Reviews>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
        See more reviews
      </Button>
    </UserReviewsContainer>
  );
};

export default UserReviews;
