import ProfilePicture from "../../UIComponents/userPicture/userPicture.component";
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
        <ProfilePicture pictureUrl={pictureUrl} />
        <TourGuideType>{position}</TourGuideType>
      </TourGuideInfos>
      <TourGuideName>{name}</TourGuideName>
    </TourGuideContainer>
  );
};

export default TourGuide;
