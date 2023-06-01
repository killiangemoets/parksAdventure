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
import { getAllTourNames } from "../../../api/tour-requests";
import { TourNameData } from "../../../types/tour";
import { getAllUserNames } from "../../../api/user-requests";
import { UserNameData } from "../../../types/user";
import useHitBottomPagination from "../../../hooks/useBottomPagination";
import { useSearchParams } from "react-router-dom";
import AdminReview from "../../../components/UIComponents/review/adminReview.component";

const AdminAllReviews = () => {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tourNames, setTourNames] = useState<TourNameData[]>([]);
  const [userNames, setUserNames] = useState<UserNameData[]>([]);

  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const currentPage = useHitBottomPagination(numberOfPages);

  useEffect(() => {
    const handleGetReviews = async () => {
      setIsLoading(true);
      const requestStringFromUrl = window.location.href.split("?")[1];
      const pageRequest = currentPage > 1 ? `&page=${currentPage}` : "";

      let requestString = `?limit=${process.env.REACT_APP_REVIEWS_PER_PAGE}${pageRequest}`;
      if (requestStringFromUrl) requestString += `&${requestStringFromUrl}`;

      const response = await getAllReviews(requestString);

      console.log("REVIEWS", response);

      if (response.status === "success") {
        if (response.totalResults === 0) setErrorMessage("No results!");
        else setErrorMessage(undefined);

        if (currentPage > 1)
          setReviews((reviews) => [...reviews, ...response.data.data]);
        else setReviews(response.data.data);

        const newNumberOfPages = Math.ceil(
          response.totalResults /
            (process.env.REACT_APP_BOOKINGS_PER_PAGE
              ? +process.env.REACT_APP_BOOKINGS_PER_PAGE
              : 12)
        );
        setNumberOfPages(newNumberOfPages);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetReviews();
  }, [searchParams, currentPage]);

  useEffect(() => {
    const handleGetTourAndUserNames = async () => {
      const tourNamesResponse = await getAllTourNames();
      if (tourNamesResponse.status === "success") {
        const newTourNames: TourNameData[] = tourNamesResponse.data.tours;
        setTourNames(
          newTourNames.sort((tourA, tourB) => {
            if (tourA.name < tourB.name) {
              return -1;
            }
            if (tourA.name > tourB.name) {
              return 1;
            }

            return 0;
          })
        );
      }
      const userNamesResponse = await getAllUserNames();
      if (userNamesResponse.status === "success") {
        const newUserNames: UserNameData[] = userNamesResponse.data.users;
        setUserNames(
          newUserNames.sort((userA, userB) => {
            if (userA.lastname < userB.lastname) {
              return -1;
            }
            if (userA.lastname > userB.lastname) {
              return 1;
            }

            return 0;
          })
        );
      }
    };
    handleGetTourAndUserNames();
  }, []);

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(updatedReviews);
  };

  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Reviews</AdminSectionTitle>
        <AllReviewsNavbar tourNames={tourNames} userNames={userNames} />
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
          <AdminReview
            date={review.createdAt}
            review={review.review}
            rating={review.rating}
            userImg={review.user?.photo}
            userName={`${review.user?.firstname} ${review.user?.lastname}`}
            tourImg={review.tour?.imageCover}
            hidden={review.hidden}
            tourName={review.tour?.name}
            edited={review.edited}
            reviewId={review._id}
            handlePassDeletedReview={handleDeleteReview}
          />
        ))}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllReviews;
