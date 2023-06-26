import { useEffect, useState } from "react";
import ProfileIcon from "../UIComponents/profileIcon/profileIcon.component";
import {
  ProfileDropdownContainer,
  ProfileDropdownElement,
  ProfileDropdownLine,
  ProfileDropdownText,
} from "./profileDropdown.style";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../store/user/user.selector";
import { USER_ROLE_TYPES } from "../../types/user";
import {
  ProfileSectionElement,
  adminDropdownSections,
  guideDropdownSections,
  userDropdownSections,
} from "../../utils/profileSections/profileSectionLists";

const ProfileDropdown = () => {
  const userRole = useSelector(selectUserRole);
  const [profileSections, setProfileSection] = useState<
    ProfileSectionElement[]
  >([]);

  useEffect(() => {
    if (!userRole) return;
    if (userRole === USER_ROLE_TYPES.ADMIN)
      setProfileSection(adminDropdownSections);
    else if (
      userRole === USER_ROLE_TYPES.GUIDE ||
      userRole === USER_ROLE_TYPES.LEAD_GUIDE
    )
      setProfileSection(guideDropdownSections);
    else setProfileSection(userDropdownSections);
  }, [userRole]);

  return (
    <ProfileDropdownContainer>
      {profileSections.map((section, i) => {
        if (i === 0)
          return (
            <ProfileDropdownElement to={section.link}>
              <ProfileIcon iconType={section.iconType} />
              <ProfileDropdownText>{section.label}</ProfileDropdownText>
            </ProfileDropdownElement>
          );
        else
          return (
            <>
              <ProfileDropdownLine />
              <ProfileDropdownElement to={section.link}>
                <ProfileIcon iconType={section.iconType} />
                <ProfileDropdownText>{section.label}</ProfileDropdownText>
              </ProfileDropdownElement>
            </>
          );
      })}
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;
