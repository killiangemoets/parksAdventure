import {
  BaseButton,
  CustomButton,
  EmptyButton,
  InputButton,
} from "./button.style";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  empty: "empty",
  input: "input",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.empty]: EmptyButton,
    [BUTTON_TYPE_CLASSES.input]: InputButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
