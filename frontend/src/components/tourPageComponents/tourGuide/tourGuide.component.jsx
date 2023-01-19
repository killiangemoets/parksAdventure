import ProfilePicture, {
  PROFILE_PICTURE_TYPE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  TourGuideContainer,
  TourGuideInfos,
  TourGuideName,
  TourGuideType,
} from "./tourGuide.style";

const TourGuide = ({ pictureUrl, position, name }) => {
  return (
    <TourGuideContainer>
      <TourGuideInfos>
        <ProfilePicture
          pictureUrl={pictureUrl}
          pictureSize={PROFILE_PICTURE_TYPE_CLASSES.small}
        />
        <TourGuideType>{position}</TourGuideType>
      </TourGuideInfos>
      <TourGuideName>{name}</TourGuideName>
    </TourGuideContainer>
  );
};

export default TourGuide;
