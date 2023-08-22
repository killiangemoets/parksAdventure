import AccountSettings from "../../../components/userProfilePagesComponents/settings/accountSettings.component";
import DeleteAccount from "../../../components/userProfilePagesComponents/settings/deleteAccount.component";
import PasswordChange from "../../../components/userProfilePagesComponents/settings/passwordChanges.component";
import { UserSettingsContainer } from "./userSettings.style";

const Usersettings = () => {
  return (
    <UserSettingsContainer>
      <AccountSettings />
      <PasswordChange />
      <DeleteAccount />
    </UserSettingsContainer>
  );
};

export default Usersettings;
