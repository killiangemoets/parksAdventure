import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import gbLocale from "@fullcalendar/core/locales/en-gb";
import { AdminBookingsCalendarContainer } from "./adminBookingsCalendar.style";
import { useState } from "react";
import {
  DateSelectArg,
  EventInput,
  LocaleSingularArg,
} from "@fullcalendar/core";
import SwitchInput from "../../UIComponents/switchInput/switchInput.component";
import { CalendarInputTopBarContainer } from "../addTourPageComponents/addTourCalendar/pricesCalendarInput.style";

const AdminBookingsCalendar = () => {
  const dateFormats: [Info, Info] = [
    { value: "US Format", id: "us" },
    { value: "EU Format", id: "en-gb" },
  ];
  const [selectedDateFormat, setSelectedDateFormat] = useState<Info>(
    dateFormats[0]
  );

  const handleChangeSwitchInput = (checked: boolean) => {
    setSelectedDateFormat(dateFormats[checked ? 1 : 0]);
  };
  return (
    <AdminBookingsCalendarContainer>
      <CalendarInputTopBarContainer>
        <SwitchInput
          switchInfos={dateFormats}
          handleChange={handleChangeSwitchInput}
        />
      </CalendarInputTopBarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        selectable={true}
        // select={handleSelect}
        // validRange={{
        //   start: new Date(),
        // }}
        // events={[...backgroundEventsSelectedDates, ...pricesEvents]}
        locales={[gbLocale]}
        locale={selectedDateFormat.id as LocaleSingularArg}
      />
    </AdminBookingsCalendarContainer>
  );
};

export default AdminBookingsCalendar;
