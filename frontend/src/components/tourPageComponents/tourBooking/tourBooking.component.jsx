import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import ProfilePicture, {
  PROFILE_PICTURE_TYPE_CLASSES,
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

const TourBooking = ({ forwardRef }) => {
  return (
    <TourBookingContainer ref={forwardRef}>
      <TourBookingBox>
        <Titles>
          <Title titleType={TITLE_TYPE_CLASSES.section}>
            What Are You Waiting For?
          </Title>
          <SecondTitle>
            7 days. 1 adventure. Infinite Memories. Make it yours today!
          </SecondTitle>
        </Titles>
        <TourBookingInputs />
        <TourBookingPictures>
          <Picture1>
            <ProfilePicture
              pictureUrl={"images/desert.jpg"}
              pictureSize={PROFILE_PICTURE_TYPE_CLASSES.extraLarge}
            />
          </Picture1>
          <Picture2>
            <ProfilePicture
              pictureUrl={"images/canadianRockies.jpg"}
              pictureSize={PROFILE_PICTURE_TYPE_CLASSES.extraLarge}
            />
          </Picture2>
          <Picture3>
            <ProfilePicture
              pictureUrl={"images/family.jpg"}
              pictureSize={PROFILE_PICTURE_TYPE_CLASSES.extraLarge}
            />
          </Picture3>
        </TourBookingPictures>
      </TourBookingBox>
    </TourBookingContainer>
  );
};

export default TourBooking;
