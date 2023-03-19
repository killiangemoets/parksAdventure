import { FC, ReactNode } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Spinner, { SPINNER_TYPE_CLASSES } from "../spinner/spinner.component";
import { CheckIcon, FormButtonContainer } from "./formButton.style";

type FormButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  children: ReactNode | string;
  loading: boolean;
  success: boolean;
  handleClick?: () => void;
};

const FormButton: FC<FormButtonProps> = ({
  buttonType,
  children,
  loading,
  success,
  handleClick,
}) => {
  return (
    <FormButtonContainer>
      <Button
        onClick={() => {
          handleClick && handleClick();
        }}
      >
        {loading ? (
          <Spinner spinnerType={SPINNER_TYPE_CLASSES.small} />
        ) : success ? (
          <CheckIcon />
        ) : (
          children
        )}
      </Button>
    </FormButtonContainer>
  );
};

export default FormButton;
