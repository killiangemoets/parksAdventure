import { useSelector } from "react-redux";
import InfoIcon, {
  INFO_ICON_TYPE_CLASSES,
} from "../../UIComponents/infoIcon/infoIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  Info,
  InfoContainer,
  InfoContent,
  InfoLink,
  InfoTitle,
  ReservationInfoSectionContainer,
  ReservationInfoTitle,
  ReservationInfoSectionWrapper,
  InfoBlockContent,
  InfoHeader,
} from "./reservationInfoSection.style";
import {
  selectBookingDetails,
  selectTourAdditionalInfo,
  selectTourAvailabilities,
  selectTourIsLoading,
  selectTourMeetingAddress,
} from "../../../store/tour/tour.selector";
import { useEffect, useState } from "react";
import {
  niceDatesRange,
  niceMonth,
  niceTime,
} from "../../../utils/formatting/formatDates";
import compareDates from "../../../utils/comparison/compareDates";
import niceGroupDetailsString from "../../../utils/formatting/formatGroup";
import getEndDate from "../../../utils/dataManipulation/getEndDate";

const ReservationInfoSection = () => {
  const bookingDetails = useSelector(selectBookingDetails);
  const availabilities = useSelector(selectTourAvailabilities);
  const address = useSelector(selectTourMeetingAddress);
  const additionalInfo = useSelector(selectTourAdditionalInfo);
  const isLoading = useSelector(selectTourIsLoading);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!bookingDetails) return;
    const newEndDate = getEndDate(
      bookingDetails.date,
      bookingDetails.tour.duration
    );
    setEndDate(newEndDate);
  }, [bookingDetails]);

  useEffect(() => {
    if (!bookingDetails || !availabilities) return;
    const selectedAvailability = availabilities.find((availability) =>
      compareDates(availability.date, bookingDetails.date)
    );
    if (selectedAvailability) setTime(selectedAvailability.time);
  }, [bookingDetails, availabilities]);

  return (
    <ReservationInfoSectionContainer>
      <ReservationInfoSectionWrapper>
        <InfoContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            Practical Information
          </Title>

          <Info>
            <InfoHeader>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.date} />
              <InfoTitle>Date</InfoTitle>
            </InfoHeader>
            <InfoContent>
              {!isLoading && endDate && bookingDetails
                ? niceDatesRange(bookingDetails.date, endDate)
                : ""}
            </InfoContent>
          </Info>
          <Info>
            <InfoHeader>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.time} />
              <InfoTitle>Starting Time</InfoTitle>
            </InfoHeader>
            <InfoContent>
              {!isLoading &&
                bookingDetails &&
                `${niceMonth(bookingDetails.date)} ${new Date(
                  bookingDetails.date
                ).getDate()} at `}{" "}
              <span>{time && niceTime(time)}</span>
            </InfoContent>
          </Info>
          <Info>
            <InfoHeader>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.location} />
              <InfoTitle>Address</InfoTitle>
            </InfoHeader>
            <InfoLink to="https://www.google.com">
              {!isLoading && address}
            </InfoLink>
          </Info>
          <Info>
            <InfoHeader>
              <InfoIcon iconType={INFO_ICON_TYPE_CLASSES.list} />
              <InfoTitle>Additional Info</InfoTitle>
            </InfoHeader>
            <InfoBlockContent>
              {!isLoading ? (
                additionalInfo && additionalInfo?.length > 0 ? (
                  additionalInfo.map((info) => (
                    <InfoContent>{info}</InfoContent>
                  ))
                ) : (
                  <InfoContent>/</InfoContent>
                )
              ) : (
                ""
              )}
            </InfoBlockContent>
          </Info>
        </InfoContainer>
        <InfoContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Your Reservation</Title>
          <Info>
            <ReservationInfoTitle>Reservation Reference</ReservationInfoTitle>
            <InfoContent>{bookingDetails?.orderNumber}</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>PIN</ReservationInfoTitle>
            <InfoContent>{bookingDetails?.pin}</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Hiker</ReservationInfoTitle>
            <InfoContent>
              {!isLoading &&
                (bookingDetails?.user?.firstname
                  ? `${bookingDetails?.user?.firstname} ${bookingDetails?.user?.lastname}`
                  : "deleted user")}
            </InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Number of hikers</ReservationInfoTitle>
            <InfoContent>
              {!isLoading &&
                niceGroupDetailsString(
                  bookingDetails?.adults || 0,
                  bookingDetails?.kids || 0
                )}
            </InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Price</ReservationInfoTitle>
            <InfoContent>
              {!isLoading && `$${bookingDetails?.price}`}
            </InfoContent>
          </Info>
        </InfoContainer>
      </ReservationInfoSectionWrapper>
    </ReservationInfoSectionContainer>
  );
};

export default ReservationInfoSection;
