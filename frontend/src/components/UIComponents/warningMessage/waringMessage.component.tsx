import {
  WarningIcon,
  WarningMessageContainer,
  WarningMessageText,
} from "./warningMessage.style";

const WarningMessage = () => {
  return (
    <WarningMessageContainer>
      <WarningIcon />
      <WarningMessageText>This action cannot be undone!</WarningMessageText>
    </WarningMessageContainer>
  );
};

export default WarningMessage;
