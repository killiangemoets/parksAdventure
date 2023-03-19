import { FC } from "react";
import {
  ExtraLargeProfilePicture,
  LargeProfilePicture,
  MediumProfilePicture,
  SmallProfilePicture,
} from "./profilePicture.style";

import defaultUserImg from "../../../assets/default-user.jpg";

export enum PROFILE_PICTURE_SIZE_CLASSES {
  small = "small",
  medium = "medium",
  large = "large",
  extraLarge = "extra large",
}

const getProfilePicture = (
  pictureSize = PROFILE_PICTURE_SIZE_CLASSES.medium
): typeof MediumProfilePicture =>
  ({
    [PROFILE_PICTURE_SIZE_CLASSES.small]: SmallProfilePicture,
    [PROFILE_PICTURE_SIZE_CLASSES.medium]: MediumProfilePicture,
    [PROFILE_PICTURE_SIZE_CLASSES.large]: LargeProfilePicture,
    [PROFILE_PICTURE_SIZE_CLASSES.extraLarge]: ExtraLargeProfilePicture,
  }[pictureSize]);

export type ProfilePictureProps = {
  pictureUrl?: string;
  pictureSize?: PROFILE_PICTURE_SIZE_CLASSES;
};
const ProfilePicture: FC<ProfilePictureProps> = ({
  pictureUrl,
  pictureSize,
}) => {
  const CustomProfilePicture = getProfilePicture(pictureSize);
  return (
    <CustomProfilePicture>
      <img src={pictureUrl || defaultUserImg} alt="profile" />
    </CustomProfilePicture>
  );
};

export default ProfilePicture;
