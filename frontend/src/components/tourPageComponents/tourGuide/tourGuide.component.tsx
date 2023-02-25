import { FC } from "react";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  TourGuideContainer,
  TourGuideInfos,
  TourGuideName,
  TourGuideType,
} from "./tourGuide.style";

export type TourGuideProps = {
  pictureUrl?: string;
  position: string;
  name: string;
};

const TourGuide: FC<TourGuideProps> = ({ pictureUrl, position, name }) => {
  return (
    <TourGuideContainer>
      <TourGuideInfos>
        <ProfilePicture
          pictureUrl={pictureUrl}
          pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
        />
        <TourGuideType>{position}</TourGuideType>
      </TourGuideInfos>
      <TourGuideName>{name}</TourGuideName>
    </TourGuideContainer>
  );
};

export default TourGuide;
