import Review from "../../../components/UIComponents/review/review.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../components/UIComponents/button/button.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import {
  Reviews,
  UserReviewsContainer,
  UserReviewsSpinner,
} from "./userReviews.style";
import { useEffect, useState } from "react";
import { getMyReviews } from "../../../api/review-requests";
import { TReview } from "../../../types/review";
import { PROFILE_PICTURE_SIZE_CLASSES } from "../../../components/UIComponents/profilePicture/profilePicture.component";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { UserBookingsErrorMessage } from "../userBookings/userBookings.style";

const UserReviews = () => {
  const [allReviews, setAllReviews] = useState<TReview[]>([]);
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetReviews = async () => {
      setIsLoading(true);
      const response = await getMyReviews();
      console.log(response);
      if (response && response.status === "success") {
        const reviewsList = response.data.data;
        setAllReviews(reviewsList);
        setReviews(reviewsList.slice(0, 3));
        setErrorMessage(undefined);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetReviews();
  }, []);

  const handleRenderReviews = () => {
    const newReviews = allReviews.slice(reviews.length, reviews.length + 3);
    setReviews([...reviews, ...newReviews]);
  };

  const handleUpdateReview = (updatedReview: TReview) => {
    const updatedAllReviews = allReviews.map((review) => {
      if (review._id === updatedReview._id) return updatedReview;
      else return review;
    });
    setAllReviews(updatedAllReviews);
    setReviews(updatedAllReviews.slice(0, 3));
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedAllReviews = allReviews.filter(
      (review) => review._id !== reviewId
    );
    setAllReviews(updatedAllReviews);
    setReviews(updatedAllReviews.slice(0, 3));
  };

  return (
    <UserReviewsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Reviews</Title>
      {isLoading && (
        <UserReviewsSpinner>
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        </UserReviewsSpinner>
      )}
      {errorMessage && (
        <UserBookingsErrorMessage>{errorMessage}</UserBookingsErrorMessage>
      )}

      <Reviews>
        {reviews.map((review) => (
          <Review
            key={review._id}
            handlePassUpdatedReview={handleUpdateReview}
            handlePassDeletedReview={handleDeleteReview}
            enableEditing="editing"
            date={review.createdAt}
            edited={review.edited}
            reviewId={review._id}
            review={review.review}
            rating={review.rating}
            userImg={review.tour?.imageCover}
            userName={review.tour?.name}
            link={`/tour/${review.tour?.slug}`}
            pictureSize={PROFILE_PICTURE_SIZE_CLASSES.medium}
          />
        ))}
      </Reviews>
      {allReviews.length > reviews.length && (
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={() => {
            handleRenderReviews();
          }}>
          See more reviews
        </Button>
      )}
    </UserReviewsContainer>
  );
};

export default UserReviews;
