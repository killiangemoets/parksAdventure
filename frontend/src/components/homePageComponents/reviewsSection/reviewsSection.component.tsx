import { useEffect, useState } from "react";
import { GreenOpacity } from "../../../routes/home/home.style";
import Carousel from "../../UIComponents/carousel/carousel.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import TopReview from "../topReview/topReview.component";
import {
  ErrorMessage,
  ReviewsSecContainer,
  ReviewsSecContent,
  ReviewsSecPicture,
  ReviewsSecWrapper,
} from "./reviewsSection.style";
import { TReview } from "../../../types/review";
import { getTop10Reviews } from "../../../api/review-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../UIComponents/spinner/spinner.component";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<React.ReactNode[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetReviews = async () => {
      setIsLoading(true);
      const response = await getTop10Reviews();
      if (response && response.status === "success") {
        const reviewsList = response.data.data;
        const reviewCards = reviewsList.map((review: TReview) => {
          const title = `${review.tour?.name} - ${review.tour?.duration} ${
            review.tour?.duration > 1 ? "days" : "days"
          }`.toLowerCase();
          const description = review.review;
          const name = `${review.user.firstname} ${review.user.lastname}`;
          const profilePicture = review.user.photo;
          const rate = review.rating;
          const slug = review.tour?.slug;
          return (
            <TopReview
              review={{ title, description, name, rate, profilePicture, slug }}
            />
          );
        });
        setReviews(reviewCards);

        setErrorMessage(undefined);
      } else {
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
      }
      setIsLoading(false);
    };
    handleGetReviews();
  }, []);

  return (
    <ReviewsSecContainer>
      <ReviewsSecWrapper>
        <ReviewsSecPicture>
          <GreenOpacity />
        </ReviewsSecPicture>
        <ReviewsSecContent>
          <Title titleType={TITLE_TYPE_CLASSES.homeSection}>
            Our Top Reviews
          </Title>
          {isLoading ? (
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          ) : errorMessage ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : (
            <Carousel elements={reviews} />
          )}
        </ReviewsSecContent>
      </ReviewsSecWrapper>
    </ReviewsSecContainer>
  );
};

export default ReviewsSection;
