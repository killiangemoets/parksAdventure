import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Modal from "../../UIComponents/modal/modal.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import Review from "../review/review.component";
import {
  Info,
  ReviewsModalText,
  ReviewsWrapper,
  TourReviewsContainer,
} from "./tourReviews.style";

const TourReviews = ({ forwardRef }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (state = undefined) => {
    const newState = state ?? !modalOpen;
    setModalOpen(newState);
  };
  return (
    <TourReviewsContainer ref={forwardRef}>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        Customer Reviews <Info onClick={handleOpenModal} />
      </Title>
      <ReviewsWrapper>
        <Review />
        <Review />
        <Review />
      </ReviewsWrapper>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
        See more reviews
      </Button>
      {modalOpen && (
        <Modal title={"Reviews"} handleOpen={handleOpenModal}>
          <ReviewsModalText>
            All reviews are from verified customers who have purchased a ticket
            for this activity. Reviews can only be left once the activity is
            completed.
          </ReviewsModalText>
        </Modal>
      )}
    </TourReviewsContainer>
  );
};

export default TourReviews;
