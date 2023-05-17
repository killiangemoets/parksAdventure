import { FC, ReactNode } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Spinner, { SPINNER_TYPE_CLASSES } from "../spinner/spinner.component";
import { CheckIcon, FormButtonContainer } from "./formButton.style";

type FormButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  children: ReactNode | string;
  loading?: boolean;
  success?: boolean;
  handleClick?: () => void;
};

const FormButton: FC<FormButtonProps> = ({
  buttonType,
  children,
  loading = false,
  success = false,
  handleClick,
}) => {
  return (
    <FormButtonContainer>
      <Button
        buttonType={buttonType}
        onClick={() => {
          handleClick && handleClick();
        }}>
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
