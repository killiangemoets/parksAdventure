import {
  ExtraLargeProfilePicture,
  LargeProfilePicture,
  MediumProfilePicture,
  SmallProfilePicture,
} from "./profilePicture.style";

export const PROFILE_PICTURE_TYPE_CLASSES = {
  small: "small",
  medium: "medium",
  large: "large",
  extraLarge: "extra large",
};

const getProfilePicture = (pictureSize = PROFILE_PICTURE_TYPE_CLASSES.medium) =>
  ({
    [PROFILE_PICTURE_TYPE_CLASSES.small]: SmallProfilePicture,
    [PROFILE_PICTURE_TYPE_CLASSES.medium]: MediumProfilePicture,
    [PROFILE_PICTURE_TYPE_CLASSES.large]: LargeProfilePicture,
    [PROFILE_PICTURE_TYPE_CLASSES.extraLarge]: ExtraLargeProfilePicture,
  }[pictureSize]);

const ProfilePicture = ({ pictureUrl, pictureSize }) => {
  const CustomProfilePicture = getProfilePicture(pictureSize);
  return (
    <CustomProfilePicture>
      {pictureUrl && <img src={pictureUrl} alt="profile" />}
    </CustomProfilePicture>
  );
};

export default ProfilePicture;
