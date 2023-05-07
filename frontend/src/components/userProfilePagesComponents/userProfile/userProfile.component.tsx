import { Outlet, useNavigate } from "react-router-dom";
import {
  Footer,
  Navigation,
} from "../../navbarAndFooterComponents/navbarAndFooter.component";
import ProfileColumn from "../../UIComponents/profileColumn/profileColumn.component";
import { PROFILE_ICON_TYPE_CLASSES } from "../../UIComponents/profileIcon/profileIcon.component";
import { Content, UserProfileContainer } from "./userProfile.style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectUserRole,
} from "../../../store/user/user.selector";
import { USER_ROLE_TYPES } from "../../../types/user";

export type ProfileSectionElement = {
  iconType: PROFILE_ICON_TYPE_CLASSES;
  label: string;
  link: string;
};

const userSections: ProfileSectionElement[] = [
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

const adminSections: ProfileSectionElement[] = [
  {
    iconType: PROFILE_ICON_TYPE_CLASSES.dashboard,
    label: "dashboard",
    link: "/profile/dashboard",
  },
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

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const [profileSections, setProfileSection] = useState<
    ProfileSectionElement[]
  >([]);

  useEffect(() => {
    if (!userId) navigate("/login?uri=/profile");
    console.log({ userRole });
    if (userRole === USER_ROLE_TYPES.ADMIN) setProfileSection(adminSections);
    else setProfileSection(userSections);
  }, [userId]);

  return (
    <>
      <Navigation />
      <UserProfileContainer>
        <ProfileColumn profileSections={profileSections} />
        <Content>
          <Outlet />
          <Footer />
        </Content>
      </UserProfileContainer>
    </>
  );
};

export default UserProfile;
