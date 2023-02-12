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

const BookingCard = () => {
  return (
    <BookingCardContainer>
      <BookingPictureAndInfos>
        <BookingPicture>
          <img src="../images/canadianRockies.jpg" alt="canadian rockies" />
        </BookingPicture>
        <BookingInfos>
          <BookingTitle>The Forest Hiker</BookingTitle>
          <BookingConfirmation>
            <ConfirmationIcon />
            <ConfirmationText>Confirmed Reservation</ConfirmationText>
          </BookingConfirmation>
          <BookingText>
            Reference number: <span>GYGVN4YAHD56K</span> | PIN:{" "}
            <span>abKmk=Sd</span>
          </BookingText>
          <BookingText>From June 30, 2022 to July 4, 2022</BookingText>
          <BookingText>2 Adults and 2 Children (-12 years) </BookingText>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
            See reservation details
          </Button>
        </BookingInfos>
      </BookingPictureAndInfos>

      <BookingReviewButton>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Give a review</Button>
      </BookingReviewButton>
    </BookingCardContainer>
  );
};

export default BookingCard;
