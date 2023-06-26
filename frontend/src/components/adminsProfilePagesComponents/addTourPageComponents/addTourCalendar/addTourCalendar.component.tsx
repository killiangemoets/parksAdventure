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
import { TAvailability, TCreateAvailability } from "../../../../types/tour";

export type AddTourCalendarProps = {
  availabilities: TCreateAvailability[];
  handleChange: (availabilities: TCreateAvailability[], name: string) => void;
  tourCurrentAvailabilities?: TAvailability[];
};

const AddTourCalendar: FC<AddTourCalendarProps> = ({
  availabilities,
  handleChange,
  tourCurrentAvailabilities,
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
            tourCurrentAvailabilities={tourCurrentAvailabilities}
          />
        </AddTourCalendarContent>
      </AddTourCalendarWrapper>
    </AddTourCalendarContainer>
  );
};

export default AddTourCalendar;
