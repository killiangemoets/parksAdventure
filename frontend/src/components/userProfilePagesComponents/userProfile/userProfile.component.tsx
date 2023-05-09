import { Outlet, useNavigate } from "react-router-dom";
import {
  Footer,
  Navigation,
} from "../../navbarAndFooterComponents/navbarAndFooter.component";
import ProfileColumn from "../../UIComponents/profileColumn/profileColumn.component";
import { Content, UserProfileContainer } from "./userProfile.style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectUserRole,
} from "../../../store/user/user.selector";
import { USER_ROLE_TYPES } from "../../../types/user";
import {
  ProfileSectionElement,
  adminSections,
  userSections,
} from "../../../utils/profileSections/profileSectionLists";

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const [profileSections, setProfileSection] = useState<
    ProfileSectionElement[]
  >([]);

  useEffect(() => {
    if (!userId) navigate("/login?uri=/profile");
    if (userRole === USER_ROLE_TYPES.ADMIN) setProfileSection(adminSections);
    else setProfileSection(userSections);
  }, [userId, userRole]);

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
