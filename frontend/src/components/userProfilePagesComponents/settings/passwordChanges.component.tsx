import Button from "../../UIComponents/button/button.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  SaveButtonContainer,
  SettingsContainer,
  SettingsForm,
  SettingsInputs,
  SettingsWrapper2,
} from "./settings.style";

const PasswordChange = () => {
  return (
    <SettingsContainer>
      <SettingsWrapper2>
        <Title titleType={TITLE_TYPE_CLASSES.section}>Password Change</Title>
        <SettingsForm>
          <SettingsInputs>
            <TextInput
              label="Current password"
              placeholder="••••••••"
              required
              minLength={8}
              type="password"
            />
            <TextInput
              label="New password"
              placeholder="••••••••"
              required
              minLength={8}
              type="password"
            />
            <TextInput
              label="Confirm password"
              placeholder="••••••••"
              required
              minLength={8}
              type="password"
            />
          </SettingsInputs>
          <SaveButtonContainer>
            <Button>Update Password</Button>
          </SaveButtonContainer>
        </SettingsForm>
      </SettingsWrapper2>
    </SettingsContainer>
  );
};
export default PasswordChange;
