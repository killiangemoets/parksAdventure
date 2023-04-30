import { useEffect, useState } from "react";
import BookingCard from "../../components/UIComponents/bookingCard/bookingCard.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import {
  BookingCards,
  Reservations,
  UserBookingsContainer,
  UserBookingsErrorMessage,
  UserBookingsSpinner,
} from "./userBookings.style";
import { TBooking } from "../../types/booking";
import { getMyBookings } from "../../api/booking-requests";
import Spinner, { SPINNER_TYPE_CLASSES } from "../../components/UIComponents/spinner/spinner.component";

const UserBookings = () => {
  const [comingBookings, setComingBookings] = useState<TBooking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<TBooking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetBookings = async () => {
      setIsLoading(true);
      const response = await getMyBookings();
      if(response.status === "success") {
        const newComingBookings: TBooking[] = [];
        const newPrevisouBookings: TBooking[] = [];

        response.data.data.forEach((booking: TBooking) => {
          if(new Date(booking.date) > new Date(Date.now())) newComingBookings.push(booking);
          else newPrevisouBookings.push(booking);
        })

        setComingBookings(newComingBookings);
        setPreviousBookings(newPrevisouBookings);

      } else {
        setErrorMessage('An error occured. Try to reload the page!')
      }
      setIsLoading(false);
    };
    handleGetBookings();
  }, [])

  return (
    <UserBookingsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Bookings</Title>
      {isLoading &&
          <UserBookingsSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </UserBookingsSpinner>
      } 
      {errorMessage && <UserBookingsErrorMessage>{errorMessage}</UserBookingsErrorMessage>}
      {comingBookings.length > 0 && 
      <Reservations>
        <Title titleType={TITLE_TYPE_CLASSES.third}>Coming Reservations</Title>
        <BookingCards>
          {comingBookings.map((booking,i) => <BookingCard key={i} booking={booking} allowReview={false} />)}
        </BookingCards>
      </Reservations>}
      {previousBookings.length > 0 && 
      <Reservations>
        <Title titleType={TITLE_TYPE_CLASSES.third}>
          Previous Reservations
        </Title>
        <BookingCards>
        <BookingCards>
          {previousBookings.map((booking,i) => <BookingCard key={i} booking={booking} />)}
        </BookingCards>
        </BookingCards>
      </Reservations>}
    </UserBookingsContainer>
  );
};

export default UserBookings;
