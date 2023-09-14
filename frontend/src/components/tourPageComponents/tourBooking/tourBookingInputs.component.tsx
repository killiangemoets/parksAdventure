import { FC, useState } from "react";
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
  SelectDateFooterText2,
  SelectDateFooterText3,
  TourBookingInputsContainer,
} from "./tourBookingInputs.style";
import {
  selectTourCurrentAvailabilities,
  selectTourIsLoading,
} from "../../../store/tour/tour.selector";
import { useSelector } from "react-redux";
import { TAvailability } from "../../../types/tour";
import compareDates from "../../../utils/comparison/compareDates";
import useDatesFromAvailabilities from "../../../hooks/useDatesFromAvailabilities";
import useLabelFromGroupInfo from "../../../hooks/useLabelFromGroupInfo";
import { defaultCountInputs } from "./tourBooking.component";

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
  const availabilities = useSelector(selectTourCurrentAvailabilities);
  const isLoading = useSelector(selectTourIsLoading);

  const [groupError, setGroupError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const { availableDates, cheapestDates, lastSpotsDates, soldoutDates } =
    useDatesFromAvailabilities({ availabilities });
  const { label } = useLabelFromGroupInfo({ group: currentGroup });

  const handleDropDownEdit = (newState: CountInputState[]): void => {
    if (isLoading) return;
    groupError && setGroupError(false);
    handleChangeGroup(newState);
  };

  const handleChangeDate = (date: Date | null) => {
    dateError && setDateError(false);
    if (availabilities && date) {
      const newAvailability = availabilities.find((availability) =>
        compareDates(availability.date, date)
      );
      handleChangeAvailability(newAvailability);
    } else {
      handleChangeAvailability(undefined);
    }
  };

  const handleClickOnSeeDetails = () => {
    if (
      (currentGroup[0].value > 0 || currentGroup[1].value > 0) &&
      currentAvailability
    )
      handleSeeDetails();

    if (currentGroup[0].value === 0 && currentGroup[1].value === 0)
      setGroupError(true);

    if (!currentAvailability) setDateError(true);
  };

  return (
    <TourBookingInputsContainer>
      <Dropdown
        dropdownType={DROPDOWN_TYPE_CLASSES.count}
        buttonType={BUTTON_TYPE_CLASSES.light}
        countInputsState={isLoading ? defaultCountInputs : currentGroup}
        handleCount={handleDropDownEdit}
        error={groupError}>
        <>
          <GroupIcon />
          <p>{label}</p>
        </>
      </Dropdown>
      <DateInput
        currentValue={currentAvailability?.date || null}
        handleChange={(value) => {
          if (isLoading) return;
          handleChangeDate(value);
        }}
        enabledDates={isLoading ? [] : availableDates}
        highlightDates={isLoading ? [] : cheapestDates}
        highlightDates2={isLoading ? [] : lastSpotsDates}
        highlightDates3={isLoading ? [] : soldoutDates}
        footer={
          <SelectDateFooter>
            <SelectDateFooterText>Cheapest date(s)</SelectDateFooterText>
            <SelectDateFooterText2>5 or less spots left</SelectDateFooterText2>
            <SelectDateFooterText3>Soldout</SelectDateFooterText3>
          </SelectDateFooter>
        }
        error={dateError}
      />
      <Button style={{ width: "20rem" }} onClick={handleClickOnSeeDetails}>
        See Details
      </Button>
    </TourBookingInputsContainer>
  );
};

export default TourBookingInputs;
