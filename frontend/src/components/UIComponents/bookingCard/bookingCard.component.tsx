import { useNavigate } from "react-router-dom";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  BookingCardContainer,
  BookingConfirmation,
  BookingInfos,
  BookingPicture,
  BookingPictureAndInfos,
  BookingReviewButton,
  BookingReviewUserInfo,
  BookingText,
  BookingTitle,
  ConfirmationIcon,
  ConfirmationText,
} from "./bookingCard.style";
import { TBooking } from "../../../types/booking";
import { FC, useState } from "react";
import { niceDatesRange } from "../../../utils/formatting/formatDates";
import niceGroupDetailsString from "../../../utils/formatting/formatGroup";
import CreateReviewModal from "../createReviewModal/createReviewModal.component";
import getEndDate from "../../../utils/dataManipulation/getEndDate";
import ReviewProfile from "../reviewProfile/reviewProfile.component";

type BookingCardProps = {
  booking: TBooking;
  allowReview?: boolean;
  showUserInfo?: boolean;
};

const BookingCard: FC<BookingCardProps> = ({
  booking,
  allowReview = true,
  showUserInfo = false,
}) => {
  const navigate = useNavigate();

  const endDate = getEndDate(booking.date, booking.tour?.duration || 0);

  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
  };

  return (
    <BookingCardContainer>
      <BookingPictureAndInfos>
        <BookingPicture>
          <img src={booking.tour?.imageCover} alt="tour illustration" />
        </BookingPicture>
        <BookingInfos>
          <BookingTitle>{booking.tour?.name}</BookingTitle>
          <BookingConfirmation>
            <ConfirmationIcon />
            <ConfirmationText>Confirmed Reservation</ConfirmationText>
          </BookingConfirmation>
          <BookingText>
            Reference number: <span>{booking.orderNumber}</span> | PIN:{" "}
            <span>{booking.pin}</span>
          </BookingText>
          <BookingText>{niceDatesRange(booking.date, endDate)}</BookingText>
          <BookingText>
            {niceGroupDetailsString(booking.adults || 0, booking.kids || 0)}
          </BookingText>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => {
              navigate(`/profile/bookings/details/${booking._id}`);
            }}>
            See reservation details
          </Button>
        </BookingInfos>
      </BookingPictureAndInfos>
      {allowReview && (
        <BookingReviewButton>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={() => {
              setReviewModalOpen(true);
            }}>
            Give a review
          </Button>
        </BookingReviewButton>
      )}
      {showUserInfo && (
        <BookingReviewUserInfo>
          <ReviewProfile
            userName={`${booking.user.firstname} ${booking.user.lastname}`}
            userImg={booking.user.photo}
          />
        </BookingReviewUserInfo>
      )}
      <CreateReviewModal
        tourId={booking.tour?._id}
        tourImg={booking.tour?.imageCover}
        tourName={booking.tour?.name}
        tourLink={`/tour/${booking.tour?.slug}`}
        open={reviewModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </BookingCardContainer>
  );
};

export default BookingCard;
