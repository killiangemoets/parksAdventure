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
import { UserBookingsSpinner } from "../../userRoutes/userBookings/userBookings.style";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";

const AdminAllBookings = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetBookings = async () => {
      setIsLoading(true);
      const response = await getAllBookings();
      console.log(response);
      if (response.status === "success") {
        setBookings(response.data.data);
        setErrorMessage(undefined);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetBookings();
  }, []);
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Bookings</AdminSectionTitle>
        <AllBookingsNavbar />
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
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            allowReview={false}
            showUserInfo={true}
          />
        ))}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllBookings;
