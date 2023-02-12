import BookingCard from "../../components/UIComponents/bookingCard/bookingCard.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import {
  BookingCards,
  Reservations,
  UserBookingsContainer,
} from "./userBookings.style";

const UserBookings = () => {
  return (
    <UserBookingsContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Bookings</Title>
      <Reservations>
        <Title titleType={TITLE_TYPE_CLASSES.third}>Coming Reservations</Title>
        <BookingCards>
          <BookingCard />
        </BookingCards>
      </Reservations>
      <Reservations>
        <Title titleType={TITLE_TYPE_CLASSES.third}>
          Previous Reservations
        </Title>
        <BookingCards>
          <BookingCard />
          <BookingCard />
        </BookingCards>
      </Reservations>
    </UserBookingsContainer>
  );
};

export default UserBookings;
