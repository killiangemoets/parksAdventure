import { FC } from "react";
import {
  MessagesIcon,
  LogoutIcon,
  BookingsIcon,
  ReviewsIcon,
  WishListIcon,
  SettingsIcon,
} from "./profileIcon.style";

export enum PROFILE_ICON_TYPE_CLASSES {
  settings = "settings",
  bookings = "bookings",
  reviews = "reviews",
  wishList = "wishList",
  messages = "messages",
  logout = "logout",
}

const getIcon = (
  iconType = PROFILE_ICON_TYPE_CLASSES.settings
): typeof SettingsIcon =>
  ({
    [PROFILE_ICON_TYPE_CLASSES.settings]: SettingsIcon,
    [PROFILE_ICON_TYPE_CLASSES.bookings]: BookingsIcon,
    [PROFILE_ICON_TYPE_CLASSES.reviews]: ReviewsIcon,
    [PROFILE_ICON_TYPE_CLASSES.wishList]: WishListIcon,
    [PROFILE_ICON_TYPE_CLASSES.messages]: MessagesIcon,
    [PROFILE_ICON_TYPE_CLASSES.logout]: LogoutIcon,
  }[iconType]);

export type ProfileIconProps = {
  iconType?: PROFILE_ICON_TYPE_CLASSES;
};

const ProfileIcon: FC<ProfileIconProps> = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default ProfileIcon;
