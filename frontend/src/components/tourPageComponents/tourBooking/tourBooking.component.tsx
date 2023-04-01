import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  Picture1,
  Picture2,
  Picture3,
  SecondTitle,
  Titles,
  TourBookingBox,
  TourBookingContainer,
  TourBookingPictures,
} from "./tourBooking.style";

import TourBookingInputs from "./tourBookingInputs.component";
import { FC } from "react";
import desertImg from "../../../assets/bookingImg/desert.jpg";
import canadianRockiesImg from "../../../assets/bookingImg/canadianRockies.jpg";
import familyImg from "../../../assets/bookingImg/family.jpg";
import { useSelector } from "react-redux";
import {
  selectTour,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";

export type TourBookingProps = {
  forwardRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const TourBooking: FC<TourBookingProps> = ({ forwardRef }) => {
  const tour = useSelector(selectTour);
  const isLoading = useSelector(selectTourIsLoading);

  return (
    <TourBookingContainer ref={forwardRef}>
      {!isLoading && (
        <TourBookingBox>
          <Titles>
            <Title titleType={TITLE_TYPE_CLASSES.section}>
              What Are You Waiting For?
            </Title>
            <SecondTitle>
              {tour?.duration && tour.duration > 1
                ? `${tour?.duration} days.`
                : `${tour?.duration} day.`}{" "}
              1 adventure. Infinite Memories. Make it yours today!`
            </SecondTitle>
          </Titles>
          <TourBookingInputs />
          <TourBookingPictures>
            <Picture1>
              <ProfilePicture
                pictureUrl={tour?.imageCover || desertImg}
                pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
              />
            </Picture1>
            <Picture2>
              <ProfilePicture
                pictureUrl={
                  tour?.images && tour?.images[0]
                    ? tour?.images[0]
                    : canadianRockiesImg
                }
                pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
              />
            </Picture2>
            <Picture3>
              <ProfilePicture
                pictureUrl={
                  tour?.images && tour?.images[1] ? tour?.images[1] : familyImg
                }
                pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
              />
            </Picture3>
          </TourBookingPictures>
        </TourBookingBox>
      )}
    </TourBookingContainer>
  );
};

export default TourBooking;
