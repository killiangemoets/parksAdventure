import { Outlet } from "react-router-dom";
import {
  Footer,
  Navigation,
} from "../../navbarAndFooterComponents/navbarAndFooter.component";
import ProfileColumn from "../../UIComponents/profileColumn/profileColumn.component";
import { PROFILE_ICON_TYPE_CLASSES } from "../../UIComponents/profileIcon/profileIcon.component";
import { Content, UserProfileContainer } from "./userProfile.style";

export type ProfileSectionElement = {
  iconType: PROFILE_ICON_TYPE_CLASSES;
  label: string;
  link: string;
};

const UserProfile = () => {
  const profileSections: ProfileSectionElement[] = [
    {
      iconType: PROFILE_ICON_TYPE_CLASSES.wishList,
      label: "my wishlist",
      link: "/profile/wishlist",
    },
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
    {
      iconType: PROFILE_ICON_TYPE_CLASSES.messages,
      label: "my messages",
      link: "/profile/messages",
    },
    {
      iconType: PROFILE_ICON_TYPE_CLASSES.settings,
      label: "settings",
      link: "/profile/settings",
    },
    {
      iconType: PROFILE_ICON_TYPE_CLASSES.addTour,
      label: " add a tour",
      link: "/profile/add-tour",
    },
    {
      iconType: PROFILE_ICON_TYPE_CLASSES.logout,
      label: " logout",
      link: "/profile/logout",
    },
  ];
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
