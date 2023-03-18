import { FC } from "react";
import { LargeSpinner, SpinnerOverlay, WhiteSpinner } from "./spinner.style";

export enum SPINNER_TYPE_CLASSES {
  white = "white",
  large = "large",
}

const getSpinner = (
  spinnerType = SPINNER_TYPE_CLASSES.white
): typeof WhiteSpinner =>
  ({
    [SPINNER_TYPE_CLASSES.white]: WhiteSpinner,
    [SPINNER_TYPE_CLASSES.large]: LargeSpinner,
  }[spinnerType]);

export type SpinnerProps = {
  spinnerType?: SPINNER_TYPE_CLASSES;
};
const Spinner: FC<SpinnerProps> = ({ spinnerType }) => {
  const CustomSpinner = getSpinner(spinnerType);
  return (
    <SpinnerOverlay>
      <CustomSpinner />
    </SpinnerOverlay>
  );
};

export default Spinner;
