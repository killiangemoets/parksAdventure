import { FC, useState } from "react";
import { Alert, Badge, BadgeProps, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  CalendarInputContainer,
  CalendarInputTopBarContainer,
} from "./calendarInput.style";
import SwitchInput from "../switchInput/switchInput.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "dayjs/locale/en-gb";
import localeEU from "antd/es/date-picker/locale/en_GB";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../dropdown/dropdown.component";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarInput: FC = () => {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const dateFormats: [Info, Info] = [
    { value: "US Format", id: "us" },
    { value: "EU Format", id: "eu" },
  ];
  const [selectedDateFormat, setSelectedDateFormat] = useState<Info>(
    dateFormats[0]
  );

  const specificDaysList: Info[] = [
    { value: "All Mondays", id: "mondays" },
    { value: "All Tuesdays", id: "tuesdays" },
    { value: "All Wednesdays", id: "wednesdays" },
    { value: "All Thursdays", id: "thursdays" },
    { value: "All Fridays", id: "fridays" },
    { value: "All Saturdays", id: "saturdays" },
    { value: "All Sundays", id: "sundays" },
  ];

  const [selectedSpecificDays, setSelectedSpecificDays] = useState<Info[]>([]);

  const handleSpecificDaysChange = (selectedSpecificDays: Info[]) => {
    console.log(selectedSpecificDays);
    setSelectedSpecificDays(selectedSpecificDays);
  };

  const handleChangeSwitchInput = (checked: boolean) => {
    setSelectedDateFormat(dateFormats[checked ? 1 : 0]);
  };

  const onSelect = (newValue: Dayjs) => {
    console.log("onSelect", newValue);

    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs, mode: string) => {
    console.log("onPanelChange", newValue);

    setValue(newValue);
  };

  const onChange = (newValue: Dayjs) => {
    console.log("onChange", newValue);
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const disabledDate = (current: Dayjs) => {
    return current && current <= dayjs().add(-1, "d");
  };

  return (
    <CalendarInputContainer>
      <CalendarInputTopBarContainer>
        <SwitchInput
          switchInfos={dateFormats}
          handleChange={handleChangeSwitchInput}
        />
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.checkBoxes}
          options={specificDaysList}
          allowSelectAll={true}
          selection={selectedSpecificDays}
          handleCheckBoxes={handleSpecificDaysChange}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Select a specific day
        </Dropdown>
        <Button>Add a price to selection </Button>
      </CalendarInputTopBarContainer>
      <Alert
        message={`You selected date: ${selectedValue?.format("YYYY-MM-DD")}`}
      />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        disabledDate={disabledDate}
        onChange={onChange}
        locale={selectedDateFormat.id === "us" ? undefined : localeEU}
      />
    </CalendarInputContainer>
  );
};

export default CalendarInput;
