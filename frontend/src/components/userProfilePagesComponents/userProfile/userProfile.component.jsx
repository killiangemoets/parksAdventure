import { Outlet } from "react-router-dom";
import { Footer } from "../../navbarAndFooter/navbarAndFooter.component";
import ProfileColumn from "../../UIComponents/profileColumn/profileColumn.component";
import { Content, UserProfileContainer } from "./userProfile.style";

const UserProfile = () => {
  return (
    <UserProfileContainer>
      <ProfileColumn />
      <Content>
        <Outlet />
        <Footer />
      </Content>
    </UserProfileContainer>
  );
};

export default UserProfile;
