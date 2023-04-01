import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { TReview } from "../../../types/tour";
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
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const [reviews, setReviews] = useState<TReview[]>([]);

  useEffect(() => {
    if (!tour) return;
    const newReviews = tour.reviews.slice(0, 3);
    setReviews(newReviews);
  }, [tour]);

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
        {reviews.map((review, i) => (
          <Review
            key={i}
            date={review.createdAt}
            userImg={review.user.photo}
            userName={`${review.user.firstname} ${review.user.lastname}`}
            review={review.review}
            rating={review.rating}
          />
        ))}
      </ReviewsWrapper>
      {tour?.reviews && tour.reviews.length > reviews.length && (
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
          See more reviews
        </Button>
      )}
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
