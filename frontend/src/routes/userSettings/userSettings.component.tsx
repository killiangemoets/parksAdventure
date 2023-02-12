import AccountSettings from "../../components/userProfilePagesComponents/settings/accountSettings.component";
import PasswordChange from "../../components/userProfilePagesComponents/settings/passwordChanges.component";
import { UserSettingsContainer } from "./userSettings.style";

const Usersettings = () => {
  return (
    <UserSettingsContainer>
      <AccountSettings />
      <PasswordChange />
    </UserSettingsContainer>
  );
};

export default Usersettings;
