import TourBooking from "../../components/tourPageComponents/tourBooking/tourBooking.component";
import TourGallery from "../../components/tourPageComponents/tourGallery/tourGallery.component";
import TourHeader from "../../components/tourPageComponents/tourHeader/tourHeader.component";
import TourItinerary from "../../components/tourPageComponents/tourItinerary/tourItinerary.component";
import TourReviews from "../../components/tourPageComponents/tourReviews/tourReviews.component";
import TourRecommandations from "../../components/tourPageComponents/tourRecommandations/tourRecommandations.component";
import TourInfos from "../../components/tourPageComponents/tourInfos/tourInfos.component";
import { TourContainer } from "./tour.style";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchTourAsync } from "../../store/tour/tour.action";
import { useParams } from "react-router-dom";
import { selectTourError } from "../../store/tour/tour.selector";
import NotFound from "../../components/notFound/notFound.component";

type TourSlugRouteParams = {
  slug: string;
};

const Tour = () => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;

  const bookingRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const error = useSelector(selectTourError);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchTourAsync(slug));
  }, [slug]);

  const handleScrollToBooking = () => {
    window.scrollTo({
      top: bookingRef.current ? bookingRef.current.offsetTop - 120 : 0,
      behavior: "smooth",
    });
  };
  const handleScrollToReviews = () => {
    window.scrollTo({
      top: reviewsRef.current ? reviewsRef.current.offsetTop - 80 : 0,
      behavior: "smooth",
    });
  };

  if (error) {
    return <NotFound title="No tour found wih this name" />;
  } else {
    return (
      <TourContainer>
        <TourHeader
          handleScrollToBooking={handleScrollToBooking}
          handleScrollToReviews={handleScrollToReviews}
        />
        <TourGallery />
        <TourInfos />
        <TourItinerary />
        <TourBooking forwardRef={bookingRef} />
        <TourReviews forwardRef={reviewsRef} />
        <TourRecommandations />
      </TourContainer>
    );
  }
};

export default Tour;
