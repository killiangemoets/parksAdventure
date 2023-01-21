import TourBooking from "../../components/tourPageComponents/tourBooking/tourBooking.component";
import TourGallery from "../../components/tourPageComponents/tourGallery/tourGallery.component";
import TourHeader from "../../components/tourPageComponents/tourHeader/tourHeader.component";
import TourItinerary from "../../components/tourPageComponents/tourItinerary/tourItinerary.component";
import TourReviews from "../../components/tourPageComponents/tourReviews/tourReviews.component";
import TourRecommandations from "../../components/tourPageComponents/tourRecommandations/tourRecommandations.component";
import TourInfos from "../../components/tourPageComponents/tourInfos/tourInfos.component";
import { TourContainer } from "./tour.style";

const Tour = () => {
  return (
    <TourContainer>
      <TourHeader />
      <TourGallery />
      <TourInfos />
      <TourItinerary />
      <TourBooking />
      <TourReviews />
      <TourRecommandations />
    </TourContainer>
  );
};

export default Tour;
