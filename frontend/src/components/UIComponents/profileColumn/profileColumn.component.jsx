import ProfileIcon, {
  PROFILE_ICON_TYPE_CLASSES,
} from "../profileIcon/profileIcon.component";
import {
  ProfileColumnContainer,
  ProfileSectionContainer,
  ProfileSectionLabel,
} from "./profileColumns.style";

const ProfileSection = ({ iconType, label }) => {
  return (
    <ProfileSectionContainer>
      <ProfileIcon iconType={iconType} />
      <ProfileSectionLabel>{label}</ProfileSectionLabel>
    </ProfileSectionContainer>
  );
};

const ProfileColumn = () => {
  const profileSections = [
    { iconType: PROFILE_ICON_TYPE_CLASSES.settings, label: "settings" },
    { iconType: PROFILE_ICON_TYPE_CLASSES.bookings, label: "my bookings" },
    { iconType: PROFILE_ICON_TYPE_CLASSES.reviews, label: "my reviews" },
    { iconType: PROFILE_ICON_TYPE_CLASSES.wishList, label: "my wishlist" },
    { iconType: PROFILE_ICON_TYPE_CLASSES.messages, label: "my messages" },
    { iconType: PROFILE_ICON_TYPE_CLASSES.logout, label: " logout" },
  ];
  return (
    <ProfileColumnContainer>
      {profileSections.map((profileSection) => (
        <ProfileSection
          iconType={profileSection.iconType}
          label={profileSection.label}
          key={profileSection.label}
        />
      ))}
    </ProfileColumnContainer>
  );
};

export default ProfileColumn;
