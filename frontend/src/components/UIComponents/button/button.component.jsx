import {
  BaseButton,
  InvertedButton,
  InputButton,
  EmptyButton,
  GalleryButton,
} from "./button.style";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  inverted: "inverted",
  input: "input",
  empty: "empty",
  gallery: "gallery",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.input]: InputButton,
    [BUTTON_TYPE_CLASSES.empty]: EmptyButton,
    [BUTTON_TYPE_CLASSES.gallery]: GalleryButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
