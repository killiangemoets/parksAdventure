import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import AdminTourCalendarElement from "../../../components/adminsProfilePagesComponents/adminTourCalendarElement/adminTourCalendarElement.component";
import {
  AdminBookingsCalendarContainer,
  AdminTourCalendarContainer,
  AdminTourCalendarSpinner,
  AdminTourCalendarTitle,
  ErrorMessage,
} from "./adminTourCalendar.style";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { getTourCalendar } from "../../../api/tour-requests";
import { TAvailability } from "../../../types/tour";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { fetchTourAsync } from "../../../store/tour/tour.action";

type TourSlugRouteParams = {
  slug: string;
};

const AdminTourCalendar = () => {
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tourName, setTourName] = useState<string>("");
  const [tourId, setTourId] = useState<string>("");
  const [tourCalendar, setTourCalendar] = useState<TAvailability[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadTourCalendar = async () => {
      if (!slug) return;
      setIsLoading(true);
      const response = await getTourCalendar(slug);
      if (response && response.status === "success") {
        setTourName(response.data.name);
        setTourCalendar(response.data.availabilities);
        setTourId(response.data.tourId);
        setErrorMessage("");
      } else if (
        response &&
        response.message.includes("No tour found with that slug")
      )
        setErrorMessage("No tour found with that name!");
      else setErrorMessage("Something went wrong. Please try again!");

      setIsLoading(false);
    };
    loadTourCalendar();
  }, [slug]);

  useEffect(() => {
    dispatch(fetchTourAsync(slug));
  }, [dispatch, slug]);

  return (
    <AdminTourCalendarContainer>
      {isLoading && (
        <AdminTourCalendarSpinner>
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        </AdminTourCalendarSpinner>
      )}

      {!isLoading && errorMessage.length === 0 && (
        <>
          <AdminTourCalendarTitle>
            <Title titleType={TITLE_TYPE_CLASSES.section}>
              {tourName} - Calendar
            </Title>
          </AdminTourCalendarTitle>
          <AdminBookingsCalendarContainer>
            <AdminTourCalendarElement
              availabilities={tourCalendar}
              tourId={tourId}
            />
          </AdminBookingsCalendarContainer>
        </>
      )}

      {errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AdminTourCalendarContainer>
  );
};

export default AdminTourCalendar;
