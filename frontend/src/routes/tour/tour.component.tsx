import TourBooking from "../../components/tourPageComponents/tourBooking/tourBooking.component";
import TourGallery from "../../components/tourPageComponents/tourGallery/tourGallery.component";
import TourHeader from "../../components/tourPageComponents/tourHeader/tourHeader.component";
import TourItinerary from "../../components/tourPageComponents/tourItinerary/tourItinerary.component";
import TourReviews from "../../components/tourPageComponents/tourReviews/tourReviews.component";
import TourRecommendations from "../../components/UIComponents/tourRecommendations/tourRecommendations.component";
import TourInfos from "../../components/tourPageComponents/tourInfos/tourInfos.component";
import { FixAdminTourNavbar, TourContainer, TourWrapper } from "./tour.style";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchTourAsync } from "../../store/tour/tour.action";
import { useParams } from "react-router-dom";
import {
  selectRecommendations,
  selectTourError,
} from "../../store/tour/tour.selector";
import NotFound from "../../components/notFoundComponent/notFound.component";
import AdminTourNavbar from "../../components/adminsProfilePagesCompoents/adminNavbars/adminTourNavbar.component";
import { selectUserRole } from "../../store/user/user.selector";
import { USER_ROLE_TYPES } from "../../types/user";

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
  const recommendations = useSelector(selectRecommendations);
  const userRole = useSelector(selectUserRole);

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
        {userRole === USER_ROLE_TYPES.ADMIN && (
          <FixAdminTourNavbar>
            <AdminTourNavbar />
          </FixAdminTourNavbar>
        )}
        <TourWrapper paddingTop={userRole === USER_ROLE_TYPES.ADMIN}>
          <TourHeader
            handleScrollToBooking={handleScrollToBooking}
            handleScrollToReviews={handleScrollToReviews}
          />
          <TourGallery />
          <TourInfos />
          <TourItinerary />
          <TourBooking forwardRef={bookingRef} />
          <TourReviews forwardRef={reviewsRef} />
          <TourRecommendations tours={recommendations || []} />
        </TourWrapper>
      </TourContainer>
    );
  }
};

export default Tour;
