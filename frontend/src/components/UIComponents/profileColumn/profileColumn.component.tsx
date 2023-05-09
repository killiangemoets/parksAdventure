import { FC } from "react";
import ProfileIcon from "../profileIcon/profileIcon.component";
import {
  ProfileColumnContainer,
  ProfileSectionContainer,
  ProfileSectionLabel,
} from "./profileColumns.style";
import { ProfileSectionElement } from "../../../utils/profileSections/profileSectionLists";

export type ProfileColumnProps = {
  profileSections: ProfileSectionElement[];
};

const ProfileSection: FC<ProfileSectionElement> = ({
  iconType,
  label,
  link,
}) => {
  return (
    <ProfileSectionContainer to={link}>
      <ProfileIcon iconType={iconType} />
      <ProfileSectionLabel>{label}</ProfileSectionLabel>
    </ProfileSectionContainer>
  );
};

const ProfileColumn: FC<ProfileColumnProps> = ({ profileSections }) => {
  return (
    <ProfileColumnContainer>
      {profileSections.map((profileSection) => (
        <ProfileSection
          iconType={profileSection.iconType}
          label={profileSection.label}
          link={profileSection.link}
          key={profileSection.label}
        />
      ))}
    </ProfileColumnContainer>
  );
};

export default ProfileColumn;
