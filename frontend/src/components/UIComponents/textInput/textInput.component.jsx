import { Label, TextInputContainer, TextInputEl } from "./textInput.style";

const TextInput = ({ label, placeholder, ...otherInputProps }) => {
  return (
    <TextInputContainer>
      <Label>{label}</Label>
      <TextInputEl
        name={label}
        placeholder={placeholder}
        {...otherInputProps}
      />
    </TextInputContainer>
  );
};

export default TextInput;
