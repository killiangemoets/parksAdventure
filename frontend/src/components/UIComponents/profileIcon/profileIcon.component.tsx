import { FC } from "react";
import {
  MessagesIcon,
  LogoutIcon,
  BookingsIcon,
  ReviewsIcon,
  WishListIcon,
  SettingsIcon,
  PlusIcon,
  SettingsOrangeIcon,
  BookingsOrangeIcon,
  ReviewsOrangeIcon,
  LogoutOrangeIcon,
  DashboardIcon,
  ToursIcon,
  UsersIcon,
  TourGuidesIcon,
  DashboardOrangeIcon,
  ToursOrangeIcon,
} from "./profileIcon.style";

export enum PROFILE_ICON_TYPE_CLASSES {
  settings = "settings",
  bookings = "bookings",
  reviews = "reviews",
  wishList = "wishList",
  messages = "messages",
  logout = "logout",
  addTour = "add tour",
  dashboard = "dashboard",
  tours = "tours",
  users = "users",
  tourGuides = "tour guides",
  settingsOrange = "settingsOrange",
  bookingsOrange = "bookingsOrange",
  reviewsOrange = "reviewsOrange",
  logoutOrange = "logoutOrange",
  dashboardOrange = "dashboardOrange",
  tourOrange = "tourOrange",
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
    [PROFILE_ICON_TYPE_CLASSES.addTour]: PlusIcon,
    [PROFILE_ICON_TYPE_CLASSES.dashboard]: DashboardIcon,
    [PROFILE_ICON_TYPE_CLASSES.tours]: ToursIcon,
    [PROFILE_ICON_TYPE_CLASSES.users]: UsersIcon,
    [PROFILE_ICON_TYPE_CLASSES.tourGuides]: TourGuidesIcon,
    [PROFILE_ICON_TYPE_CLASSES.settingsOrange]: SettingsOrangeIcon,
    [PROFILE_ICON_TYPE_CLASSES.bookingsOrange]: BookingsOrangeIcon,
    [PROFILE_ICON_TYPE_CLASSES.reviewsOrange]: ReviewsOrangeIcon,
    [PROFILE_ICON_TYPE_CLASSES.logoutOrange]: LogoutOrangeIcon,
    [PROFILE_ICON_TYPE_CLASSES.dashboardOrange]: DashboardOrangeIcon,
    [PROFILE_ICON_TYPE_CLASSES.tourOrange]: ToursOrangeIcon,
  }[iconType]);

export type ProfileIconProps = {
  iconType?: PROFILE_ICON_TYPE_CLASSES;
};

const ProfileIcon: FC<ProfileIconProps> = ({ iconType }) => {
  const CustomIcon = getIcon(iconType);
  return <CustomIcon />;
};

export default ProfileIcon;
