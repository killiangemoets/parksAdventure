import { useDispatch, useSelector } from "react-redux";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import AdminBookingsCalendar from "../../../components/adminsProfilePagesCompoents/adminBookingsCalendar/adminBookingsCalendar.component";
import { AppDispatch } from "../../../store/store";
import {
  AdminBookingsCalendarContainer,
  AdminTourCalendarContainer,
  AdminTourCalendarSpinner,
  AdminTourCalendarTitle,
} from "./adminTourCalendar.style";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { useEffect } from "react";
import { fetchTourAsync } from "../../../store/tour/tour.action";
import { useParams } from "react-router-dom";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";

type TourSlugRouteParams = {
  slug: string;
};

const AdminTourCalendar = () => {
  const dispatch: AppDispatch = useDispatch();
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;

  useEffect(() => {
    if (tour) return;
    dispatch(fetchTourAsync(slug));
  }, [slug]);

  return (
    <AdminTourCalendarContainer>
      {isLoading ? (
        <AdminTourCalendarSpinner>
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        </AdminTourCalendarSpinner>
      ) : (
        <>
          <AdminTourCalendarTitle>
            <Title titleType={TITLE_TYPE_CLASSES.section}>
              {tour?.name} - Calendar
            </Title>
          </AdminTourCalendarTitle>
          <AdminBookingsCalendarContainer>
            <AdminBookingsCalendar />
          </AdminBookingsCalendarContainer>
        </>
      )}
    </AdminTourCalendarContainer>
  );
};

export default AdminTourCalendar;
