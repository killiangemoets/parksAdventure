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
  DeleteButtonWrapper,
  DeleteMessage,
  PriceModalButtons,
  ResetIcon,
} from "./pricesCalendarInput.style";
import SwitchInput from "../../../UIComponents/switchInput/switchInput.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../UIComponents/button/button.component";
import "dayjs/locale/en-gb";

import {
  DateSelectArg,
  EventInput,
  LocaleSingularArg,
} from "@fullcalendar/core";
import Modal from "../../../UIComponents/modal/modal.component";
import QuickFactInput, {
  HandleChangeValueType,
  QUICK_FACT_INPUT_TYPE,
} from "../quickFactInput/quickFactInput.component";
import { TCreateAvailability, CREATE_TOUR_DATA } from "../../../../types/tour";

type ModalInfosProps = {
  price: number | undefined;
  kidPrice: number | undefined;
  groupSize: number | undefined;
  startingTime: Dayjs | undefined;
};

const defaultModalInfo: ModalInfosProps = {
  price: undefined,
  kidPrice: undefined,
  groupSize: undefined,
  startingTime: undefined,
};

type ErrorsProps = {
  price: boolean;
  groupSize: boolean;
  startingTime: boolean;
};
const defaultErrorsState: ErrorsProps = {
  price: false,
  groupSize: false,
  startingTime: false,
};

export type PricesCalendarInputProps = {
  availabilities: TCreateAvailability[];
  handleChange: (availabilities: TCreateAvailability[], name: string) => void;
};

