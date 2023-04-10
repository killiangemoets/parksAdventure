import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authentication-requests";
import { AppDispatch } from "../../store/store";
import { removeUser } from "../../store/user/user.action";
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
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === "success") {
      dispatch(removeUser());
      onLogout();
      return navigate("/");
    }
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
        }}
      >
        <ProfileIcon iconType={PROFILE_ICON_TYPE_CLASSES.logoutOrange} />
        <ProfileDropdownText>Logout</ProfileDropdownText>
      </ProfileDropdownDivElement>
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;
