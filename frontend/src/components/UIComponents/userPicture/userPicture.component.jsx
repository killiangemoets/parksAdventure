import { ProfilePictureContainer } from "./userPicture.style";

const ProfilePicture = ({ pictureUrl }) => {
  return (
    <ProfilePictureContainer>
      {pictureUrl && <img src={pictureUrl} alt="profile" />}
    </ProfilePictureContainer>
  );
};

export default ProfilePicture;
