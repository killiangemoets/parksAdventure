import { FC } from "react";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../profilePicture/profilePicture.component";
import {
  ReviewProfileContainer,
  ReviewProfileName,
} from "./reviewProfile.style";
import { Link } from "react-router-dom";

type ReviewProfileProps = {
  userImg?: string;
  userName: string;
  link?: string;
  pictureSize?: PROFILE_PICTURE_SIZE_CLASSES;
};

const ReviewProfile: FC<ReviewProfileProps> = ({
  userImg,
  userName,
  link,
  pictureSize,
}) => {
  return (
    <Link to={link || ""}>
      <ReviewProfileContainer link={Boolean(link)}>
        <ProfilePicture
          pictureSize={pictureSize || PROFILE_PICTURE_SIZE_CLASSES.small}
          pictureUrl={userImg}
        />
        <ReviewProfileName>{userName}</ReviewProfileName>
      </ReviewProfileContainer>
    </Link>
  );
};

export default ReviewProfile;
