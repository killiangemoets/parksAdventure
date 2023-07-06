import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTour } from "../../../store/tour/tour.selector";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Modal from "../../UIComponents/modal/modal.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import Review from "../../UIComponents/review/review.component";
import {
  Info,
  ReviewsModalText,
  ReviewsWrapper,
  TourReviewsContainer,
  NoReviewsMessage,
} from "./tourReviews.style";
import { TReview } from "../../../types/review";

export type TourReviewsProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const TourReviews: FC<TourReviewsProps> = ({ forwardRef }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const tour = useSelector(selectTour);
  const [reviews, setReviews] = useState<TReview[]>([]);

  useEffect(() => {
    if (!tour) return;
    const newReviews = tour.reviews.slice(0, 3);
    setReviews(newReviews);
  }, [tour]);

  const handleRenderReviews = () => {
    if (!tour) return;
    const newReviews = tour.reviews.slice(reviews.length, reviews.length + 3);
    setReviews([...reviews, ...newReviews]);
  };

  return (
    <TourReviewsContainer ref={forwardRef}>
      <Title titleType={TITLE_TYPE_CLASSES.section}>
        Customer Reviews <Info onClick={() => setModalOpen(true)} />
      </Title>
      <ReviewsWrapper>
        {reviews.length ? (
          reviews.map((review, i) => (
            <Review
              key={i}
              date={review.createdAt}
              userImg={review.user?.photo}
              userName={`${
                review.user ? review.user?.firstname : "Unkonwn Hiker"
              } ${review.user ? review.user?.lastname : ""}`}
              review={review.review}
              rating={review.rating}
              edited={review.edited}
            />
          ))
        ) : (
          <NoReviewsMessage>No reviews yet</NoReviewsMessage>
        )}
      </ReviewsWrapper>
      {tour?.reviews && tour.reviews.length > reviews.length && (
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={() => {
            handleRenderReviews();
          }}>
          See more reviews
        </Button>
      )}
      <Modal
        title={"Reviews"}
        handleClose={() => {
          setModalOpen(false);
        }}
        open={modalOpen}>
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
