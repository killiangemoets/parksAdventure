import TourGallery from "../../components/tourPageComponents/tourGallery/tourGallery.component";
import TourInfos from "../../components/tourPageComponents/tourInfos/tourInfos.component";
import TourItinerary from "../../components/tourPageComponents/tourItinerary/tourItinerary.component";
import TourRecommandations from "../../components/tourPageComponents/tourRecommandations/tourRecommandations.component";
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

const UserBookingDetails = () => {
  return (
    <UserBookingDetailsContainer>
      <TitleContainer>
        <TitleWrapper>
          <Title titleType={TITLE_TYPE_CLASSES.main}>The Forest Hiker</Title>
          <StarsRating linkOnReviews={true} rating={3.9} numRatings={12} />
        </TitleWrapper>
      </TitleContainer>
      {/* <StarsRatingContainer>
        <StarsRatingWrapper></StarsRatingWrapper>
      </StarsRatingContainer> */}
      <ReservationInfoSection />
      <TourGallery />
      <TourInfos />
      <TourItinerary />
      <TourReviews />
      <TourRecommandations />
    </UserBookingDetailsContainer>
  );
};

export default UserBookingDetails;
