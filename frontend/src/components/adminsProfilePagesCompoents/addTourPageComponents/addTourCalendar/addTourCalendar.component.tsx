import PricesCalendarInput from "./pricesCalendarInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import {
  AddTourCalendarContainer,
  AddTourCalendarContent,
  AddTourCalendarTitle,
  AddTourCalendarWrapper,
} from "./addTourCalendar.style";
import { FC } from "react";
import { TCreateAvailability } from "../../../../types/tour";

export type AddTourCalendarProps = {
  availabilities: TCreateAvailability[];
  handleChange: (availabilities: TCreateAvailability[], name: string) => void;
};

const AddTourCalendar: FC<AddTourCalendarProps> = ({
  availabilities,
  handleChange,
}) => {
  return (
    <AddTourCalendarContainer>
      <AddTourCalendarWrapper>
        <AddTourCalendarTitle>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Calendar</Title>
        </AddTourCalendarTitle>
        <AddTourCalendarContent>
          <PricesCalendarInput
            availabilities={availabilities}
            handleChange={handleChange}
          />
        </AddTourCalendarContent>
      </AddTourCalendarWrapper>
    </AddTourCalendarContainer>
  );
};

export default AddTourCalendar;
