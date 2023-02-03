import InfoIcon, {
  ICON_TYPE_CLASSES,
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
} from "./reservationInfoSection.style";

const ReservationInfoSection = () => {
  return (
    <ReservationInfoSectionContainer>
      <ReservationInfoSectionWrapper>
        {/* <Title titleType={TITLE_TYPE_CLASSES.section}>
          Reservation Information
        </Title> */}
        {/* <InfosContainer> */}
        <InfoContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            Practical Information
          </Title>
          {/* <InfoSectionTitle>General Information</InfoSectionTitle> */}
          <Info>
            <InfoIcon iconType={ICON_TYPE_CLASSES.date} />
            <InfoTitle>Date</InfoTitle>
            <InfoContent>From June 30, 2022 to July 4, 2022</InfoContent>
          </Info>
          <Info>
            <InfoIcon iconType={ICON_TYPE_CLASSES.time} />
            <InfoTitle>Starting Time</InfoTitle>
            <InfoContent>
              June 30 at <span>9.00 am</span>
            </InfoContent>
          </Info>
          <Info>
            <InfoIcon iconType={ICON_TYPE_CLASSES.location} />
            <InfoTitle>Address</InfoTitle>
            <InfoLink>Wallstreet 24, 13650 FL, United States</InfoLink>
          </Info>
        </InfoContainer>
        <InfoContainer>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Your Reservation</Title>
          {/* <InfoSectionTitle>Your Reservation</InfoSectionTitle> */}
          <Info>
            <ReservationInfoTitle>Reservation Reference</ReservationInfoTitle>
            <InfoContent>GYG32NV8RZG7</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>PIN</ReservationInfoTitle>
            <InfoContent>ykEYmg+&</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Hiker</ReservationInfoTitle>
            <InfoContent>Lucas Scott</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Number of hikers</ReservationInfoTitle>
            <InfoContent>4 Adults and 2 Children (-12 years)</InfoContent>
          </Info>
          <Info>
            <ReservationInfoTitle>Price</ReservationInfoTitle>
            <InfoContent>489.90€</InfoContent>
          </Info>
        </InfoContainer>
        {/* </InfosContainer> */}
      </ReservationInfoSectionWrapper>
    </ReservationInfoSectionContainer>
  );
};

export default ReservationInfoSection;
