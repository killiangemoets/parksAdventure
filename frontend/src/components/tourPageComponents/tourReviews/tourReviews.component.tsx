import { FC, useState } from "react";
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

export type TourReviewsProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const TourReviews: FC<TourReviewsProps> = ({ forwardRef }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = (state: boolean): void => {
    setModalOpen(state);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <TourReviewsContainer ref={forwardRef}>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        Customer Reviews <Info onClick={() => handleOpenModal(true)} />
      </Title>
      <ReviewsWrapper>
        <Review />
        <Review />
        <Review />
      </ReviewsWrapper>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
        See more reviews
      </Button>
      <Modal title={"Reviews"} handleClose={handleCloseModal} open={modalOpen}>
        <ReviewsModalText>
          All reviews are from verified customers who have purchased a ticket
          for this activity. Reviews can only be left once the activity is
          completed.
        </ReviewsModalText>
      </Modal>
    </TourReviewsContainer>
  );
};

export default TourReviews;
