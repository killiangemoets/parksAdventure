import { FC, ButtonHTMLAttributes } from "react";
import {
  BaseButton,
  InvertedButton,
  InputButton,
  EmptyButton,
  GalleryButton,
  LightButton,
  RectangularButton,
  CancelButton,
} from "./button.style";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  inverted = "inverted",
  input = "input",
  empty = "empty",
  gallery = "gallery",
  light = "light",
  rectangular = "rectangular",
  cancel = "cancel",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.input]: InputButton,
    [BUTTON_TYPE_CLASSES.empty]: EmptyButton,
    [BUTTON_TYPE_CLASSES.gallery]: GalleryButton,
    [BUTTON_TYPE_CLASSES.light]: LightButton,
    [BUTTON_TYPE_CLASSES.rectangular]: RectangularButton,
    [BUTTON_TYPE_CLASSES.cancel]: CancelButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
