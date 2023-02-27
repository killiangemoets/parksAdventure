import { FC, useEffect, useState } from "react";
import { Alert, Badge, BadgeProps, Calendar, ConfigProvider } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  CalendarInputContainer,
  CalendarInputTopBarContainer,
  SelectedDate,
} from "./pricesCalendarInput.style";
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

const CalendarInputDraft: FC = () => {
  const [value, setValue] = useState<Dayjs | undefined>(undefined);
  const [selectedValues, setSelectedValues] = useState<Dayjs[]>([]);
  const [selectedValuesString, setSelectedValuesString] = useState<string>("");

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

  useEffect(() => {
    // Update selection string
    let newSelectedValuesString = selectedValues
      .reduce((acc, curr) => acc + curr.format("YYYY-MM-DD") + ", ", "")
      .slice(0, -2);
    if (newSelectedValuesString.length > 90)
      newSelectedValuesString = newSelectedValuesString.slice(0, 90) + "...";
    setSelectedValuesString(newSelectedValuesString);

    // Update calendar styling
    const dayElements = document.querySelectorAll(
      ".ant-picker-calendar.ant-picker-calendar-full .ant-picker-panel .ant-picker-body td"
    );
    dayElements.forEach((dayElement) => {
      if (dayElement instanceof HTMLElement) {
        if (
          selectedValues.find(
            (selectedValue) =>
              selectedValue.format("YYYY-MM-DD") === dayElement.title
          )
        ) {
          dayElement.style.backgroundColor = "#f5e2db";
        } else {
          dayElement.style.backgroundColor = "#fff";
        }
      }
    });
  }, [selectedValues]);

  useEffect(() => {
    const dayElements = document.querySelectorAll(
      ".ant-picker-calendar.ant-picker-calendar-full .ant-picker-panel .ant-picker-body td"
    );
    dayElements.forEach((dayElement) => {
      dayElement.addEventListener("click", () => {
        if (dayElement instanceof HTMLElement) {
          // onSelect(dayjs(dayElement.title));
        }
      });
    });
  }, []);

  const handleSpecificDaysChange = (selectedSpecificDays: Info[]) => {
    console.log(selectedSpecificDays);
    setSelectedSpecificDays(selectedSpecificDays);
  };

  const handleChangeSwitchInput = (checked: boolean) => {
    setSelectedDateFormat(dateFormats[checked ? 1 : 0]);
  };

  const onSelect = (newValue: Dayjs) => {
    console.log("onSelect", newValue);
    if (newValue <= dayjs().add(-1, "d")) return;

    setValue(newValue);
    console.log(newValue.format("YYYY-MM-DD"), selectedValues);
    if (
      selectedValues.find(
        (selectedValue) =>
          selectedValue.format("YYYY-MM-DD") === newValue.format("YYYY-MM-DD")
      )
    ) {
      console.log("if");
      setSelectedValues(
        selectedValues.filter(
          (selectedValue) =>
            selectedValue.format("YYYY-MM-DD") !== newValue.format("YYYY-MM-DD")
        )
      );
    } else {
      console.log("else");
      setSelectedValues([...selectedValues, newValue]);
    }
  };

  const onPanelChange = (newValue: Dayjs, mode: string) => {
    console.log("osnPanelChange", newValue);
    // setValue(newValue);
    onSelect(newValue);
  };

  const onChange = (newValue: Dayjs) => {
    console.log("onChange", newValue);
  };

  const dateCellRender = (value: Dayjs) => {
    // const listData = getListData(value);
    // return (
    // <ul className="events">
    //   {listData.map((item) => (
    //     <li key={item.content}>
    //       <Badge
    //         status={item.type as BadgeProps["status"]}
    //         text={item.content}
    //       />
    //     </li>
    //   ))}
    // </ul>
    // );
    if (
      selectedValues.find(
        (selectedValue) =>
          selectedValue.format("YYYY-MM-DD") === value.format("YYYY-MM-DD")
      )
    ) {
      return <SelectedDate>Selected Date</SelectedDate>;
    }
    return <></>;
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
      <Alert message={`You selected date: ${selectedValuesString}`} />
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            Calendar: {
              colorPrimary: "#cc704b",
              colorLink: "#cc704b",
              colorLinkHover: "#b86544",
              fontSize: 16,
              colorText: "#333",
              colorTextPlaceholder: "#aaa",
              borderRadiusSM: 999,
              colorBgContainerDisabled: "rgba(80, 96, 68, 0.1)",
              colorBgElevated: "#fdfaf5",
            },
          },
        }}
      >
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          // dateCellRender={dateCellRender}
          disabledDate={disabledDate}
          onChange={onChange}
          locale={selectedDateFormat.id === "us" ? undefined : localeEU}
        />
      </ConfigProvider>
    </CalendarInputContainer>
  );
};

export default CalendarInputDraft;
