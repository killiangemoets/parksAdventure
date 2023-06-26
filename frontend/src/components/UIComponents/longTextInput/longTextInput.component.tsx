import { FC, TextareaHTMLAttributes } from "react";
import { Label, TextInputContainer } from "../textInput/textInput.style";
import { TextAreaEl } from "./longTextInput.style";

export type LongTextInputProps = {
  label: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const LongTextInput: FC<LongTextInputProps> = ({
  label,
  ...otherInputProps
}) => {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      <TextAreaEl {...otherInputProps} />
    </TextInputContainer>
  );
};

export default LongTextInput;
