import { FC, InputHTMLAttributes } from "react";
import { Label, TextInputContainer, TextInputEl, TextNoEditableInputEl } from "./textInput.style";

export type TextInputProps = {
  label: string;
  editable?: boolean
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<TextInputProps> = ({ label, editable = true , ...otherInputProps}) => {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      {editable ? <TextInputEl {...otherInputProps} /> : 
      <TextNoEditableInputEl {...otherInputProps} disabled />}
    </TextInputContainer>
  );
};

export default TextInput;
