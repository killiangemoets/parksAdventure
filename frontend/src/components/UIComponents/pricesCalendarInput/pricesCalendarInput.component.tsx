import { FC, useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import gbLocale from "@fullcalendar/core/locales/en-gb";

import {
  CalendarInputContainer,
  CalendarInputTopBarContainer,
  PriceModalButtons,
  ResetIcon,
} from "./pricesCalendarInput.style";
import SwitchInput from "../switchInput/switchInput.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "dayjs/locale/en-gb";

import {
  DateSelectArg,
  EventInput,
  LocaleSingularArg,
} from "@fullcalendar/core";
import Modal from "../modal/modal.component";
import QuickFactInput, {
  handleChangeValueType,
  QUICK_FACT_INPUT_TYPE,
} from "../../adminsProfilePagesCompoents/addTourPageComponents/quickFactInput/quickFactInput.component";

type ModalInfosProps = {
  adultPrice: number | undefined;
  kidPrice: number | undefined;
  groupSize: number | undefined;
  startingTime: Dayjs | undefined;
};

const defaultModalInfo: ModalInfosProps = {
  adultPrice: undefined,
  kidPrice: undefined,
  groupSize: undefined,
  startingTime: undefined,
};

const PricesCalendarInput: FC = () => {
  const dateFormats: [Info, Info] = [
    { value: "US Format", id: "us" },
    { value: "EU Format", id: "en-gb" },
  ];
  const [selectedDateFormat, setSelectedDateFormat] = useState<Info>(
    dateFormats[0]
  );
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [priceModalOpen, setPriceModalOpen] = useState<boolean>(false);
  const [modalInfos, setModalInfos] =
    useState<ModalInfosProps>(defaultModalInfo);
  const [backgroundEventsSelectedDates, setBackgroundEventsSelectedDates] =
    useState<EventInput[]>([]);
  const [pricesEvents, setPricesEvents] = useState<EventInput[]>([
    {
      title: "Adults: $499.99",
      start: "2023-03-12",
      color: "#85907c",
    },
    {
      title: "Adults: $499.99",
      start: "2023-03-13",
      color: "#85907c",
    },
    {
      title: "Kids: $399.99",
      start: "2023-03-13",
      color: "#db9b81",
    },
  ]);

  const handleClosePriceModal = () => {
    setPriceModalOpen(false);
  };

  const handleChange = (value: handleChangeValueType, name: string) => {
    setModalInfos({ ...modalInfos, [name]: value });
    console.log(modalInfos);
  };

  const resetSelectedDates = () => {
    setSelectedDates([]);
  };

  const handleChangeSwitchInput = (checked: boolean) => {
    setSelectedDateFormat(dateFormats[checked ? 1 : 0]);
  };

  const handleSelect = (info: DateSelectArg) => {
    let selectedDatesState = [...selectedDates];
    for (
      let date = dayjs(info.start);
      date < dayjs(info.end);
      date = dayjs(date).add(+1, "d")
    ) {
      if (date <= dayjs().add(-1, "d")) return;

      if (
        selectedDatesState.find(
          (selectedDate) =>
            selectedDate.format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
        )
      ) {
        selectedDatesState = selectedDatesState.filter(
          (selectedDate) =>
            selectedDate.format("YYYY-MM-DD") !== date.format("YYYY-MM-DD")
        );
      } else {
        selectedDatesState.push(date);
      }
    }
    setSelectedDates(selectedDatesState);
  };

  const handleModalConfirm = () => {
    // TODO
  };

  useEffect(() => {
    const events = selectedDates.map((date) => {
      return {
        start: date.format("YYYY-MM-DD"),
        end: date.format("YYYY-MM-DD"),
        display: "background",
        color: "#e6b8a5",
      };
    });
    setBackgroundEventsSelectedDates(events);
  }, [selectedDates]);

  return (
    <CalendarInputContainer>
      <CalendarInputTopBarContainer>
        <SwitchInput
          switchInfos={dateFormats}
          handleChange={handleChangeSwitchInput}
        />
        {selectedDates.length > 0 && (
          <>
            <Button
              onClick={() => {
                setPriceModalOpen(true);
              }}
            >
              Edit selection
            </Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.empty}
              onClick={resetSelectedDates}
            >
              <ResetIcon />
            </Button>
          </>
        )}
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
        select={handleSelect}
        validRange={{
          start: new Date(),
        }}
        events={[...backgroundEventsSelectedDates, ...pricesEvents]}
        locales={[gbLocale]}
        locale={selectedDateFormat.id as LocaleSingularArg}
      />
      <Modal
        title={"Edit selection"}
        handleClose={handleClosePriceModal}
        open={priceModalOpen}
        closeOnClickOnOverlay={false}
      >
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.number}
          handleChange={handleChange}
          infoName="Adult Price"
          name="adultPrice"
          value={modalInfos.adultPrice}
          addonAfter="$"
          placeholder="Enter a value"
          min={0}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.number}
          handleChange={handleChange}
          infoName="Kid Price"
          name="kidPrice"
          value={modalInfos.kidPrice}
          addonAfter="$"
          placeholder="Enter a value"
          min={0}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.number}
          handleChange={handleChange}
          infoName="Group Size"
          name="groupSize"
          value={modalInfos.groupSize}
          addonAfter="people"
          placeholder="Enter a value"
          min={1}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.time}
          handleChange={handleChange}
          infoName="Starting Time"
          name="startingTime"
          value={modalInfos.startingTime}
          minuteStep={15}
          format={selectedDateFormat.id === "us" ? "HH:mm A" : "HH:mm"}
        />

        <PriceModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={handleClosePriceModal}
          >
            Cancel
          </Button>
          <Button onClick={handleModalConfirm}>Confirm</Button>
        </PriceModalButtons>
      </Modal>
    </CalendarInputContainer>
  );
};

export default PricesCalendarInput;
