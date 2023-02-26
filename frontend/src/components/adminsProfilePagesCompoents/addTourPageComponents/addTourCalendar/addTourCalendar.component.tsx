import CalendarInput from "../../../UIComponents/calendarInput/calendarInput.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import {
  AddTourCalendarContainer,
  AddTourCalendarContent,
  AddTourCalendarTitle,
  AddTourCalendarWrapper,
} from "./addTourCalendar.style";

const AddTourCalendar = () => {
  return (
    <AddTourCalendarContainer>
      <AddTourCalendarWrapper>
        <AddTourCalendarTitle>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Calendar</Title>
        </AddTourCalendarTitle>
        <AddTourCalendarContent>
          <CalendarInput />
        </AddTourCalendarContent>
      </AddTourCalendarWrapper>
    </AddTourCalendarContainer>
  );
};

export default AddTourCalendar;
