import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DateInput from "../../UIComponents/dateInput/dateInput.component";
import DropdownCountsInput, {
  CountInputState,
} from "../../UIComponents/dropdownCountsInput/dropdownCountsInput.component";
import {
  GroupIcon,
  TourBookingInputsContainer,
} from "./tourBookingInputs.style";

const TourBookingInputs = () => {
  const [currentCountInputs, setcurrentCountInputs] = useState<
    CountInputState[]
  >([
    { id: "adult", title: "Adult", subtitle: "(16+ years)", value: 0 },
    { id: "kid", title: "Kid", subtitle: "(4-15 years)", value: 0 },
  ]);
  const [label, setLabel] = useState<string>("Add people");

  const handleDropDownEdit = (newState: CountInputState[]): void => {
    setcurrentCountInputs(newState);
    const newLabel = newState.reduce((acc, cur) => {
      if (cur.value > 0 && !acc.length)
        return acc + `${cur.title} x ${cur.value}`;
      else if (cur.value > 0) return acc + `, ${cur.title} x ${cur.value}`;
      else return acc;
    }, "");
    setLabel(newLabel.length ? newLabel : "Add people");
  };

  return (
    <TourBookingInputsContainer>
      <DropdownCountsInput
        buttonType={BUTTON_TYPE_CLASSES.light}
        countInputsState={currentCountInputs}
        handler={handleDropDownEdit}
        label={label}
      >
        <GroupIcon />
      </DropdownCountsInput>
      <DateInput />
      <Button style={{ width: "20rem" }}>Book Now</Button>
    </TourBookingInputsContainer>
  );
};

export default TourBookingInputs;
