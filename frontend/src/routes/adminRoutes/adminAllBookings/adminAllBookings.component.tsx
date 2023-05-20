import { useEffect, useState } from "react";
import BookingCard from "../../../components/UIComponents/bookingCard/bookingCard.component";
import AllBookingsNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allBookingsNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { TBooking } from "../../../types/booking";
import { getAllBookings } from "../../../api/booking-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { getAllTourNames } from "../../../api/tour-requests";
import { getAllUserNames } from "../../../api/user-requests";
import { UserNameData } from "../../../types/user";
import { TourNameData } from "../../../types/tour";
import { useSearchParams } from "react-router-dom";
import useHitBottomPagination from "../../../hooks/useBottomPagination";

const AdminAllBookings = () => {
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tourNames, setTourNames] = useState<TourNameData[]>([]);
  const [userNames, setUserNames] = useState<UserNameData[]>([]);

  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const currentPage = useHitBottomPagination(numberOfPages);

  useEffect(() => {
    const handleGetBookings = async () => {
      setIsLoading(true);
      const requestStringFromUrl = window.location.href.split("?")[1];
      const pageRequest = currentPage > 1 ? `&page=${currentPage}` : "";

      let requestString = `?limit=${process.env.REACT_APP_BOOKINGS_PER_PAGE}${pageRequest}`;
      if (requestStringFromUrl) requestString += `&${requestStringFromUrl}`;

      const response = await getAllBookings(requestString);
      if (response.status === "success") {
        if (response.totalResults === 0) setErrorMessage("No results!");
        else setErrorMessage(undefined);

        if (currentPage > 1)
          setBookings((bookings) => [...bookings, ...response.data.data]);
        else setBookings(response.data.data);

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
    handleGetBookings();
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

  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Bookings</AdminSectionTitle>
        <AllBookingsNavbar tourNames={tourNames} userNames={userNames} />
      </AdminFixHeader>
      <AdminContent>
        {errorMessage && (
          <AdminContentErrorMessage>{errorMessage}</AdminContentErrorMessage>
        )}
        {bookings.map((booking, i) => (
          <BookingCard
            key={i}
            booking={booking}
            allowReview={false}
            showUserInfo={true}
          />
        ))}
        {isLoading && (
          <AdminContentSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminContentSpinner>
        )}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllBookings;