const PricesCalendarInput: FC<PricesCalendarInputProps> = ({
  availabilities,
  handleChange,
}) => {
  const dateFormats: [Info, Info] = [
    { value: "US Format", id: "us" },
    { value: "EU Format", id: "en-gb" },
  ];
  const [selectedDateFormat, setSelectedDateFormat] = useState<Info>(
    dateFormats[0]
  );
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [priceModalOpen, setPriceModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  const [modalInfos, setModalInfos] =
    useState<ModalInfosProps>(defaultModalInfo);
  const [backgroundEventsSelectedDates, setBackgroundEventsSelectedDates] =
    useState<EventInput[]>([]);
  const [pricesEvents, setPricesEvents] = useState<EventInput[]>([]);
  const [errors, setErrors] = useState<ErrorsProps>(defaultErrorsState);

  useEffect(() => {
    let newPricesEvents: EventInput[] = [];
    availabilities.forEach((availability) => {
      newPricesEvents.push({
        title: `Adults: $${availability.price}`,
        start: availability.date,
        color: "#85907c",
      });
      if (availability.kidPrice) {
        newPricesEvents.push({
          title: `Children: $${availability.kidPrice}`,
          start: availability.date,
          color: "#db9b81",
        });
      }
    });
    setPricesEvents(newPricesEvents);
  }, [availabilities]);

  useEffect(() => {
    const events = selectedDates.map((date) => {
      return {
        start: date.format("YYYY-MM-DD"),
        end: date.format("YYYY-MM-DD"),
        display: "background",
        color: "#e6b8a5",
      };
    });

    const updateShowDeleteButton = events.find((selectEvent) =>
      pricesEvents.find(
        (priceEvent) =>
          priceEvent.start && priceEvent.start === selectEvent.start
      )
    );

    setBackgroundEventsSelectedDates(events);
    setShowDeleteButton(Boolean(updateShowDeleteButton));
  }, [pricesEvents, selectedDates]);

  const handleClosePriceModal = () => {
    setPriceModalOpen(false);
    setErrors(defaultErrorsState);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleChangeInput = (value: HandleChangeValueType, name: string) => {
    setModalInfos({ ...modalInfos, [name]: value });
    if (name !== "kidPrice") setErrors({ ...errors, [name]: false });
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
    const newErrorsState = {
      ...defaultErrorsState,
    };
    if (!modalInfos.price) newErrorsState.price = true;
    if (!modalInfos.groupSize) newErrorsState.groupSize = true;
    if (!modalInfos.startingTime) newErrorsState.startingTime = true;
    setErrors(newErrorsState);

    if (!modalInfos.price || !modalInfos.groupSize || !modalInfos.startingTime)
      return;

    const updatedAvailabilities: TCreateAvailability[] = selectedDates.map(
      (selectedDate) => {
        return {
          date: selectedDate.format("YYYY-MM-DD"),
          price: modalInfos.price || 0,
          kidPrice: modalInfos.kidPrice,
          time: modalInfos.startingTime?.format("hh-mm a") || "",
          groupSize: modalInfos.groupSize || 0,
        };
      }
    );
    availabilities.forEach((availability) => {
      if (!updatedAvailabilities.find((el) => el.date === availability.date))
        updatedAvailabilities.push(availability);
    });

    handleChange(updatedAvailabilities, CREATE_TOUR_DATA.availabilities);
    setPriceModalOpen(false);
    setModalInfos(defaultModalInfo);
    setSelectedDates([]);
    setErrors(defaultErrorsState);
  };

  const handleDeleteConfirm = () => {
    const updatedAvailabilities = availabilities.filter(
      (availability) =>
        !selectedDates.find(
          (selectedDate) =>
            selectedDate.format("YYYY-MM-DD") === availability.date
        )
    );
    handleChange(updatedAvailabilities, CREATE_TOUR_DATA.availabilities);
    setDeleteModalOpen(false);
    setSelectedDates([]);
  };

  return (
    <CalendarInputContainer>
      <CalendarInputTopBarContainer>
        <SwitchInput
          switchInfos={dateFormats}
          handleChange={handleChangeSwitchInput}
        />
        {selectedDates.length > 0 && (
          <>
            <DeleteButtonWrapper>
              {showDeleteButton && (
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.inverted}
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  Delete selected info
                </Button>
              )}
            </DeleteButtonWrapper>

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
          handleChange={handleChangeInput}
          infoName="Adult Price"
          name="price"
          value={modalInfos.price}
          addonAfter="$"
          placeholder="Enter a value"
          min={0}
          error={errors.price}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.number}
          handleChange={handleChangeInput}
          infoName="Child Price"
          infoDescription="(optional)"
          name="kidPrice"
          value={modalInfos.kidPrice}
          addonAfter="$"
          placeholder="Enter a value"
          min={0}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.number}
          handleChange={handleChangeInput}
          infoName="Group Size"
          name="groupSize"
          value={modalInfos.groupSize}
          addonAfter="people"
          placeholder="Enter a value"
          min={1}
          error={errors.groupSize}
        />
        <QuickFactInput
          type={QUICK_FACT_INPUT_TYPE.time}
          handleChange={handleChangeInput}
          infoName="Starting Time"
          name="startingTime"
          value={modalInfos.startingTime}
          minuteStep={15}
          format={selectedDateFormat.id === "us" ? "HH:mm A" : "HH:mm"}
          error={errors.startingTime}
        />

        <PriceModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.cancel}
            onClick={handleClosePriceModal}
          >
            Cancel
          </Button>
          <Button onClick={handleModalConfirm}>Confirm</Button>
        </PriceModalButtons>
      </Modal>
      <Modal
        title={"Delete selection"}
        handleClose={handleCloseDeleteModal}
        open={deleteModalOpen}
      >
        <DeleteMessage>
          Are you sure you want to delete the <br />
          selected availabilities?
        </DeleteMessage>
        <PriceModalButtons>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.cancel}
            onClick={handleCloseDeleteModal}
          >
            No
          </Button>
          <Button onClick={handleDeleteConfirm}>Yes</Button>
        </PriceModalButtons>
      </Modal>
    </CalendarInputContainer>
  );
};

export default PricesCalendarInput;
