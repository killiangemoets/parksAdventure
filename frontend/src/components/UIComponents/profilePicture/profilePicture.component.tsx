import { FC, useState } from "react";
import {
  DeleteButtonWrapper,
  ExtraLargeProfilePicture,
  LargeProfilePicture,
  MediumProfilePicture,
  SmallProfilePicture,
  TrashIcon,
} from "./profilePicture.style";

import defaultUserImg from "../../../assets/default-user.jpg";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

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
  handleDelete?: () => void;
};
const ProfilePicture: FC<ProfilePictureProps> = ({
  pictureUrl,
  pictureSize,
  handleDelete,
}) => {
  const CustomProfilePicture = getProfilePicture(pictureSize);
  const [mouseOver, setMouseover] = useState<boolean>(false);
  return (
    <CustomProfilePicture
      onMouseEnter={() => {
        setMouseover(true);
      }}
      onMouseLeave={() => {
        setMouseover(false);
      }}>
      <img src={pictureUrl || defaultUserImg} alt="profile" />
      {handleDelete && pictureUrl && mouseOver && (
        <DeleteButtonWrapper>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            type="button"
            onClick={handleDelete}>
            <TrashIcon />
          </Button>
        </DeleteButtonWrapper>
      )}
    </CustomProfilePicture>
  );
};

export default ProfilePicture;
