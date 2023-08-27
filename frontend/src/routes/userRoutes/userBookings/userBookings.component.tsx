import { useEffect, useState } from "react";
import BookingCard from "../../../components/UIComponents/bookingCard/bookingCard.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import {
  BookingCards,
  Reservations,
  UserBookingsContainer,
  UserBookingsErrorMessage,
  UserBookingsSpinner,
} from "./userBookings.style";
import { TBooking } from "../../../types/booking";
import { getMyBookings } from "../../../api/booking-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import getEndDate from "../../../utils/dataManipulation/getEndDate";

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
      if (response && response.status === "success") {
        const newComingBookings: TBooking[] = [];
        const newPrevisouBookings: TBooking[] = [];

        response.data.data.forEach((booking: TBooking) => {
          if (
            getEndDate(booking.date, booking.tour?.duration) >
            new Date(Date.now())
          )
            newComingBookings.push(booking);
          else newPrevisouBookings.push(booking);
        });

        setComingBookings(newComingBookings);
        setPreviousBookings(newPrevisouBookings);
        setErrorMessage(undefined);
      } else {
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
      }
      setIsLoading(false);
    };
    handleGetBookings();
  }, []);

  return (
    <UserBookingsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Bookings</Title>
      {isLoading && (
        <UserBookingsSpinner>
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
        </UserBookingsSpinner>
      )}
      {errorMessage && (
        <UserBookingsErrorMessage>{errorMessage}</UserBookingsErrorMessage>
      )}
      {!errorMessage &&
        comingBookings.length === 0 &&
        previousBookings.length === 0 && (
          <UserBookingsErrorMessage>No Bookings</UserBookingsErrorMessage>
        )}
      {comingBookings.length > 0 && (
        <Reservations>
          <Title titleType={TITLE_TYPE_CLASSES.third}>
            Coming Reservations
          </Title>
          <BookingCards>
            {comingBookings.map((booking, i) => (
              <BookingCard key={i} booking={booking} allowReview={false} />
            ))}
          </BookingCards>
        </Reservations>
      )}
      {previousBookings.length > 0 && (
        <Reservations>
          <Title titleType={TITLE_TYPE_CLASSES.third}>
            Previous Reservations
          </Title>
          <BookingCards>
            <BookingCards>
              {previousBookings.map((booking, i) => (
                <BookingCard key={i} booking={booking} />
              ))}
            </BookingCards>
          </BookingCards>
        </Reservations>
      )}
    </UserBookingsContainer>
  );
};

export default UserBookings;
