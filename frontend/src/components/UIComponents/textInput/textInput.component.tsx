import { FC, InputHTMLAttributes } from "react";
import { Label, TextInputContainer, TextInputEl } from "./textInput.style";

export type TextInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<TextInputProps> = ({ label, ...otherInputProps }) => {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      <TextInputEl {...otherInputProps} />
    </TextInputContainer>
  );
};

export default TextInput;
