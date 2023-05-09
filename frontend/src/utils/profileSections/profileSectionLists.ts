import { PROFILE_ICON_TYPE_CLASSES } from "../../components/UIComponents/profileIcon/profileIcon.component";

export type ProfileSectionElement = {
  iconType: PROFILE_ICON_TYPE_CLASSES;
  label: string;
  link: string;
};

export const userSections: ProfileSectionElement[] = [
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.bookings,
    label: "my bookings",
    link: "/profile/bookings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.reviews,
    label: "my reviews",
    link: "/profile/reviews",
  },
  // {
  //   iconType: PROFILE_ICON_TYPE_CLASSES.messages,
  //   label: "my messages",
  //   link: "/profile/messages",
  // },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.settings,
    label: "settings",
    link: "/profile/settings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.logout,
    label: " logout",
    link: "/profile/logout",
  },
];

export const adminSections: ProfileSectionElement[] = [
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.dashboard,
    label: "dashboard",
    link: "/profile/dashboard",
  },
  // {
  //   iconType: PROFILE_ICON_TYPE_CLASSES.tours,
  //   label: "Tours",
  //   link: "/alltours",
  // },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.bookings,
    label: "Bookings",
    link: "/profile/all-bookings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.reviews,
    label: " Reviews",
    link: "/profile/all-reviews",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.users,
    label: "Users",
    link: "/profile/all-users",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.tourGuides,
    label: "Tour guides",
    link: "/profile/guides",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.addTour,
    label: " add a tour",
    link: "/profile/add-tour",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.settings,
    label: "settings",
    link: "/profile/settings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.logout,
    label: " logout",
    link: "/profile/logout",
  },
];

export const userDropdownSections: ProfileSectionElement[] = [
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.bookingsOrange,
    label: "My Bookings",
    link: "/profile/bookings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.reviewsOrange,
    label: "My Reviews",
    link: "/profile/reviews",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.settingsOrange,
    label: " Settings",
    link: "/profile/settings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.logoutOrange,
    label: " Logout",
    link: "/profile/logout",
  },
];

export const adminDropdownSections: ProfileSectionElement[] = [
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.dashboardOrange,
    label: "Dashboard",
    link: "/profile/dashboard",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.bookingsOrange,
    label: "Bookings",
    link: "/profile/all-bookings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.reviewsOrange,
    label: "Reviews",
    link: "/profile/all-reviews",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.settingsOrange,
    label: " Settings",
    link: "/profile/settings",
  },
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.logoutOrange,
    label: " Logout",
    link: "/profile/logout",
  },
];
