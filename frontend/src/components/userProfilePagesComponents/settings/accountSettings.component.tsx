import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  SettingsContainer,
  SettingsInputs,
  CurrentPicture,
  SaveButtonContainer,
  SettingsWrapper1,
  SettingsForm,
} from "./settings.style";

const AccountSettings = () => {
  return (
    <SettingsContainer>
      <SettingsWrapper1>
        <Title titleType={TITLE_TYPE_CLASSES.section}>
          Your Account Settings
        </Title>
        <SettingsForm>
          <SettingsInputs>
            <TextInput
              label="Name"
              placeholder="Lucas Scott"
              type="name"
              required
            />
            <TextInput
              label="Email address"
              placeholder="lucas.scott@gmail.com"
              type="email"
              required
            />
          </SettingsInputs>
          <CurrentPicture>
            <ProfilePicture
              pictureSize={PROFILE_PICTURE_SIZE_CLASSES.extraLarge}
            />
            <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
              Choose new photo
            </Button>
          </CurrentPicture>
          <SaveButtonContainer>
            <Button>Save Settings</Button>
          </SaveButtonContainer>
        </SettingsForm>
      </SettingsWrapper1>
    </SettingsContainer>
  );
};

export default AccountSettings;
