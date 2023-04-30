import TourGallery from "../../components/tourPageComponents/tourGallery/tourGallery.component";
import TourInfos from "../../components/tourPageComponents/tourInfos/tourInfos.component";
import TourItinerary from "../../components/tourPageComponents/tourItinerary/tourItinerary.component";
import TourRecommendations from "../../components/UIComponents/tourRecommendations/tourRecommendations.component";
import TourReviews from "../../components/tourPageComponents/tourReviews/tourReviews.component";
import StarsRating from "../../components/UIComponents/starsRating/starsRating.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import ReservationInfoSection from "../../components/userProfilePagesComponents/reservationInfoSection/reservationInfoSection.component";
import {
  TitleContainer,
  TitleWrapper,
  UserBookingDetailsContainer,
} from "./userBookingDetails.style";
import { useDispatch, useSelector } from "react-redux";
import { selectRecommendations, selectTour, selectTourIsLoading } from "../../store/tour/tour.selector";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchTourBookingAsync } from "../../store/tour/tour.action";
import { AppDispatch } from "../../store/store";

type UserBookingDetailsParams = {
  id: string;
};

const UserBookingDetails = () => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<
  keyof UserBookingDetailsParams
>() as UserBookingDetailsParams;
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const recommendations = useSelector(selectRecommendations);

  useEffect(() => {
    dispatch(fetchTourBookingAsync(id));
  }, []);

  const handleScrollToReviews = () => {
    window.scrollTo({
      top: reviewsRef.current ? reviewsRef.current.offsetTop - 80 : 0,
      behavior: "smooth",
    });
  };


  return (
    <UserBookingDetailsContainer>
      <TitleContainer>
        <TitleWrapper>
          <Title titleType={TITLE_TYPE_CLASSES.main}>
            {!isLoading && tour?.name}
          </Title>
          {!isLoading && (
            <StarsRating
              linkOnReviews={true}
              handleLinkTo={handleScrollToReviews}
              rating={tour?.ratingsAverage || 0}
              numRatings={tour?.ratingsQuantity || 0}
            />
          )}
        </TitleWrapper>
      </TitleContainer>
      <ReservationInfoSection />
      <TourGallery />
      <TourInfos />
      <TourItinerary />
      <TourReviews forwardRef={reviewsRef} />
      <TourRecommendations tours={recommendations || []} />
    </UserBookingDetailsContainer>
  );
};

export default UserBookingDetails;
