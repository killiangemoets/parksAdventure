import { useEffect, useState } from "react";
import AllReviewsNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allReviewsNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import { TReview } from "../../../types/review";
import {
  AdminContent,
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { getAllReviews } from "../../../api/review-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import Review from "../../../components/UIComponents/review/review.component";

const AdminAllReviews = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetReviews = async () => {
      setIsLoading(true);
      const response = await getAllReviews();
      console.log(response);
      if (response.status === "success") {
        setReviews(response.data.data);
        setErrorMessage(undefined);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetReviews();
  }, []);
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Reviews</AdminSectionTitle>
        <AllReviewsNavbar />
      </AdminFixHeader>
      <AdminContent>
        {isLoading && (
          <AdminContentSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminContentSpinner>
        )}
        {errorMessage && (
          <AdminContentErrorMessage>{errorMessage}</AdminContentErrorMessage>
        )}
        {reviews.map((review) => (
          <Review
            date={review.createdAt}
            review={review.review}
            rating={review.rating}
            userImg={review.tour.imageCover}
            userName={review.tour.name}
            edited={review.edited}
            enableEditing={false}
          />
        ))}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllReviews;
