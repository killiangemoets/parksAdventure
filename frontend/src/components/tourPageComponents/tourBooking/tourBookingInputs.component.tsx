import { FC, useEffect, useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DateInput from "../../UIComponents/dateInput/dateInput.component";
import { CountInputState } from "../../UIComponents/dropdown/dropdownCounts.component";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import {
  GroupIcon,
  SelectDateFooter,
  SelectDateFooterText,
  TourBookingInputsContainer,
} from "./tourBookingInputs.style";
import { selectTourAvailabilities } from "../../../store/tour/tour.selector";
import { useSelector } from "react-redux";
import { TAvailability } from "../../../types/tour";

type TourBookingInputsProps = {
  currentAvailability: TAvailability | undefined;
  handleChangeAvailability: (value: TAvailability | undefined) => void;
  currentGroup: CountInputState[];
  handleChangeGroup: (values: CountInputState[]) => void;
  handleSeeDetails: () => void;
};

const TourBookingInputs: FC<TourBookingInputsProps> = ({
  currentAvailability,
  currentGroup,
  handleChangeAvailability,
  handleChangeGroup,
  handleSeeDetails,
}) => {
  const availabilities = useSelector(selectTourAvailabilities);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [highlightDates, setHighlightsDates] = useState<Date[]>([]);

  const [label, setLabel] = useState<React.ReactNode>(<p>Add People</p>);
  const [groupError, setGroupError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const handleDropDownEdit = (newState: CountInputState[]): void => {
    groupError && setGroupError(false);
    handleChangeGroup(newState);
    const newLabel = newState.reduce((acc, cur) => {
      if (cur.value > 0 && !acc.length)
        return acc + `${cur.title} x ${cur.value}`;
      else if (cur.value > 0) return acc + `, ${cur.title} x ${cur.value}`;
      else return acc;
    }, "");
    setLabel(
      newLabel.length ? (
        <p style={{ color: "#333" }}>{newLabel}</p>
      ) : (
        <p>Add people</p>
      )
    );
  };

  const handleChangeDate = (date: Date | null) => {
    dateError && setDateError(false);
    if (availabilities && date) {
      const newAvailability = availabilities.find(
        (availability) =>
          new Date(availability.date).getDate() === new Date(date).getDate() &&
          new Date(availability.date).getMonth() ===
            new Date(date).getMonth() &&
          new Date(availability.date).getFullYear() ===
            new Date(date).getFullYear()
      );
      handleChangeAvailability(newAvailability);
    }
    if (!date) {
      handleChangeAvailability(undefined);
    }
  };

  const handleClick = () => {
    if (
      (currentGroup[0].value > 0 || currentGroup[1].value > 0) &&
      currentAvailability
    )
      handleSeeDetails();

    if (currentGroup[0].value === 0 && currentGroup[1].value === 0)
      setGroupError(true);

    if (!currentAvailability) setDateError(true);
  };

  useEffect(() => {
    if (!availabilities) return;
    let newAvailableDates: Date[] = [];
    let highlightDates: Date[] = [];
    let minPrice = Infinity;
    availabilities.forEach((availability) => {
      if (new Date(availability.date) > new Date(Date.now())) {
        newAvailableDates.push(availability.date);
      }
      if (
        availability.price < minPrice &&
        new Date(availability.date) > new Date(Date.now())
      ) {
        highlightDates = [availability.date];
        minPrice = availability.price;
      } else if (availability.price === minPrice) {
        highlightDates.push(availability.date);
      }
    });

    setAvailableDates(newAvailableDates);
    setHighlightsDates(highlightDates);
  }, [availabilities]);

  return (
    <TourBookingInputsContainer>
      <Dropdown
        dropdownType={DROPDOWN_TYPE_CLASSES.count}
        buttonType={BUTTON_TYPE_CLASSES.light}
        countInputsState={currentGroup}
        handleCount={handleDropDownEdit}
        error={groupError}
      >
        <>
          <GroupIcon />
          <p>{label}</p>
        </>
      </Dropdown>
      <DateInput
        currentValue={currentAvailability ? currentAvailability?.date : null}
        handleChange={(value) => {
          handleChangeDate(value);
        }}
        enabledDates={availableDates}
        highlightDates={highlightDates}
        footer={
          <SelectDateFooter>
            <SelectDateFooterText>Cheapest date(s)</SelectDateFooterText>
          </SelectDateFooter>
        }
        error={dateError}
      />
      <Button style={{ width: "20rem" }} onClick={handleClick}>
        See Details
      </Button>
    </TourBookingInputsContainer>
  );
};

export default TourBookingInputs;
