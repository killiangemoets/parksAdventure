import { useNavigate } from "react-router-dom";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  BookingCardContainer,
  BookingConfirmation,
  BookingInfos,
  BookingPicture,
  BookingPictureAndInfos,
  BookingReviewButton,
  BookingText,
  BookingTitle,
  ConfirmationIcon,
  ConfirmationText,
} from "./bookingCard.style";
import { TBooking } from "../../../types/booking";
import { FC } from "react";
import { niceDatesRange } from "../../../utils/formatting/formatDates";
import niceGroupDetailsString from "../../../utils/formatting/formatGroup";


type BookingCardProps = {
  booking: TBooking;
  allowReview?: boolean;
}

const BookingCard: FC<BookingCardProps> = ({booking, allowReview = true}) => {
  const navigate = useNavigate();
  let endDate = new Date(booking.date);
  endDate.setDate(new Date(booking.date).getDate() + booking.tour.duration);

  return (
    <BookingCardContainer>
      <BookingPictureAndInfos>
        <BookingPicture>
          <img src={booking.tour.imageCover} alt="tour illustration" />
        </BookingPicture>
        <BookingInfos>
          <BookingTitle>{booking.tour.name}</BookingTitle>
          <BookingConfirmation>
            <ConfirmationIcon />
            <ConfirmationText>Confirmed Reservation</ConfirmationText>
          </BookingConfirmation>
          <BookingText>
            Reference number: <span>{booking.orderNumber}</span> | PIN:{" "}
            <span>{booking.pin}</span>
          </BookingText>
          <BookingText>{niceDatesRange(booking.date, endDate)}</BookingText>
          <BookingText>{niceGroupDetailsString(booking.adults  || 0, booking.kids  ||  0)}</BookingText>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty} onClick={() => {navigate(`/profile/bookings/details/${booking._id}`)}}>
            See reservation details
          </Button>
        </BookingInfos>
      </BookingPictureAndInfos>
      {allowReview &&
        <BookingReviewButton>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Give a review</Button>
        </BookingReviewButton>
      }
    </BookingCardContainer>
  );
};

export default BookingCard;
