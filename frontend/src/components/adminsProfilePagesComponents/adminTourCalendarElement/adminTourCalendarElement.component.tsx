import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import gbLocale from "@fullcalendar/core/locales/en-gb";
import { FC, useEffect, useState } from "react";
import {
  EventClickArg,
  EventInput,
  LocaleSingularArg,
} from "@fullcalendar/core";
import SwitchInput from "../../UIComponents/switchInput/switchInput.component";
import { CalendarInputTopBarContainer } from "../addTourPageComponents/addTourCalendar/pricesCalendarInput.style";
import { AdminTourCalendarElementContainer } from "./adminTourCalendarElement.style";
import { TAvailability } from "../../../types/tour";
import { getCreateAvailabilityDateFormat } from "../../../utils/formatting/formatDates";
import { useNavigate } from "react-router-dom";

export type AdminTourCalendarElementProps = {
  availabilities: TAvailability[];
  tourId: string;
};

const AdminTourCalendarElement: FC<AdminTourCalendarElementProps> = ({
  availabilities,
  tourId,
}) => {
  const navigate = useNavigate();
  const dateFormats: [Info, Info] = [
    { value: "US Format", id: "us" },
    { value: "EU Format", id: "en-gb" },
  ];
  const [selectedDateFormat, setSelectedDateFormat] = useState<Info>(
    dateFormats[0]
  );
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  const handleChangeSwitchInput = (checked: boolean) => {
    setSelectedDateFormat(dateFormats[checked ? 1 : 0]);
  };

  const handleEventClick = (eventClickInfo: EventClickArg) => {
    if (!eventClickInfo.event.title.includes("Current G.:")) return;
    const date = eventClickInfo.event.startStr;
    navigate(
      `/profile/all-bookings?tour=${tourId}&date[gte]=${date}&date[lte]=${date}`
    );
  };

  useEffect(() => {
    let newPricesEvents: EventInput[] = [];
    availabilities.forEach((availability) => {
      const formattedDate = getCreateAvailabilityDateFormat(availability.date);
      newPricesEvents.push({
        title: `Time: ${availability.time}`,
        start: formattedDate,
        color: "#c5b8a2",
      });
      newPricesEvents.push({
        title: `Adults: $${availability.price}`,
        start: formattedDate,
        color: "#85907c",
      });
      if (availability.kidPrice) {
        newPricesEvents.push({
          title: `Children: $${availability.kidPrice}`,
          start: formattedDate,
          color: "#85907c",
        });
      }
      newPricesEvents.push({
        title: `GC.: ${availability.maxGroupSize}ppl`,
        start: formattedDate,
        color: "#db9b81",
      });

      if (availability.currentGroupSize > 0) {
        newPricesEvents.push({
          title: `Current G.: ${availability.currentGroupSize}ppl`,
          start: formattedDate,
          color: "#f9625b",
        });
      }
    });
    setCalendarEvents(newPricesEvents);
  }, [availabilities]);

  return (
    <AdminTourCalendarElementContainer>
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
        selectable={false}
        events={[...calendarEvents]}
        locales={[gbLocale]}
        locale={selectedDateFormat.id as LocaleSingularArg}
        eventClick={handleEventClick}
      />
    </AdminTourCalendarElementContainer>
  );
};

export default AdminTourCalendarElement;
