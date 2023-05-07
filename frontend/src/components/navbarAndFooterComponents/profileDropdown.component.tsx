import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon, {
  PROFILE_ICON_TYPE_CLASSES,
} from "../UIComponents/profileIcon/profileIcon.component";
import {
  ProfileDropdownContainer,
  ProfileDropdownDivElement,
  ProfileDropdownElement,
  ProfileDropdownLine,
  ProfileDropdownText,
} from "./profileDropdown.style";

type ProfileDropdownProps = {
  onLogout: () => void;
};

const ProfileDropdown: FC<ProfileDropdownProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    onLogout();
    navigate("/profile/logout");
  };

  return (
    <ProfileDropdownContainer>
      <ProfileDropdownElement to="/profile/bookings">
        <ProfileIcon iconType={PROFILE_ICON_TYPE_CLASSES.bookingsOrange} />
        <ProfileDropdownText>My Bookings</ProfileDropdownText>
      </ProfileDropdownElement>
      <ProfileDropdownLine />
      <ProfileDropdownElement to="/profile/reviews">
        <ProfileIcon iconType={PROFILE_ICON_TYPE_CLASSES.reviewsOrange} />
        <ProfileDropdownText>My Reviews</ProfileDropdownText>
      </ProfileDropdownElement>
      <ProfileDropdownLine />
      <ProfileDropdownElement to="/profile/settings">
        <ProfileIcon iconType={PROFILE_ICON_TYPE_CLASSES.settingsOrange} />
        <ProfileDropdownText>Settings</ProfileDropdownText>
      </ProfileDropdownElement>
      <ProfileDropdownLine />
      <ProfileDropdownDivElement
        onClick={() => {
          handleLogout();
        }}>
        <ProfileIcon iconType={PROFILE_ICON_TYPE_CLASSES.logoutOrange} />
        <ProfileDropdownText>Logout</ProfileDropdownText>
      </ProfileDropdownDivElement>
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;
